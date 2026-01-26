// ==================== DESTINATION & TRIP TYPES ====================

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceFrom: number;
  currency: string;
  popularActivities: string[];
  bestTimeToVisit: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

interface TripPackage {
  id: string;
  title: string;
  destination: Destination;
  description: string;
  shortDescription: string;
  duration: {
    days: number;
    nights: number;
  };
  price: {
    amount: number;
    currency: string;
    perPerson: boolean;
    originalPrice?: number;
    discount?: number;
  };
  images: string[];
  coverImage: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  accommodation: Accommodation;
  groupSize: {
    min: number;
    max: number;
  };
  difficulty: "Easy" | "Moderate" | "Challenging" | "Difficult";
  category: TripCategory;
  tags: string[];
  departureDate: string;
  departureDates: string[];
  available: boolean;
  featured: boolean;
  bestSeller: boolean;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  accommodation?: string;
  image?: string;
}

interface Accommodation {
  name: string;
  type: "Hotel" | "Resort" | "Villa" | "Lodge" | "Hostel" | "Camping";
  rating: number;
  amenities: string[];
  image?: string;
}

type TripCategory =
  | "Adventure"
  | "Beach"
  | "Cultural"
  | "Wildlife"
  | "Romantic"
  | "Family"
  | "Luxury"
  | "Budget"
  | "Solo"
  | "Group"
  | "Cruise"
  | "Safari"
  | "Hiking"
  | "City Break";

// ==================== BOOKING TYPES ====================

interface BookingDetails {
  id: string;
  tripPackage: TripPackage;
  travelers: Traveler[];
  contactPerson: ContactPerson;
  departureDate: string;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  specialRequests?: string;
  addOns: AddOn[];
}

interface Traveler {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  dietaryRequirements?: string;
  medicalConditions?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

interface ContactPerson {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded";
type PaymentStatus = "pending" | "paid" | "partial" | "refunded" | "failed";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: "Insurance" | "Transfer" | "Activity" | "Upgrade" | "Other";
}

// ==================== REVIEW TYPES ====================

interface Review {
  id: string;
  tripId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  date: string;
  verified: boolean;
  helpful: number;
  response?: {
    content: string;
    date: string;
  };
}

// ==================== SEARCH & FILTER TYPES ====================

interface SearchFilters {
  destination?: string;
  dateFrom?: string;
  dateTo?: string;
  travelers?: number;
  priceMin?: number;
  priceMax?: number;
  duration?: {
    min: number;
    max: number;
  };
  categories?: TripCategory[];
  rating?: number;
  difficulty?: string[];
  sortBy?: SortOption;
}

type SortOption =
  | "recommended"
  | "price-low"
  | "price-high"
  | "rating"
  | "duration"
  | "popularity";

// ==================== BLOG & CONTENT TYPES ====================

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images: string[];
  author: Author;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
}

interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

type BlogCategory =
  | "Travel Tips"
  | "Destinations"
  | "Adventure"
  | "Culture"
  | "Food & Drink"
  | "Budget Travel"
  | "Luxury Travel"
  | "Solo Travel"
  | "Family Travel";

// ==================== DEAL & OFFER TYPES ====================

interface Deal {
  id: string;
  title: string;
  description: string;
  tripPackage: TripPackage;
  discountType: "percentage" | "fixed";
  discountValue: number;
  originalPrice: number;
  finalPrice: number;
  currency: string;
  validFrom: string;
  validUntil: string;
  code?: string;
  terms: string[];
  limited: boolean;
  spotsLeft?: number;
  featured: boolean;
  image: string;
}

// ==================== UI COMPONENT TYPES ====================

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface SkeletonProps {
  className?: string;
}

// ==================== LEGACY TYPES (keeping for compatibility) ====================

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

// ==================== CONTACT & SUPPORT TYPES ====================

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  tripId?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
