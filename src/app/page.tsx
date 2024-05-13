import TestComponent from "@/components/TestComponent";
import HeroSection from "@/components/ui/home/HeroSection";
import Image from "next/image";

interface Banner {
  category: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
}

const dummyBanners = [
  {
    image: "/image.jpg",
    link: "/banner1",
  },
  {
    image: "/image.jpg",
    link: "/banner2",
  },
  {
    image: "/image.jpg",
    link: "/banner3",
  },
  // Add more dummy banner objects as needed
];

const dummyBannerser: Banner[] = [
  {
    category: "Travel",
    title: "Travel the world with us",
    description:
      "Get the best travel experience with us. We provide the best travel experience with the best price.",
    author: {
      name: "Jane Doe",
      avatar: "/writer.avif",
    },
    date: "12th March, 2024",
    readTime: "10",
    image: "/image.jpg",
  },
  {
    category: "Adventure",
    title: "Explore the unknown",
    description:
      "Embark on an adventure of a lifetime with our exciting expeditions.",
    author: {
      name: "John Smith",
      avatar: "/author.jpg",
    },
    date: "5th April, 2024",
    readTime: "8",
    image: "/image.jpg",
  },
  // Add more banner objects as needed
];

export default function Home() {
  return (
    <>
      <HeroSection banners={dummyBannerser} />
      {/* <TestComponent banners={dummyBannerser} /> */}
    </>
  );
}
