type Product = {
  id: string;
  name: string;
  price: number;
  sort_order: number;
  image_url: string | null;
  created_at: string;
};

type Service = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
};

type Location = {
  lat: number;
  lng: number;
  address: string;
};

type ClientInfo = {
  name: string;
  phone: string;
  email?: string;
};

type BookingStatus = "confirmed" | "completed" | "cancelled";

type Booking = {
  id: string;
  ref: string;
  created_at: string;
  date: string;
  time: string;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  address: string;
  lat: number;
  lng: number;
  services: Service[];
  total_price: number;
  status: BookingStatus;
};

/** Payload sent to the booking API before the DB assigns id/ref/created_at. */
type NewBooking = {
  date: string | null;
  time: string | null;
  client_name?: string;
  client_phone?: string;
  client_email?: string | null;
  address?: string;
  lat: number;
  lng: number;
  services: { id: string; name: string; price: number; quantity?: number }[];
  total_price: number;
  status: BookingStatus;
};

type GalleryImage = {
  id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type { Product, Service, Location, ClientInfo, Booking, BookingStatus, NewBooking, GalleryImage };
