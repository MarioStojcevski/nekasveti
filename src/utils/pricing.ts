import type { Service } from "../types";

export const getTotalItems = (services: Service[]): number =>
  services.reduce((sum, service) => sum + (service.quantity || 1), 0);

export const getTotalPrice = (services: Service[]): number =>
  services.reduce((sum, service) => sum + service.price * (service.quantity || 1), 0);
