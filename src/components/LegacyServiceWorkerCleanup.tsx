"use client";

import { useEffect } from "react";

const LegacyServiceWorkerCleanup = () => {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }, []);

  return null;
};

export default LegacyServiceWorkerCleanup;
