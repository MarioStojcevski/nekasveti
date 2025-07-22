import { createContext, useContext } from "react";
import type { Service } from "../types";

type AppContextType = {
  services: Service[];
  setServices: (services: Service[]) => void,
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};