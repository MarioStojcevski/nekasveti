"use client";

import { createContext, useContext } from "react";
import type { Service, Location, ClientInfo } from "../types";

type AppContextType = {
  services: Service[];
  setServices: (services: Service[]) => void;
  calendarValue: string | null;
  setCalendarValue: (value: string | null) => void;
  timeValue: string | null;
  setTimeValue: (value: string | null) => void;
  location: Location | null;
  setLocation: (value: Location | null) => void;
  clientInfo: ClientInfo | null;
  setClientInfo: (value: ClientInfo | null) => void;
  bookingRef: string | null;
  setBookingRef: (value: string | null) => void;
  resetAll: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
