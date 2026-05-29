export enum BarberId {
  Vlad = "vlad",
  Ilya = "ilya",
  Katerina = "katerina",
  Any = "any"
}

export enum ServiceCategory {
  Hair = "hair",
  Beard = "beard",
  Combo = "combo"
}

export interface Service {
  id: string;
  name: string;
  durationMin: number;
  priceGEL: number;
  priceUSD: number;
  description: string;
  category: ServiceCategory;
  iconName: string;
}

export interface Barber {
  id: BarberId;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  specialty: string;
  avatarSeed: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  reviewsCount: number;
  text: string;
  relativeTime: string;
  ownerResponse?: string;
  hasPhoto?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  barberId: BarberId;
  barberName: string;
  priceGEL: number;
  priceUSD: number;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
}
