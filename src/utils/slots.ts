import { Sun, Moon } from "lucide-react";
import type { ComponentType } from "react";

type SlotIcon = ComponentType<{ size?: number | string; className?: string }>;

export type TimeSlot = {
  value: string;
  label: string;
  icon: SlotIcon;
};

export const TIME_SLOTS: TimeSlot[] = [
  { value: "09:00 - 13:00", label: "Претпладне", icon: Sun },
  { value: "13:00 - 17:00", label: "Попладне", icon: Moon },
];

export const SLOT_COUNT = TIME_SLOTS.length;

export const isDayFullyBooked = (bookedSlots: string[]): boolean =>
  bookedSlots.length >= SLOT_COUNT;
