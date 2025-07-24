import { useMemo, useState } from "react";
import type { Service } from "../types";
import { AppContext } from "../context/AppContext";
import type { PickerValue } from "@mui/x-date-pickers/internals";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [calendarValue, setCalendarValue] = useState<PickerValue>(null);

  const values = useMemo(() => ({
    services,
    setServices,
    calendarValue,
    setCalendarValue
  }), [calendarValue, services]);

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;