"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getEvent, wedding, type WeddingEvent } from "@/config/wedding";
import { EventDetailModal } from "./EventDetailModal";

interface InviteState {
  gateOpen: boolean;
  /** true once the doors start revealing the hero (used to choreograph the hero entrance) */
  revealStarted: boolean;
  openGate: () => void;
  startReveal: () => void;
  replayIntro: () => void;
  openEventDetails: (eventId: string) => void;
}

const Ctx = createContext<InviteState | null>(null);

export function useInvite(): InviteState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useInvite must be used inside <InviteProvider>");
  return v;
}

export function InviteProvider({ children }: { children: ReactNode }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [revealStarted, setRevealStarted] = useState(false);
  const [detailEvent, setDetailEvent] = useState<WeddingEvent | null>(null);

  const openEventDetails = useCallback((eventId: string) => setDetailEvent(getEvent(eventId)), []);
  const openGate = useCallback(() => setGateOpen(true), []);
  const startReveal = useCallback(() => setRevealStarted(true), []);
  const replayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setRevealStarted(false);
    setGateOpen(false);
  }, []);

  const value = useMemo(
    () => ({ gateOpen, revealStarted, openGate, startReveal, replayIntro, openEventDetails }),
    [gateOpen, revealStarted, openGate, startReveal, replayIntro, openEventDetails],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <EventDetailModal event={detailEvent} onClose={() => setDetailEvent(null)} />
    </Ctx.Provider>
  );
}
