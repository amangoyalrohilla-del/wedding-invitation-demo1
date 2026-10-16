"use client";

import { InviteProvider } from "./InviteContext";
import { RoyalGateIntro } from "./RoyalGateIntro";
import { WeddingNavbar } from "./WeddingNavbar";
import { RoyalCoupleHero } from "./RoyalCoupleHero";
import { GroomIntroduction, BrideIntroduction } from "./GroomBride";
import { CoupleStory } from "./CoupleStory";
import { RajasthaniBaraat } from "./RajasthaniBaraat";
import { WeddingEvents } from "./WeddingEvents";
import { WeddingCountdown } from "./WeddingCountdown";
import { PreWeddingFilm } from "./PreWeddingFilm";
import { RoyalGallery } from "./RoyalGallery";
import { WeddingVenue } from "./WeddingVenue";
import { FamilyBlessings, FinalInvitation, WeddingFooter } from "./FamilyFinale";

/** The whole single-page invitation, in story order. */
export function InviteApp() {
  return (
    <InviteProvider>
      <a className="skip-link" href="#main">मुख्य सामग्री पर जाएँ</a>
      <RoyalGateIntro />
      <WeddingNavbar />
      <main id="main">
        <RoyalCoupleHero />
        <GroomIntroduction />
        <BrideIntroduction />
        <CoupleStory />
        <RajasthaniBaraat />
        <WeddingEvents />
        <WeddingCountdown />
        <PreWeddingFilm />
        <RoyalGallery />
        <WeddingVenue />
        <FamilyBlessings />
        <FinalInvitation />
      </main>
      <WeddingFooter />
    </InviteProvider>
  );
}
