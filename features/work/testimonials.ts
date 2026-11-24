interface Testimonial {
  company: string;
  url: string;
  card: string;
  logo: string;
  width: number;
  height: number;
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    company: "eRuchi",
    url: "https://www.eruchi.com.np/",
    card: "eruchi-card",
    logo: "/assets/eruchi.603f4d8bdccc.png",
    width: 376,
    height: 114,
    quote:
      "“High-quality, detail-oriented work. Trumark’s backend build and UI redesign helped drive 130% month-on-month growth in eRuchi user activity over 4 months.”",
    name: "Shravak Siddi Tuladar",
    role: "eRuchi, Founder",
  },
  {
    company: "Hisab Kitab",
    url: "https://hisabkitabnepal.com.np/",
    card: "hisab-card",
    logo: "/assets/hisab.ef31837517af.webp",
    width: 398,
    height: 520,
    quote:
      "“Honestly, a great experience working with them. They revamped our website and helped us build a stronger online presence in no time.”",
    name: "Aakash Kayastha",
    role: "Hisab Kitab, Founder",
  },
];
