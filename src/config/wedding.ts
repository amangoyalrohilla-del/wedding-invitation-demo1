/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — the only file you need to edit
 *  for a new client. Names, dates, venue, images, videos,
 *  music and button labels all live here.
 *
 *  All details below are FICTIONAL DEMO DATA.
 *  Times are written with an explicit +05:30 offset (IST), so
 *  the countdown and calendar files are correct in every
 *  visitor's timezone.
 * ─────────────────────────────────────────────────────────────
 */

export type EventMotif = "haldi" | "mehendi" | "sangeet" | "baraat" | "wedding" | "reception";
export type EventAction = "details" | "calendar" | "directions";

export interface WeddingEvent {
  id: string;
  titleHi: string;
  titleEn: string;
  /** ISO 8601 with offset, e.g. 2026-12-24T11:00:00+05:30 */
  start: string;
  end: string;
  dateHi: string;
  dateEn: string;
  timeHi: string;
  timeEn: string;
  description: string;
  dressCode?: string;
  motif: EventMotif;
  cta: { label: string; action: EventAction };
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** CSS object-position used for crops in the grid */
  focus?: string;
}

export interface FilmClip {
  id: string;
  titleHi: string;
  titleEn: string;
  /** MP4 path (required) */
  src: string;
  /** Optional WebM alternative */
  webm?: string;
  poster: string;
  /** Start playback from this second (lets one file serve two clips in the demo) */
  startAt?: number;
  duration: string;
  orientation: "portrait" | "landscape";
}

export const wedding = {
  site: {
    url: "https://rajveer-weds-meera.vercel.app",
    title: "राजवीर & मीरा · शुभ विवाह निमंत्रण",
    titleEn: "Rajveer & Meera · Wedding Invitation",
    description:
      "आपको सपरिवार सादर आमंत्रित करते हैं — 25 दिसंबर 2026, रामबाग पैलेस, जयपुर। Tap to open the invitation.",
    ogImage: "/assets/og/og-image.jpg",
    locale: "hi_IN",
    timezone: "Asia/Kolkata",
  },

  monogram: { left: "R", right: "M" },

  groom: {
    nameEn: "Rajveer Singh Rathore",
    nameHi: "कुँवर राजवीर सिंह राठौड़",
    shortHi: "राजवीर",
    shortEn: "Rajveer",
    father: "श्री विक्रम सिंह राठौड़",
    mother: "श्रीमती राजेश्वरी देवी राठौड़",
    familyLine: "सुपुत्र श्री विक्रम सिंह राठौड़ एवं श्रीमती राजेश्वरी देवी राठौड़",
    poem: "परंपराओं का मान, संस्कारों की पहचान, और सपनों से भरा एक नया सफर।",
    portrait: "/assets/portraits/groom.jpg" as string | null, // null → empty frame
    portraitAlt: "Groom in an ivory sherwani, cream safa and maroon velvet shawl, in a gold floral frame",
    portraitFocus: "60% 20%",
  },

  bride: {
    nameEn: "Meera Singh Shekhawat",
    nameHi: "कुँवरी मीरा सिंह शेखावत",
    shortHi: "मीरा",
    shortEn: "Meera",
    father: "श्री महेंद्र सिंह शेखावत",
    mother: "श्रीमती पद्मा देवी शेखावत",
    familyLine: "सुपुत्री श्री महेंद्र सिंह शेखावत एवं श्रीमती पद्मा देवी शेखावत",
    poem: "सौम्यता की मूरत, खुशियों की पहचान, और नए रिश्तों में प्रेम का सुंदर विस्तार।",
    portrait: "/assets/portraits/bride.jpg" as string | null, // null → empty frame
    portraitAlt: "Bride in a red bridal lehenga with kundan jewellery and kaleere, in a gold floral frame",
    portraitFocus: "62% 18%",
  },

  hero: {
    invocation: "॥ श्री गणेशाय नमः ॥",
    kicker: "दो दिल, एक शाही कहानी",
    subtitleHi: "राजवीर एवं मीरा",
    tagline: "जहाँ परंपरा मिले प्रेम से, और दो दिल बंधें जन्मों के अटूट बंधन में।",
    dateDisplay: "25 December 2026",
    locationHi: "जयपुर, राजस्थान",
    image: "/assets/couple/hero-couple.jpg",
    imageAlt: "Bride in a navy and gold lehenga embraced by the groom in a palace corridor",
    imageFocus: "50% 22%",
  },

  /** The main "Save the date" event — used by the countdown and every Save The Date button */
  mainEventId: "wedding",

  events: [
    {
      id: "haldi",
      titleHi: "हल्दी की रस्म",
      titleEn: "Haldi Ceremony",
      start: "2026-12-24T11:00:00+05:30",
      end: "2026-12-24T13:30:00+05:30",
      dateHi: "24 दिसंबर 2026",
      dateEn: "Thursday, 24 December 2026",
      timeHi: "सुबह 11:00 बजे",
      timeEn: "11:00 AM",
      description: "पीले रंगों में सजी खुशियों की सौगात, अपनों के संग प्यार और आशीर्वाद का उत्सव।",
      dressCode: "पीला एवं हल्के रंग",
      motif: "haldi",
      cta: { label: "कार्यक्रम देखें", action: "details" },
    },
    {
      id: "mehendi",
      titleHi: "मेहंदी की शाम",
      titleEn: "Mehendi Ceremony",
      start: "2026-12-24T15:00:00+05:30",
      end: "2026-12-24T18:00:00+05:30",
      dateHi: "24 दिसंबर 2026",
      dateEn: "Thursday, 24 December 2026",
      timeHi: "दोपहर 3:00 बजे",
      timeEn: "3:00 PM",
      description: "हाथों में मेहंदी, दिलों में उमंग और रिश्तों में मिठास।",
      dressCode: "हरा एवं गुलाबी",
      motif: "mehendi",
      cta: { label: "तारीख़ जोड़ें", action: "calendar" },
    },
    {
      id: "sangeet",
      titleHi: "संगीत संध्या",
      titleEn: "Sangeet Night",
      start: "2026-12-24T19:00:00+05:30",
      end: "2026-12-24T23:00:00+05:30",
      dateHi: "24 दिसंबर 2026",
      dateEn: "Thursday, 24 December 2026",
      timeHi: "शाम 7:00 बजे",
      timeEn: "7:00 PM",
      description: "सुरों की महफ़िल, रिश्तों की रौनक और यादगार शाम।",
      dressCode: "इंडो-वेस्टर्न / चमकीले रंग",
      motif: "sangeet",
      cta: { label: "कार्यक्रम देखें", action: "details" },
    },
    {
      id: "baraat",
      titleHi: "शाही बारात",
      titleEn: "Royal Baraat",
      start: "2026-12-25T17:30:00+05:30",
      end: "2026-12-25T19:00:00+05:30",
      dateHi: "25 दिसंबर 2026",
      dateEn: "Friday, 25 December 2026",
      timeHi: "शाम 5:30 बजे",
      timeEn: "5:30 PM",
      description: "राजस्थानी शान के साथ ढोल, नगाड़ों और शहनाइयों का भव्य स्वागत।",
      dressCode: "साफ़ा एवं पारंपरिक परिधान",
      motif: "baraat",
      cta: { label: "स्थान देखें", action: "directions" },
    },
    {
      id: "wedding",
      titleHi: "शुभ विवाह",
      titleEn: "Wedding Ceremony",
      start: "2026-12-25T19:00:00+05:30",
      end: "2026-12-25T22:00:00+05:30",
      dateHi: "25 दिसंबर 2026",
      dateEn: "Friday, 25 December 2026",
      timeHi: "शाम 7:00 बजे से",
      timeEn: "7:00 PM onwards",
      description: "सात फेरे, सात वचन और जन्मों का अटूट साथ।",
      dressCode: "पारंपरिक शाही परिधान",
      motif: "wedding",
      cta: { label: "कैलेंडर में जोड़ें", action: "calendar" },
    },
    {
      id: "reception",
      titleHi: "प्रीतिभोज",
      titleEn: "Wedding Reception",
      start: "2026-12-25T21:00:00+05:30",
      end: "2026-12-25T23:30:00+05:30",
      dateHi: "25 दिसंबर 2026",
      dateEn: "Friday, 25 December 2026",
      timeHi: "रात 9:00 बजे",
      timeEn: "9:00 PM",
      description: "आपकी गरिमामयी उपस्थिति हमारे उत्सव को और भी यादगार बनाएगी।",
      motif: "reception",
      cta: { label: "विवाह स्थल देखें", action: "directions" },
    },
  ] as WeddingEvent[],

  countdown: {
    heading: "शुभ घड़ी आने में शेष",
    doneHeading: "शुभ विवाह सम्पन्न हुआ",
    doneMessage: "आपके आशीर्वाद और स्नेह के लिए हृदय से आभार।",
  },

  venue: {
    nameHi: "रामबाग पैलेस, जयपुर",
    nameEn: "Rambagh Palace, Jaipur",
    addressLines: ["Bhawani Singh Road, Rambagh", "Jaipur, Rajasthan 302005", "India"],
    supporting:
      "शाही विरासत की खूबसूरत छाँव में, प्रेम और परंपराओं के इस पावन उत्सव में आपका हार्दिक स्वागत है।",
    /** Text Google Maps searches for. Verify before launch. */
    mapsQuery: "Rambagh Palace, Bhawani Singh Road, Jaipur, Rajasthan 302005",
    /**
     * Optional Google Place ID for exact routing (find it at
     * https://developers.google.com/maps/documentation/places/web-service/place-id).
     * Leave null to route by the address above.
     */
    placeId: null as string | null,
    /** Optional real venue photograph. When null, the painted palace illustration is shown. */
    image: null as string | null,
    imageAlt: "Rambagh Palace, Jaipur at dusk",
    demoNote: "डेमो स्थल — प्रकाशन से पहले वास्तविक स्थल की पुष्टि करें।",
  },

  film: {
    heading: "हमारी प्रेम कहानी",
    subheading: "A Cinematic Journey of Love",
    clips: [
      {
        id: "clip-1",
        titleHi: "उनकी पहली कहानी",
        titleEn: "Chapter One",
        src: "/assets/video/prewedding-film.mp4",
        poster: "/assets/video/poster-1.jpg",
        startAt: 23,
        duration: "0:25",
        orientation: "portrait",
      },
      {
        id: "clip-2",
        titleHi: "एक खूबसूरत सफर",
        titleEn: "Chapter Two",
        // Demo: the same file, starting mid-way. Replace with your second film.
        src: "/assets/video/prewedding-film.mp4",
        poster: "/assets/video/poster-2.jpg",
        startAt: 12,
        duration: "0:13",
        orientation: "portrait",
      },
    ] as FilmClip[],
  },

  story: {
    heading: "एक नई कहानी की शुरुआत",
    phrase: "Two Souls. One Eternal Promise.",
    text: "दो परिवारों के आशीर्वाद और अपनों के प्रेम के साथ, हम जीवन के इस नए अध्याय की शुरुआत कर रहे हैं।",
    images: [
      { src: "/assets/couple/story-main.jpg", alt: "The couple touching foreheads in a courtyard", focus: "50% 30%" },
      { src: "/assets/couple/story-2.jpg", alt: "Bride in a blue saree looking up at the groom", focus: "40% 25%" },
      { src: "/assets/couple/story-3.jpg", alt: "The couple laughing together in red and white", focus: "50% 20%" },
    ],
  },

  gallery: [
    { src: "/assets/gallery/01-royal-corridor.jpg", alt: "Couple in a palace corridor, bride in navy lehenga", caption: "महल का गलियारा", width: 1000, height: 1694, focus: "50% 20%" },
    { src: "/assets/gallery/05-forehead-touch.jpg", alt: "Couple touching foreheads", caption: "एक पल, अनंत", width: 1000, height: 1138 },
    { src: "/assets/gallery/02-laughter.jpg", alt: "Couple laughing in an embrace", caption: "हँसी की खनक", width: 768, height: 1290 },
    { src: "/assets/gallery/06-film-still.jpg", alt: "Couple palm to palm by a lake", caption: "हथेलियों का वादा", width: 720, height: 1280 },
    { src: "/assets/gallery/03-saree-glance.jpg", alt: "Bride in blue saree glancing at the groom", caption: "नज़रों की बात", width: 584, height: 1020 },
    { src: "/assets/gallery/07-film-still.jpg", alt: "Groom lifting the bride near hills", caption: "पहाड़ों के बीच", width: 720, height: 1280 },
    { src: "/assets/gallery/04-white-kurta.jpg", alt: "Couple holding hands in front of a stone wall", caption: "साथ-साथ", width: 1000, height: 1778, focus: "50% 30%" },
    { src: "/assets/gallery/08-film-still.jpg", alt: "Couple holding hands by the water", caption: "झील किनारे", width: 720, height: 1280 },
    { src: "/assets/gallery/09-film-still.jpg", alt: "Bride resting her head on the groom's shoulder", caption: "सुकून", width: 720, height: 1280 },
  ] as GalleryImage[],

  family: {
    heading: "स्नेहिल आमंत्रण",
    invitation:
      "ईश्वर की असीम कृपा और अपने पूर्वजों के आशीर्वाद से हमारे प्रिय राजवीर एवं मीरा के शुभ विवाह के पावन अवसर पर आपकी सपरिवार उपस्थिति हमारे लिए सौभाग्य का विषय होगी।",
    groomSideLabel: "वर पक्ष",
    brideSideLabel: "वधू पक्ष",
    groomFamily: "राठौड़ परिवार",
    brideFamily: "शेखावत परिवार",
    closing: "स्वागतोत्सुक — समस्त राठौड़ एवं शेखावत परिवार",
  },

  finale: {
    headline: "आपकी उपस्थिति ही हमारा सबसे अनमोल उपहार है।",
    dateHi: "25 दिसंबर 2026",
    blessing: "बड़ों के आशीर्वाद और आपके स्नेह से यह उत्सव पूर्ण होगा।",
    image: "/assets/couple/final-portrait.jpg",
    imageAlt: "Bride in an orange saree and groom in a white kurta holding hands, looking at each other",
    imageFocus: "50% 25%",
  },

  /** Optional background music. Set src to e.g. "/assets/music/shehnai.mp3" to show the toggle. Never autoplays. */
  music: {
    src: "/assets/music/song.mp3" as string | null,
    startAt: 23,
    label: "शहनाई",
  },

  intro: {
    blessing: "शुभ विवाह",
    ctaHi: "निमंत्रण खोलें",
    ctaEn: "Open Invitation",
  },

  baraat: {
    title: "शाही बारात का शुभ आगमन",
    line: "ढोल की थाप, शहनाई की गूँज और राजस्थानी शान के साथ...",
    cta: "विवाह समारोह देखें",
  },

  nav: [
    { id: "home", label: "Home" },
    { id: "couple", label: "The Couple" },
    { id: "story", label: "Our Story" },
    { id: "celebrations", label: "Celebrations" },
    { id: "countdown", label: "Countdown" },
    { id: "film", label: "Film" },
    { id: "gallery", label: "Gallery" },
    { id: "venue", label: "Venue" },
  ],

  footer: {
    credit: "Royal digital invitation · Demo design",
  },
};

export type WeddingConfig = typeof wedding;

export function getEvent(id: string): WeddingEvent {
  const found = wedding.events.find((e) => e.id === id);
  if (!found) throw new Error(`Unknown event id: ${id}`);
  return found;
}

export const mainEvent: WeddingEvent = getEvent(wedding.mainEventId);
