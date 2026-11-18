import { unsplash } from "./utils";

/** Single source of truth for contact details: one phone number everywhere. */
export const site = {
  name: "Konjo Cafe & Restaurant",
  url: "https://konjo.com.au",
  address: {
    street: "89 Irving St",
    suburb: "Footscray",
    state: "VIC",
    postcode: "3011",
    full: "89 Irving St, Footscray VIC 3011",
  },
  phone: { display: "(03) 9529 1680", href: "tel:+61395291680" },
  sms: { display: "0401 019 085", href: "sms:+61401019085" },
  email: "contact@konjo.com.au",
  instagram: { handle: "@konjocafe", href: "https://www.instagram.com/konjocafe/" },
  facebook: { href: "https://www.facebook.com/konjocafe" },
  menuPdf: "/konjo-menu.pdf",
  mapEmbed:
    "https://www.google.com/maps?q=89+Irving+St,+Footscray+VIC+3011&z=16&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=89+Irving+St+Footscray+VIC+3011",
} as const;

/** 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM". */
export const hours: { day: string; short: string; dow: number; open?: string; close?: string }[] = [
  { day: "Monday", short: "Mon", dow: 1 },
  { day: "Tuesday", short: "Tue", dow: 2, open: "09:00", close: "20:00" },
  { day: "Wednesday", short: "Wed", dow: 3, open: "09:00", close: "20:00" },
  { day: "Thursday", short: "Thu", dow: 4, open: "09:00", close: "20:00" },
  { day: "Friday", short: "Fri", dow: 5, open: "09:00", close: "20:00" },
  { day: "Saturday", short: "Sat", dow: 6, open: "09:00", close: "20:00" },
  { day: "Sunday", short: "Sun", dow: 0, open: "09:30", close: "15:00" },
];

export const hoursSummary = [
  { label: "Tue – Sat", value: "9am – 8pm" },
  { label: "Sunday", value: "9:30am – 3pm" },
  { label: "Monday", value: "Closed" },
];

export const images = {
  hero: {
    src: unsplash("1577223220266-f3edaed48f68"),
    alt: "A generous Ethiopian platter of colourful stews and salads served on injera",
  },
  heroInset: {
    src: unsplash("1774529233247-d3f34ed11994"),
    alt: "Coffee being poured from a clay jebena into a small cup",
  },
  story: {
    src: unsplash("1630861413071-a424a4d6d155"),
    alt: "A host in traditional white dress pouring coffee from a jebena during a ceremony",
  },
  storyInset: {
    src: unsplash("1630861412977-de9bd8944f97"),
    alt: "Hands lifting injera from a woven mesob basket",
  },
  injera: {
    src: unsplash("1763951719000-661d3d50d763"),
    alt: "Injera being cooked on a large round griddle",
  },
  ceremony: {
    src: unsplash("1630861412757-d9743d318312"),
    alt: "Coffee poured from a jebena into rows of small cups during a coffee ceremony",
  },
};

export type Dish = {
  name: string;
  amharic: string;
  price: string;
  unit?: string;
  note?: string;
  description: string;
  tags: string[];
  image: { src: string; alt: string };
};

export const dishes: Dish[] = [
  {
    name: "Mixed Platter",
    amharic: "በያይነቱ",
    price: "$25",
    unit: "pp",
    note: "min. 2",
    description:
      "Eight dishes on a tray of injera: beetroot, cabbage, spicy and mild lamb stews, kitfo, beef tibs, lentils and split peas.",
    tags: ["To share", "House berbere"],
    image: {
      src: unsplash("1593252719532-53f183016149"),
      alt: "A shared platter of stews, lentils and greens served in a round woven dish",
    },
  },
  {
    name: "Vegetarian / Vegan Platter",
    amharic: "የጾም በያይነቱ",
    price: "$22.50",
    unit: "pp",
    note: "min. 2",
    description:
      "Eight vegan dishes: beetroot, cabbage, red and green lentils, split peas, shiro, pumpkin and potato, and Ethiopian salad.",
    tags: ["Vegan", "To share"],
    image: {
      src: unsplash("1511690656952-34342bb7c2f2"),
      alt: "Bowls of chickpeas, fresh salad and vegetables on a wooden table",
    },
  },
  {
    name: "Silsi Breakfast",
    amharic: "ስልሲ",
    price: "$12",
    description:
      "Eggs scrambled with onions, tomatoes and berbere, served with crusty bread and spiced tea.",
    tags: ["Breakfast", "Spiced tea"],
    image: {
      src: unsplash("1773209927898-a0a7e0a13125"),
      alt: "Clay pots of richly spiced tomato and pepper stew",
    },
  },
  {
    name: "Jebana Coffee",
    amharic: "ጀበና ቡና",
    price: "$5",
    unit: "pp",
    description:
      "Green beans roasted to order and brewed slowly in a clay jebena, then poured into small cups called sini.",
    tags: ["Ceremony", "Roasted to order"],
    image: {
      src: unsplash("1774529233247-d3f34ed11994"),
      alt: "Dark coffee pouring from a clay jebena into a white cup",
    },
  },
];

export const ceremonySteps = [
  {
    n: "01",
    title: "Roast",
    amharic: "መቁላት",
    body: "Green beans are washed and roasted over an open flame until they crackle and glisten. The pan goes round the table so everyone can breathe in the smoke.",
    image: {
      src: unsplash("1422207109431-97544339f995"),
      alt: "Freshly roasted dark coffee beans",
    },
  },
  {
    n: "02",
    title: "Brew",
    amharic: "ማፍላት",
    body: "The beans are ground by hand and boiled in the clay jebena. Frankincense burns beside it while the coffee settles.",
    image: {
      src: unsplash("1679916902807-e2dc9907949a"),
      alt: "Frankincense smoke rising from a clay burner",
    },
  },
  {
    n: "03",
    title: "Serve",
    amharic: "ማቅረብ",
    body: "The coffee is poured in one unbroken stream into small sini cups, three rounds in all: abol, tona and baraka. The last one is the blessing.",
    image: {
      src: unsplash("1709719263827-2d3c00d8d19e"),
      alt: "A small cup of coffee passed from one hand to another",
    },
  },
];

export const crafts = [
  {
    src: unsplash("1756792339487-d044709b27f2"),
    alt: "Turquoise and beaded necklaces laid out together",
    caption: "Beaded necklaces",
  },
  {
    src: unsplash("1599475211349-f4c81b3216bc"),
    alt: "Gold beaded necklace draped over a carved wooden box",
    caption: "Gold-tone chains",
  },
  {
    src: unsplash("1630861412977-de9bd8944f97"),
    alt: "Woven mesob baskets with injera",
    caption: "Woven mesob",
  },
  {
    src: unsplash("1644341129908-6477e0157037"),
    alt: "Brass bangles and beads hanging on a market rack",
    caption: "Brass bangles",
  },
  {
    src: unsplash("1619893454156-26a705ac9eb5"),
    alt: "Hands wearing stacked gold bracelets and rings",
    caption: "Rings & cuffs",
  },
  {
    src: unsplash("1525289722380-f5bf1653d504"),
    alt: "Trays of red and golden spices",
    caption: "Berbere & spices",
  },
];

/*
  PLACEHOLDER testimonials, written for layout only.
  Replace them with real, attributed reviews (e.g. from Google) before launch.
*/
export const reviews = [
  {
    quote:
      "The coffee ceremony alone is worth the trip. Rozenn walked us through every step and the berbere in the lamb stew is something else.",
    name: "Placeholder review",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Huge mixed platter, warm welcome, and the injera is the best I've had in Melbourne. We left full and happy.",
    name: "Placeholder review",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Proper vegan platter, not an afterthought. The shiro is silky and the pumpkin is beautifully spiced.",
    name: "Placeholder review",
    source: "Facebook",
    rating: 5,
  },
  {
    quote:
      "Feels like eating at a friend's home. Abdul remembered our order from the last visit. A Footscray gem.",
    name: "Placeholder review",
    source: "Google",
    rating: 5,
  },
  {
    quote:
      "Silsi with spiced tea is my Saturday ritual now. Simple, generous, full of flavour.",
    name: "Placeholder review",
    source: "Instagram",
    rating: 5,
  },
];

export const marqueeWords = [
  "Jebana Coffee",
  "Injera",
  "Berbere",
  "Shiro",
  "Kitfo",
  "Tibs",
  "Misir",
  "Gomen",
];
