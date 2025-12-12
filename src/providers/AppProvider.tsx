import { useMemo, useState } from "react";
import type { Service } from "../types";
import { AppContext } from "../context/AppContext";
import type { PickerValue } from "@mui/x-date-pickers/internals";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [calendarValue, setCalendarValue] = useState<PickerValue>(null);
  const [timeValue, setTimeValue] = useState<PickerValue>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  const values = useMemo(() => ({
    services,
    setServices,
    calendarValue,
    setCalendarValue,
    timeValue,
    setTimeValue,
    location,
    setLocation
  }), [calendarValue, services, timeValue, location]);

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;