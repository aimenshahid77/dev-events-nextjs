export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "Next.js Conf 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA & Online",
    date: "October 22, 2026",
    time: "09:00 AM - 05:00 PM PST",
  },
  {
    title: "Google I/O 2026",
    image: "/images/event2.png",
    slug: "google-io-2026",
    location: "Mountain View, CA & Online",
    date: "May 14, 2026",
    time: "10:00 AM - 06:00 PM PST",
  },
  {
    title: "React Summit 2026",
    image: "/images/event3.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands & Online",
    date: "June 12, 2026",
    time: "09:30 AM - 06:00 PM CET",
  },
  {
    title: "ETHDenver 2026",
    image: "/images/event4.png",
    slug: "ethdenver-2026",
    location: "Denver, CO",
    date: "February 26 - March 8, 2026",
    time: "08:00 AM - 10:00 PM MST",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2026",
    image: "/images/event5.png",
    slug: "kubecon-na-2026",
    location: "Salt Lake City, UT",
    date: "November 10 - 13, 2026",
    time: "09:00 AM - 05:30 PM MST",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event6.png",
    slug: "microsoft-build-2026",
    location: "Seattle, WA & Online",
    date: "May 19 - 21, 2026",
    time: "08:30 AM - 05:00 PM PST",
  },
];
