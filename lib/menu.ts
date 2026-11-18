/**
 * Full Konjo menu, transcribed from konjo.com.au/menu (typos tidied).
 * Prices are AUD. Update here and /menu follows.
 */
import { unsplash } from "./utils";

export type Tag =
  | "Vegan"
  | "Vegetarian"
  | "Vegetarian or vegan"
  | "Halal"
  | "Recommended"
  | "New"
  | "Most popular"
  | "National dish";

export type MenuItem = {
  name: string;
  price: string;
  /** e.g. "per person · min. 2" or "for 1–2 people" */
  unit?: string;
  description?: string;
  tags?: Tag[];
};

export type MenuGroup = { title?: string; note?: string; items: MenuItem[] };

export type MenuSection = {
  id: string;
  title: string;
  /** Script word shown beside the title */
  script: string;
  note?: string;
  groups: MenuGroup[];
};

/** Signature dishes shown big, with photos, at the top of /menu. */
export type Featured = MenuItem & {
  amharic: string;
  flavours: string;
  sticker?: string;
  image: { src: string; alt: string };
};

export const featured: Featured[] = [
  {
    name: "Mixed Platter",
    amharic: "በያይነቱ",
    price: "$25",
    unit: "per person · min. 2",
    description:
      "Beetroot, cabbage, spicy lamb stew, mild lamb stew, kitfo, beef tibs, red lentils in berbere, green lentils and yellow split peas, all on a tray of injera.",
    flavours: "spicy · mild · to share",
    sticker: "8 dishes",
    image: {
      src: unsplash("1593252719532-53f183016149"),
      alt: "A shared platter of stews, lentils and greens served in a round woven dish",
    },
  },
  {
    name: "Vegetarian & Vegan Platter",
    amharic: "የጾም በያይነቱ",
    price: "$22.50",
    unit: "per person · min. 2",
    description:
      "Beetroot, cabbage stew, red lentils in berbere, green lentils and yellow split peas in turmeric, shiro, pumpkin and potato in garlic, and Ethiopian salad.",
    flavours: "earthy · hearty · plant-based",
    sticker: "Vegan",
    image: {
      src: unsplash("1511690656952-34342bb7c2f2"),
      alt: "Bowls of chickpeas, fresh salad and vegetables on a wooden table",
    },
  },
  {
    name: "Doro Wot",
    amharic: "ዶሮ ወጥ",
    price: "$18",
    description:
      "Chicken marinated in lemon, simmered in onion, garlic and a blend of spices. Served with a hard-boiled egg.",
    flavours: "slow-cooked · spiced · rich",
    sticker: "National dish",
    image: {
      src: unsplash("1773209927898-a0a7e0a13125"),
      alt: "Clay pots of richly spiced stew",
    },
  },
  {
    name: "Jebana Coffee",
    amharic: "ጀበና ቡና",
    price: "$5",
    unit: "per person",
    description:
      "Traditional Ethiopian coffee, roasted and brewed in a clay jebena and poured into small cups called sini.",
    flavours: "smoky · bold · ceremonial",
    sticker: "Traditional",
    image: {
      src: unsplash("1774529233247-d3f34ed11994"),
      alt: "Dark coffee pouring from a clay jebena into a white cup",
    },
  },
];

export const sections: MenuSection[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    script: "mornings",
    note: "Served with crusty bread and spiced tea.",
    groups: [
      {
        items: [
          {
            name: "Ful",
            price: "$12",
            description:
              "Broad bean stew cooked in tomatoes, onions and kibbeh, topped with a sliced hard-boiled egg.",
            tags: ["Vegetarian or vegan"],
          },
          {
            name: "Silsi",
            price: "$12",
            description: "Scrambled eggs cooked in onions, tomatoes and berbere.",
            tags: ["Vegetarian"],
          },
          {
            name: "Half-half",
            price: "$14",
            description: "Half serves of both ful and silsi.",
            tags: ["Recommended"],
          },
        ],
      },
      {
        title: "With meat",
        items: [
          {
            name: "Doro wot",
            price: "$14",
            description:
              "A single piece of chicken marinated in lemon, simmered in onion, garlic and a blend of spices. Served with a hard-boiled egg.",
            tags: ["Recommended"],
          },
          {
            name: "Lamb kai wot",
            price: "$14.50",
            description: "Spicy lamb stew slow-cooked in onions, garlic and berbere.",
            tags: ["Halal"],
          },
          {
            name: "Kitfo",
            price: "$14",
            description: "Finely chopped prime beef seasoned with mitmita and kibbeh, served with aybe.",
            tags: ["New"],
          },
        ],
      },
    ],
  },
  {
    id: "vegetarian",
    title: "Vegetarian & Vegan",
    script: "lunch & dinner",
    note: "All mains are served with injera, which also serves as your cutlery!",
    groups: [
      {
        items: [
          {
            name: "Beyeinatu combo",
            price: "$18",
            description: "A sampler of the five vegan dishes below.",
            tags: ["Most popular", "Vegan"],
          },
          {
            name: "Aterkik alitcha",
            price: "$16",
            description: "Yellow split peas simmered in onions, garlic and turmeric.",
            tags: ["Vegan"],
          },
          {
            name: "Kai misir wot",
            price: "$16",
            description: "Red lentils simmered in tomatoes, onions, garlic and berbere.",
            tags: ["Vegan"],
          },
          {
            name: "Misir alitcha",
            price: "$16",
            description: "Green lentils simmered in onions, garlic and turmeric.",
            tags: ["Vegan"],
          },
          {
            name: "Atkilt wot",
            price: "$16",
            description: "Cabbage, carrots and potatoes simmered in onions, garlic and turmeric.",
            tags: ["Vegan"],
          },
          {
            name: "Kai ser",
            price: "$16",
            description: "Beetroot and potato slices simmered in onions and garlic.",
            tags: ["Vegan"],
          },
          {
            name: "Shiro",
            price: "$16",
            description: "Chickpeas milled into a paste, cooked in onions, garlic, berbere and kibbeh.",
            tags: ["Vegetarian or vegan"],
          },
        ],
      },
    ],
  },
  {
    id: "meat",
    title: "Meat",
    script: "all halal",
    note: "All mains are served with injera.",
    groups: [
      {
        items: [
          {
            name: "Doro wot",
            price: "$18",
            description:
              "Pieces of chicken marinated in lemon, simmered in onion, garlic and a blend of spices. Served with a hard-boiled egg.",
            tags: ["National dish"],
          },
          {
            name: "Lamb kai wot",
            price: "$17",
            description: "Spicy lamb stew slow-cooked in onions, garlic and berbere.",
          },
          {
            name: "Lamb alicha",
            price: "$17",
            description:
              "Non-spicy lamb stew with potatoes and carrots, slow-cooked in turmeric, onions and garlic.",
          },
          { name: "Misto", price: "$18", description: "Half serves of both lamb dishes above." },
          {
            name: "Beef tibs",
            price: "$18",
            description: "Prime beef strips sautéed in onions, garlic, jalapeño and berbere.",
          },
          {
            name: "Kitfo",
            price: "$18",
            description: "Finely chopped prime beef seasoned with mitmita and kibbeh, served with aybe.",
          },
          {
            name: "Dulet kitfo",
            price: "$18",
            description: "Like kitfo, with finely chopped onions and jalapeño added (no aybe).",
          },
          {
            name: "Sega firfir",
            price: "$18",
            description: "Pieces of injera covered with beef tibs and berbere gravy.",
          },
          {
            name: "Half/half",
            price: "$20",
            description: "Half a serve of beef tibs and half a serve of kitfo.",
          },
        ],
      },
    ],
  },
  {
    id: "platters",
    title: "Platters",
    script: "share the love",
    note:
      "A wide selection of mild and spicy dishes on a tray of injera. Platters are sized per person: the more diners, the bigger the tray! Contents may vary slightly with availability.",
    groups: [
      {
        items: [
          {
            name: "Mixed platter",
            price: "$25",
            unit: "per person · min. 2",
            description:
              "8 dishes: beetroot, cabbage, spicy lamb stew, mild lamb stew, kitfo, beef tibs, red lentils in berbere, green lentils and yellow split peas.",
          },
          {
            name: "Vegetarian & vegan platter",
            price: "$22.50",
            unit: "per person · min. 2",
            description:
              "8 dishes: beetroot, cabbage stew, red lentils in berbere, green lentils and yellow split peas in turmeric, shiro, pumpkin and potato in garlic, and Ethiopian salad.",
            tags: ["Vegan"],
          },
        ],
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    script: "coffee & more",
    groups: [
      {
        title: "Jebana · traditional Ethiopian coffee",
        items: [
          { name: "Per person", price: "$5" },
          { name: "Small", price: "$6.50", unit: "for 1 or 2 people" },
          { name: "Medium", price: "$8.50", unit: "for 3 or 4 people" },
          { name: "Large", price: "$14.50", unit: "for 5 or 6 people" },
        ],
      },
      {
        title: "Hot drinks",
        items: [
          { name: "Latte, flat white, long black, short black, macchiato", price: "$4" },
          { name: "Mocha, hot chocolate, chai latte", price: "$5" },
          { name: "Tea: black, spiced, green or ginger", price: "$3" },
          { name: "Large size", price: "+$0.50" },
          { name: "Bonsoy soy or almond milk", price: "+$0.50" },
        ],
      },
      {
        title: "Cold drinks",
        items: [{ name: "Soft drinks", price: "from $3" }],
      },
    ],
  },
];

export const glossary = [
  { term: "Berbere", def: "Ethiopian spice mix of chilli and twenty-odd other spices." },
  { term: "Mitmita", def: "Ground bird’s eye chilli, cloves and salt, used as a condiment." },
  { term: "Kibbeh", def: "Ethiopian clarified butter seasoned with native herbs and spices (not vegan)." },
  { term: "Aybe", def: "Home-made spiced cottage cheese." },
  {
    term: "Injera",
    def: "Ethiopia’s soft, spongy sourdough bread. It’s spread on a tray, topped with stews, and torn to scoop them up.",
  },
];

export const howToEat = [
  "Tear off a piece of injera with your right hand.",
  "Use the tips of your fingers in a pinch-and-roll motion to gather the stew into the injera.",
  "Take it to your mouth and enjoy!",
];
