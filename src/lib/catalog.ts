import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  HardHat,
  ShieldCheck,
  SprayCan,
  Plug,
  Sofa,
} from "lucide-react";

export type Category = {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  image?: string; // optional
};

export const CATEGORIES: Category[] = [
  {
    slug: "office-supplies",
    title: "Office Supplies",
    description:
      "Stationery, printing supplies, filing, and everyday office essentials for businesses and institutions.",
    bullets: [
      "A4 Papers & Stationery",
      "Printer Toners & Ink",
      "Files, Folders & Binders",
      "Pens, Markers & Accessories",
    ],
    icon: BriefcaseBusiness,
    image: "/categories/office-supplies.jpg",
  },
  {
    slug: "construction-materials",
    title: "Construction Materials",
    description:
      "Reliable supply of construction and building materials for projects of all sizes.",
    bullets: [
      "Cement & Aggregates",
      "Paints & Finishing",
      "Tools & Hardware",
      "Plumbing & Fittings",
    ],
    icon: HardHat,
    image: "/categories/construction-materials.jpg",
  },
  {
    slug: "ppe-safety-gear",
    title: "PPE & Safety Gear",
    description:
      "Protective equipment and safety supplies for industrial, mining, and site environments.",
    bullets: ["Safety Helmets", "Reflective Vests", "Gloves & Boots", "Goggles & Masks"],
    icon: ShieldCheck,
    image: "/categories/ppe-safety-gear.jpg",
  },
  {
    slug: "cleaning-supplies",
    title: "Cleaning Supplies",
    description:
      "Household and industrial cleaning supplies for offices, facilities, and institutions.",
    bullets: [
      "Detergents & Disinfectants",
      "Mops, Brooms & Buckets",
      "Toilet Tissue & Hygiene",
      "Waste Bins & Liners",
    ],
    icon: SprayCan,
    image: "/categories/cleaning-supplies.jpg",
  },
  {
    slug: "electronics",
    title: "Electronics",
    description:
      "Essential electronics and accessories for offices and field operations.",
    bullets: [
      "Computers & Accessories",
      "Printers & Scanners",
      "Networking Equipment",
      "Power Extensions & UPS",
    ],
    icon: Plug,
    image: "/categories/electronics.jpg",
  },
  {
    slug: "furniture",
    title: "Furniture",
    description:
      "Office and institutional furniture with delivery and setup options.",
    bullets: ["Office Chairs", "Office Desks", "Storage Cabinets", "Conference Tables"],
    icon: Sofa,
    image: "/categories/furniture.jpg",
  },
];
