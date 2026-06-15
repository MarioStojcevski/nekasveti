"use client";

import { useMemo, useState, useCallback } from "react";
import type { Service, ClientInfo } from "../types";
import { AppContext } from "../context/AppContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [calendarValue, setCalendarValue] = useState<string | null>(null);
  const [timeValue, setTimeValue] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const resetAll = useCallback(() => {
    setServices([]);
    setCalendarValue(null);
    setTimeValue(null);
    setLocation(null);
    setClientInfo(null);
    setBookingRef(null);
  }, []);

  const values = useMemo(() => ({
    services, setServices,
    calendarValue, setCalendarValue,
    timeValue, setTimeValue,
    location, setLocation,
    clientInfo, setClientInfo,
    bookingRef, setBookingRef,
    resetAll,
  }), [services, calendarValue, timeValue, location, clientInfo, bookingRef, resetAll]);

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
