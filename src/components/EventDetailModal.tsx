"use client";

import { wedding, type WeddingEvent } from "@/config/wedding";
import { directionsUrl } from "@/lib/maps";
import { googleCalendarUrl } from "@/lib/calendar";
import { Modal } from "./ui/Modal";
import { Icon } from "./ui/Icon";
import { RoyalButton } from "./ui/RoyalButton";
import { EventMotif } from "./art/EventMotifs";

export function EventDetailModal({ event, onClose }: { event: WeddingEvent | null; onClose: () => void }) {
  if (!event) return null;
  return (
    <Modal open={!!event} onClose={onClose} labelledBy="ev-title" className={`evd evd--${event.motif}`}>
      <div className="evd__art">
        <EventMotif motif={event.motif} />
      </div>
      <div className="evd__body">
        <p className="evd__eyebrow">{event.titleEn}</p>
        <h2 id="ev-title" className="evd__title">{event.titleHi}</h2>
        <p className="evd__desc">{event.description}</p>
        <dl className="evd__facts">
          <div><dt><Icon name="calendar" size={16} /> तिथि</dt><dd>{event.dateHi}</dd></div>
          <div><dt><Icon name="clock" size={16} /> समय</dt><dd>{event.timeHi} <span className="muted">({event.timeEn} IST)</span></dd></div>
          <div><dt><Icon name="mapPin" size={16} /> स्थान</dt><dd>{wedding.venue.nameHi}</dd></div>
          {event.dressCode && <div><dt><Icon name="sparkles" size={16} /> परिधान</dt><dd>{event.dressCode}</dd></div>}
        </dl>
        <div className="evd__ctas">
          <RoyalButton icon="calendarPlus" href={googleCalendarUrl(event)} small>Google Calendar में जोड़ें</RoyalButton>
          <RoyalButton variant="outline" icon="navigation" href={directionsUrl()} small>लोकेशन देखें</RoyalButton>
        </div>
      </div>
    </Modal>
  );
}
