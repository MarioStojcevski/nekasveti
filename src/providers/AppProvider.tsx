import { useMemo, useState } from "react";
import type { Service } from "../types";
import { AppContext } from "../context/AppContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);

  const values = useMemo(() => ({
    services,
    setServices,
  }), [services]);

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;