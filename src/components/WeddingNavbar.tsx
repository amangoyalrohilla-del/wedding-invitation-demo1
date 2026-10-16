"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { asset, cx, scrollToId } from "@/lib/utils";
import { useInvite } from "./InviteContext";
import { Icon } from "./ui/Icon";
import { Monogram } from "./ui/Ornaments";

/** Sticky navigation; hidden until the palace doors have opened. */
export function WeddingNavbar() {
  const { gateOpen } = useInvite();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!gateOpen) return;
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Highlight the section in view. "couple" also covers the bride section.
    const ids = [...wedding.nav.map((n) => n.id), "bride", "baraat", "family", "invitation"];
    const alias: Record<string, string> = { bride: "couple", baraat: "story", family: "venue", invitation: "venue" };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(alias[e.target.id] ?? e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [gateOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  if (!gateOpen) return null;

  const go = (id: string) => {
    setOpen(false);
    // let the menu close before scrolling so iOS doesn't fight the scroll lock
    window.setTimeout(() => scrollToId(id), open ? 220 : 0);
  };

  return (
    <header className={cx("nav", solid && "nav--solid", open && "nav--open")}>
      <div className="nav__bar">
        <a
          className="nav__brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
          aria-label={`${wedding.groom.shortEn} & ${wedding.bride.shortEn} — Home`}
        >
          <Monogram className="nav__mono" />
          <span className="nav__brand-text">
            {wedding.groom.shortEn} <em>&amp;</em> {wedding.bride.shortEn}
          </span>
        </a>
        <nav className="nav__links" aria-label="मुख्य">
          {wedding.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cx("nav__link", active === n.id && "is-active")}
              aria-current={active === n.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(n.id);
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="nav-sheet" aria-label={open ? "मेनू बंद करें" : "मेनू खोलें"} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </div>
      <div id="nav-sheet" className="nav__sheet" hidden={!open}>
        <nav aria-label="मोबाइल मेनू">
          {wedding.nav.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              style={{ transitionDelay: `${0.04 * i + 0.08}s` }}
              className={cx(active === n.id && "is-active")}
              onClick={(e) => {
                e.preventDefault();
                go(n.id);
              }}
            >
              <span className="nav__sheet-num">{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <p className="nav__sheet-foot" lang="hi">{wedding.hero.dateDisplay} · {wedding.hero.locationHi}</p>
      </div>
      {wedding.music.src && <MusicToggle src={asset(wedding.music.src)} label={wedding.music.label} />}
    </header>
  );
}

/** Optional background music — never autoplays; starts only when the guest taps. */
function MusicToggle({ src, label }: { src: string; label: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => () => audio.current?.pause(), []);
  const toggle = () => {
    if (!audio.current) {
      audio.current = new Audio(src);
      audio.current.loop = true;
      audio.current.volume = 0.5;
    }
    if (on) {
      audio.current.pause();
      setOn(false);
    } else {
      audio.current
        .play()
        .then(() => setOn(true))
        .catch(() => setOn(false));
    }
  };
  return (
    <button type="button" className={cx("music", on && "music--on")} onClick={toggle} aria-pressed={on} aria-label={on ? `${label} संगीत बंद करें` : `${label} संगीत चलाएँ`}>
      <Icon name={on ? "volume" : "mute"} size={18} />
      <span className="music__bars" aria-hidden="true"><i /><i /><i /></span>
    </button>
  );
}
