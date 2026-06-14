type Service = {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  quantity?: number;
};

type ClientInfo = {
  name: string;
  phone: string;
  email?: string;
};

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
  status: "confirmed" | "completed" | "cancelled";
};

export type { Service, ClientInfo, Booking };
