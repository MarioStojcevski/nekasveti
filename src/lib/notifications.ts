import "server-only";
import type { NewBooking } from "../types";

type ConfirmedBooking = NewBooking & { ref: string };

/**
 * Send a booking confirmation (SMS / email). This is a pluggable extension
 * point: wire up a provider such as Resend (email) or Twilio (SMS) here using
 * server-only env vars. It must never throw in a way that fails the booking —
 * a notification problem should not lose a confirmed reservation.
 */
export const sendBookingConfirmation = async (
  booking: ConfirmedBooking
): Promise<void> => {
  try {
    // TODO: integrate Resend/Twilio. For now we just log server-side.
    console.info(
      `[notifications] booking ${booking.ref} confirmed: ${booking.date} ${booking.time} for ${booking.client_name ?? "?"}`
    );
  } catch (error) {
    console.error("[notifications] failed to send confirmation:", error);
  }
};
