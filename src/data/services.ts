// Service pages (/services and /services/:slug). Content is limited to what
// the business already states on the site (Services section, About, Stats) —
// no prices, timelines or claims that haven't been confirmed. Related
// projects, counts and locations are computed from src/data/projects.ts.
import type { ProjectCategory } from "./projects";

export interface Service {
  slug: string;
  /** Short name used in cards, links and breadcrumbs. */
  name: string;
  /** Page <h1>. */
  heading: string;
  /** <title> — the site name is shown separately by Google (WebSite JSON-LD), so it's left out to stay ≤ 60 chars. */
  metaTitle: string;
  metaDescription: string;
  /** One-line summary for cards (from the home page Services section). */
  summary: string;
  intro: string[];
  includes: string[];
  /** Project categories shown as "Our work" on the page (empty = none). */
  projectCategories: ProjectCategory[];
  /** Other services to cross-link. */
  related: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "house-construction",
    name: "House Construction",
    heading: "House Construction in Peshawar",
    metaTitle: "House Construction in Peshawar — Grey Structure & Finishing",
    metaDescription:
      "Family homes built in Peshawar since 2001 — grey structure and finishing by one team. See our completed houses in Sabz Ali Town, Executive Lodges and more.",
    summary: "Residential, commercial, grey structure and finishing works with a focus on durability.",
    intro: [
      "We build homes in Peshawar from the ground up. One team handles the grey structure and the finishing, so you deal with a single builder from the first consultation to handover.",
      "Most of our completed work is residential — from 5 Marla family houses to multi-home projects — and every project is built with a focus on durability.",
    ],
    includes: [
      "Grey structure (the building's structural shell)",
      "Finishing works",
      "Floor plans and 3D designs before construction starts",
      "Site supervision and quality checks throughout",
      "Handover of the finished house",
    ],
    projectCategories: ["residential"],
    related: ["architecture-3d-design", "renovation-interior-design", "supervision-joint-projects"],
  },
  {
    slug: "commercial-construction",
    name: "Commercial Plazas",
    heading: "Commercial Plaza Construction in Peshawar",
    metaTitle: "Commercial Plaza Construction in Peshawar",
    metaDescription:
      "Commercial plazas and shop buildings in Peshawar, delivered since 2008. Construction, grey structure and finishing by Al-Madina Al-Munawara Builders.",
    summary: "Commercial plazas and shop buildings — construction, grey structure and finishing.",
    intro: [
      "We delivered our first commercial plaza in 2008 and have built plazas and shop buildings across Peshawar since then.",
      "We take commercial projects from planning through grey structure and finishing, with the same focus on durability as our residential work.",
    ],
    includes: [
      "Commercial plazas and shop buildings",
      "Grey structure and finishing",
      "Floor plans and 3D designs",
      "Site supervision and quality checks",
    ],
    projectCategories: ["commercial"],
    related: ["real-estate-development", "house-construction", "supervision-joint-projects"],
  },
  {
    slug: "real-estate-development",
    name: "Real Estate Development",
    heading: "Real Estate Development in Peshawar",
    metaTitle: "Real Estate Development in Peshawar — Houses & Plazas",
    metaDescription:
      "Modern housing projects and commercial plazas in Peshawar, developed and built by Al-Madina Al-Munawara Builders since 2001.",
    summary: "Creating modern housing projects and commercial plazas that redefine urban living.",
    intro: [
      "Alongside building for clients, we develop our own projects: modern housing and commercial plazas in Peshawar.",
      "Because we build what we develop, the same team is responsible for the quality of every street, house and plaza.",
    ],
    includes: [
      "Housing projects and residential streets",
      "Commercial plazas",
      "Design, construction and finishing in-house",
    ],
    projectCategories: ["street", "commercial"],
    related: ["commercial-construction", "house-construction"],
  },
  {
    slug: "renovation-interior-design",
    name: "Renovation & Interior Design",
    heading: "Renovation & Interior Design in Peshawar",
    metaTitle: "Renovation & Interior Design in Peshawar",
    metaDescription:
      "Remodeling, painting, flooring and interior design in Peshawar — for homes, businesses and mosques. Renovation by Al-Madina Al-Munawara Builders.",
    summary: "Transforming spaces with expert remodeling, painting, flooring, and interior design.",
    intro: [
      "We renovate existing buildings: remodeling, painting, flooring and interior design.",
      "Since 2015 this has included mosque and community projects, where we have handled renovation and ongoing caretaking work.",
    ],
    includes: ["Remodeling", "Painting", "Flooring", "Interior design", "Mosque renovation and caretaking"],
    projectCategories: ["mosques"],
    related: ["architecture-3d-design", "house-construction"],
  },
  {
    slug: "architecture-3d-design",
    name: "Architecture & 3D Design",
    heading: "Architecture & 3D Design in Peshawar",
    metaTitle: "Architecture, Floor Plans & 3D Design in Peshawar",
    metaDescription:
      "Floor plans, 3D designs and landscaping for houses and plazas in Peshawar, from the team that builds them — Al-Madina Al-Munawara Builders.",
    summary: "Innovative floor plans, stunning 3D designs, and sustainable landscaping services.",
    intro: [
      "Good construction starts with a clear design. We prepare floor plans and 3D designs so you can see your house or plaza before work begins.",
      "Because our architect works alongside the construction team, the design is planned around how it will actually be built.",
    ],
    includes: ["Floor plans", "3D designs", "Landscaping"],
    projectCategories: [],
    related: ["house-construction", "commercial-construction", "renovation-interior-design"],
  },
  {
    slug: "supervision-joint-projects",
    name: "Supervision & Joint Projects",
    heading: "Construction Supervision & Joint Projects in Peshawar",
    metaTitle: "Construction Supervision & Joint Projects in Peshawar",
    metaDescription:
      "Site supervision and quality assurance while you manage procurement, or joint delivery with shared responsibility — Al-Madina Al-Munawara Builders, Peshawar.",
    summary: "Site supervision only, or joint delivery with shared responsibility.",
    intro: [
      "Not every client needs a full construction contract. We also work in two lighter ways.",
      "Supervision only: we provide professional site supervision and quality assurance — we oversee execution while you manage procurement and contracting. Joint projects: we partner with you and your contractors for joint execution and shared responsibility.",
    ],
    includes: [
      "Professional site supervision",
      "Quality assurance during construction",
      "Joint execution with your own contractors",
      "Shared responsibility for delivery",
    ],
    projectCategories: [],
    related: ["house-construction", "commercial-construction"],
  },
];

export const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** How we work — same three steps as the home page Services section. */
export const PROCESS = [
  { step: "01", title: "Consultation", desc: "We discuss your vision, requirements, and budget." },
  { step: "02", title: "Planning & Execution", desc: "Our team designs, schedules, and builds with precision." },
  { step: "03", title: "Handover", desc: "We deliver a finished project that exceeds expectations." },
];
