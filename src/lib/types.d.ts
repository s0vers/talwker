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
