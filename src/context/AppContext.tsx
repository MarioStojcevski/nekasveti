import { createContext, useContext } from "react";
import type { Service } from "../types";
import type { PickerValue } from "@mui/x-date-pickers/internals";

type AppContextType = {
  services: Service[];
  setServices: (services: Service[]) => void,
  calendarValue: PickerValue | null;
  setCalendarValue: (value: PickerValue | null) => void;
  timeValue: PickerValue | null;
  setTimeValue: (value: PickerValue | null) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};