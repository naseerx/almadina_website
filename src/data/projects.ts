// Completed projects shown on /projects and on the service pages.
// Images are imported so Vite can hash them.
import house1 from "@/assets/1.jpg";
import house2 from "@/assets/2.jpg";
import house3 from "@/assets/3.jpg";
import house7 from "@/assets/7.jpg";
import house8 from "@/assets/8.jpg";
import house10 from "@/assets/10.jpg";
import house11 from "@/assets/11.jpg";
import house16 from "@/assets/16.jpg";
import house17 from "@/assets/17.jpg";
import house18 from "@/assets/18.jpg";
import house19 from "@/assets/19.jpg";
import house22 from "@/assets/22.jpg";
import house27 from "@/assets/27.jpg";
import house28 from "@/assets/28.jpg";
import house30 from "@/assets/30.jpg";
import house32 from "@/assets/32.jpg";
import house33 from "@/assets/33.jpg";
import house34 from "@/assets/34.jpg";
import house35 from "@/assets/35.jpg";
import house36 from "@/assets/36.jpg";
import house37 from "@/assets/37.jpg";
import house38 from "@/assets/38.jpg";
import house40 from "@/assets/40.jpg";
import house46 from "@/assets/46.jpg";
import house50 from "@/assets/50.jpg";
import house52 from "@/assets/52.jpg";
import house53 from "@/assets/53.jpg";
import house54 from "@/assets/54.jpg";
import house55 from "@/assets/55.jpg";
import house56 from "@/assets/56.jpg";
import house57 from "@/assets/57.jpg";
import house63 from "@/assets/63.jpg";
import house64 from "@/assets/64.jpg";
import house65 from "@/assets/65.jpg";
import house66 from "@/assets/66.jpg";
import house69 from "@/assets/69.jpg";
import house70 from "@/assets/70.jpg";
import house71 from "@/assets/71.jpg";
import house77 from "@/assets/77.jpg";
import house78 from "@/assets/78.jpg";
import house80 from "@/assets/80.jpg";
import house81 from "@/assets/81.jpg";
import house82 from "@/assets/82.jpg";
import house83 from "@/assets/83.jpg";
import house84 from "@/assets/84.jpg";
import house85 from "@/assets/85.jpg";
import house86 from "@/assets/86.jpg";
import house88 from "@/assets/88.jpg";
import house89 from "@/assets/89.jpg";
import house91 from "@/assets/91.jpg";
import abid from "@/assets/abid.jpg";
import house92 from "@/assets/92.jpg";
import house111Main from "@/assets/111b.jpg";
import house111a from "@/assets/111.jpg";
import house111b from "@/assets/111c.jpg";
import house111c from "@/assets/111c.jpg";
import house111cd from "@/assets/111f.jpg";
import house112 from "@/assets/112.jpg";
import commercial5 from "@/assets/C5.jpg";
import commercial6 from "@/assets/C6.jpg";
import commercialBilal from "@/assets/Cbilal.jpg";
import commercial3 from "@/assets/C3.jpg";
import commercial2 from "@/assets/C2.jpg";
import commercial1 from "@/assets/C1.jpg";
import madaniMasjid from "@/assets/mosques/d1.jpg";
import madaniMasjid2 from "@/assets/mosques/d2.jpg";
import madaniMasjid3 from "@/assets/mosques/d3.jpg";
import madaniMasjid4 from "@/assets/mosques/d4.jpg";
import madaniMasjid5 from "@/assets/mosques/d5.jpg";
import masjidQuba from "@/assets/mosques/c1.jpg";
import masjidQuba2 from "@/assets/mosques/c2.jpg";
import masjidQuba3 from "@/assets/mosques/c3.jpg";
import masjidQuba4 from "@/assets/mosques/c4.jpg";
import masjidQuba5 from "@/assets/mosques/c5.jpg";
import masjidQuba6 from "@/assets/mosques/c6.jpg";
import masjidQuba7 from "@/assets/mosques/c7.jpg";
import masjidQuba8 from "@/assets/mosques/c8.jpg";
import darulEmanPeshawar1 from "@/assets/mosques/a1.jpeg";
import darulEmanPeshawar2 from "@/assets/mosques/a2.jpeg";
import darulEmanPeshawar3 from "@/assets/mosques/a3.jpeg";
import darulEmanPeshawar4 from "@/assets/mosques/a4.jpg";
import karbogha from "@/assets/mosques/b1.jpg";
import karbogha2 from "@/assets/mosques/b2.jpeg";

export type ProjectCategory = "residential" | "commercial" | "mosques" | "street";

export interface Project {
  images: string[];
  title: string;
  location: string;
  description: string;
  category: ProjectCategory;
  year: number;
  isFeatured: boolean;
  /** Hide the year badge (e.g. long-running caretaking work). */
  hideYear?: boolean;
}

export const projects: Project[] = [
  {
    images: [abid],
    title: "25 Marla",
    location: "Sufaid Sang Road Mulazai, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2025,
    isFeatured: true,
  },
  {
    images: [house111Main, house111a, house111b, house111c, house111cd],
    title: "45 Marla 4 Homes",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2025,
    isFeatured: true,
  },

  {
    images: [house112],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2025,
    isFeatured: true,
  },

  {
    images: [commercial5],
    title: "13 Marla Plaza",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "commercial" as const,
    year: 2024,
    isFeatured: true,
  },
  {
    images: [commercial6],
    title: "5.80 Marla",
    location: "Green Cottage, Peshawar",
    description: "A luxury residential project",
    category: "commercial" as const,
    year: 2023,
    isFeatured: true,
  },
  {
    images: [commercialBilal],
    title: "11.40 Marla Plaza",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "commercial" as const,
    year: 2022,
    isFeatured: true,
  },
  {
    images: [commercial3],
    title: "15 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "commercial" as const,
    year: 2022,
    isFeatured: true,
  },
  {
    images: [commercial2],
    title: "7 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "commercial" as const,
    year: 2021,
    isFeatured: true,
  },

  {
    images: [commercial1],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "commercial" as const,
    year: 2016,
    isFeatured: true,
  },
  {
    images: [karbogha, karbogha2],
    title: "Darul-Eman Wal-Taqwa Karbogha Sharif (Caretaking)",
    location: "Karbogha Sharif, Peshawar",
    description: "Mosque and Islamic Center",
    category: "mosques" as const,
    year: 2018,
    hideYear: true,
    isFeatured: true,
  },
      {
    images: [darulEmanPeshawar1, darulEmanPeshawar2, darulEmanPeshawar3, darulEmanPeshawar4],
    title: "Darul-Eman Wal-Taqwa Peshawar (Caretaking)",
    location: "Chamkani, Peshawar",
    description: "Mosque and Islamic Center",
    category: "mosques" as const,
    year: 2017,
    hideYear: true,
    isFeatured: true,
  },
  {
    images: [madaniMasjid, madaniMasjid2, madaniMasjid3, madaniMasjid4, madaniMasjid5],
    title: "Madani Masjid (Caretaker)",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "mosques" as const,
    year: 2016,
    hideYear: true,
    isFeatured: true,
  },
  {
    images: [masjidQuba, masjidQuba2, masjidQuba3, masjidQuba4, masjidQuba5, masjidQuba6, masjidQuba7, masjidQuba8],
    title: "Msjid Quba",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "mosques" as const,
    year: 2015,
    hideYear: true,
    isFeatured: true,
  },


  {
    images: [house92],
    title: "10 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2021,
    isFeatured: false,
  },
  {
    images: [house91],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2021,
    isFeatured: false,
  },

  {
    images: [house89],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2022,
    isFeatured: false,
  },
  {
    images: [house88],
    title: "5 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2022,
    isFeatured: false,
  },

  {
    images: [house86],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2021,
    isFeatured: false,
  }, {
    images: [house85],
    title: "5 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2021,
    isFeatured: false,
  }, {
    images: [house84],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2021,
    isFeatured: false,
  }, {
    images: [house83],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2020,
    isFeatured: false,
  }, {
    images: [house82],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2020,
    isFeatured: false,
  }, {
    images: [house81],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2020,
    isFeatured: false,
  }, {
    images: [house80],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2020,
    isFeatured: false,
  },
  {
    images: [house78],
    title: "7 Marla",
    location: "Executive Lodges, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2019,
    isFeatured: false,
  }, {
    images: [house77],
    title: "14 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2019,
    isFeatured: false,
  },
  {
    images: [house71],
    title: "6 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2018,
    isFeatured: false,
  },
  {
    images: [house70],
    title: "Al madina Street 3",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "street" as const,
    year: 2018,
    isFeatured: false,
  }, {
    images: [house69],
    title: "6 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2018,
    isFeatured: false,
  },
  {
    images: [house66],
    title: "10 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2018,
    isFeatured: false,
  }, {
    images: [house65],
    title: "10 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2018,
    isFeatured: false,
  }, {
    images: [house64],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2017,
    isFeatured: false,
  },
  {
    images: [house63],
    title: "10 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2017,
    isFeatured: true,
  },
  {
    images: [house57, house56, house55],
    title: "Al Madina street 2",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "street" as const,
    year: 2016,
    isFeatured: false,
  },
  {
    images: [house56],
    title: "7 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2016,
    isFeatured: false,
  },
  {
    images: [house55],
    title: "6 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2016,
    isFeatured: false,
  },
  {
    images: [house54],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2015,
    isFeatured: false,
  },

  {
    images: [house53],
    title: "7 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2015,
    isFeatured: false,
  }, {
    images: [house52],
    title: "14 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2015,
    isFeatured: false,
  },
  {
    images: [house50],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2015,
    isFeatured: false,
  },
  {
    images: [house46],
    title: "Al Madina street 1",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "street" as const,
    year: 2014,
    isFeatured: false,
  }, {
    images: [house40],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2014,
    isFeatured: false,
  }, {
    images: [house38],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2014,
    isFeatured: false,
  }, {
    images: [house37],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2013,
    isFeatured: false,
  }, {
    images: [house36],
    title: "3 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2013,
    isFeatured: false,
  }, {
    images: [house35],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2013,
    isFeatured: false,
  }, {
    images: [house34],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2012,
    isFeatured: false,
  }, {
    images: [house33],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2012,
    isFeatured: false,
  },
  {
    images: [house32],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2012,
    isFeatured: false,
  },
  {
    images: [house30],
    title: "Almadina Street 4",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "street" as const,
    year: 2012,
    isFeatured: false,
  },
  {
    images: [house28],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2011,
    isFeatured: false,
  }, {
    images: [house27],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2011,
    isFeatured: false,
  }, {
    images: [house19],
    title: "Almadina Street 6",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "street" as const,
    year: 2011,
    isFeatured: false,
  },
  {
    images: [house22],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2010,
    isFeatured: false,
  },

  {
    images: [house18],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2010,
    isFeatured: false,
  },
  {
    images: [house17],
    title: "6 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2010,
    isFeatured: false,
  },

  {
    images: [house16],
    title: "3,3 Marlas",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2010,
    isFeatured: false,
  },
  {
    images: [house11],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2009,
    isFeatured: false,
  }, {
    images: [house10],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2009,
    isFeatured: false,
  }, {
    images: [house8],
    title: "6 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2009,
    isFeatured: false,
  },
  {
    images: [house7],
    title: "8 Marla",
    location: "Khwaja Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2008,
    isFeatured: false,
  },
  {
    images: [house3],
    title: "4 Marla",
    location: "Khwaja Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2008,
    isFeatured: false,
  },
  {
    images: [house2],
    title: "4 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2008,
    isFeatured: false,
  },
  {
    images: [house1],
    title: "5 Marla",
    location: "Sabz Ali Town, Peshawar",
    description: "A luxury residential project",
    category: "residential" as const,
    year: 2008,
    isFeatured: false,
  },


];
