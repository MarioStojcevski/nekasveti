## Future

- [ ] **Email notification** — Supabase Edge Function + Resend on booking INSERT
  - Create `supabase/functions/send-booking-email/`
  - Set `RESEND_API_KEY` in Supabase Edge Function secrets
  - Create Database Webhook on `bookings` table -> INSERT -> Edge Function
- [ ] **Admin password security** — move auth check to server-side (Edge Function)
- [ ] **SMS reminder** — day before booking via Twilio or similar
- [ ] **Cancel booking** — allow cancellation from confirmation page
- [ ] **Edit booking** — admin can modify date/time from dashboard
- [ ] **Booking calendar view** — admin sees a month calendar with bookings
- [ ] **Export bookings** — download as CSV/PDF from admin
- [ ] **Multiple cities** — expand map coverage beyond Skopje
- [ ] **i18n** — English language toggle
