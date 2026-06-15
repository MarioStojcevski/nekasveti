import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";
import AppShell from "@/components/AppShell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const SITE_NAME = "mebelmaster";
const SITE_DESCRIPTION = "Професионално хемиско чистење. Закажи за 2 минути.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Професионално хемиско чистење`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text x='0' y='25' font-size='25'>✨</text></svg>",
  },
  openGraph: {
    title: `${SITE_NAME} - Професионално хемиско чистење`,
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
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
