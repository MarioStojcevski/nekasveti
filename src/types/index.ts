type Service = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
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

export type { Service, ClientInfo, Booking, BookingStatus, NewBooking };
