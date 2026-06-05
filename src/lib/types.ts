export interface Farmhouse {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  daysAvailable: number;
  withFood: boolean;
  isPrivate: boolean;
  guests: number;
  description: string;
  amenities: string[];
  owner: { name: string; phone: string; avatar: string };
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "owner" | "admin";
  avatar?: string;
}

export interface Booking {
  id: string;
  farmhouseId: string;
  farmhouseName: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "confirmed" | "pending" | "cancelled";
}
