export type BookingStep = {
  path: string;
  label: string;
};

export const bookingSteps: readonly BookingStep[] = [
  { path: "/services", label: "Услуги" },
  { path: "/schedule", label: "Термин" },
  { path: "/client-info", label: "Податоци" },
  { path: "/summary", label: "Преглед" },
];

/** Previous flow step, or "/" when already at the first step (or unknown page). */
export const getBackTarget = (pathname: string): string => {
  const index = bookingSteps.findIndex((s) => pathname.startsWith(s.path));
  if (index <= 0) return "/";
  return bookingSteps[index - 1].path;
};
