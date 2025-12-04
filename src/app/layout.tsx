import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Carlos & Camila | Invitación",
  description:
    "Invitación digital ligera, moderna e interactiva para el matrimonio de Carlos y Camila en Santiago, Chile.",
  metadataBase: new URL("https://weddingcarlos.cl"),
  openGraph: {
    title: "Carlos & Camila | 05 de enero 2026",
    description:
      "Acompáñanos en una experiencia mobile-first con animaciones suaves, agenda y RSVP.",
    type: "website",
    locale: "es_CL",
    url: "https://weddingcarlos.cl",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos & Camila | Invitación interactiva",
    description:
      "Todo lo que necesitas para celebrar con nosotros el 05 de enero de 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[var(--color-cream)] text-[var(--color-sage-900)]`}
      >
        {children}
      </body>
    </html>
  );
}
