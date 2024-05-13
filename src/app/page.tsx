import HeroSection from "@/components/HeroSection/HeroSection";

const dummyBanners: Banner[] = [
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
      <HeroSection banners={dummyBanners} />
    </>
  );
}
