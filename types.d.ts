interface Banner {
  id?: string;
  category?: string; // Keeping for backward compatibility if needed, or repurposed as 'Region'
  title: string;
  description: string;
  author?: { // Optional now
    name: string;
    avatar: string;
  };
  date?: string; // Optional
  readTime?: string; // Optional
  image: string;
  location?: string;
  price?: string;
  rating?: number;
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
