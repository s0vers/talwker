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

interface BannerProps {
  banners: Banner[];
}

interface ImageSectionProps {
  image: string;
}

interface TextSectionProps {
  category: string;
  title: string;
  description: string;
}

interface AuthorSectionProps {
  author: {
    avatar: string;
    name: string;
  };
  date: string;
  readTime: string;
}

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  price: number;
  rating: number;
  duration: string;
  tag?: string;
}

interface Tour {
  id: number;
  title: string;
  destination: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  highlights: string[];
}

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  trip: string;
}

interface Stat {
  value: string;
  label: string;
}
