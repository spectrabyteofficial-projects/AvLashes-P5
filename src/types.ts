export interface LashService {
  id: string;
  name: string;
  price: number;
  startingPrice?: boolean;
  description: string;
  duration?: string;
  category: 'set' | 'maintenance' | 'treatment';
  subtitle?: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  category: 'classic' | 'hybrid' | 'volume' | 'mega volume';
  title?: string;
  description?: string;
}

export interface BookingRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed';
  notes?: string;
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  serviceId: string;
  message: string;
  createdAt: string;
}
