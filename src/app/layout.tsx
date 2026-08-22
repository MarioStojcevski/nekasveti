import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";
import AppShell from "@/components/AppShell";
import LegacyServiceWorkerCleanup from "@/components/LegacyServiceWorkerCleanup";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const SITE_NAME = "mebelmajstor";
const SITE_SLOGAN = "Мебел мајстор - мајстори за мебел";
const SITE_DESCRIPTION = `${SITE_SLOGAN}. Професионално хемиско чистење. Закажи за 2 минути.`;

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Професионално хемиско чистење`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/assets/logo.png",
  },
  openGraph: {
    title: `${SITE_NAME} - ${SITE_SLOGAN}`,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "mk_MK",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5f3f0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mk" className={poppins.variable}>
      <body suppressHydrationWarning>
        <LegacyServiceWorkerCleanup />
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
