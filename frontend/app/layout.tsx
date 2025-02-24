import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import HeaderMenu from "./ui/headerMenu";
import FooterMenu from "./ui/footerMenu";
import { GoogleAnalytics } from '@next/third-parties/google';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Calculadora de prestamos",
  description: "Compara los mejores préstamos personales en España y encuentra la mejor opción para ti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`bg-white text-custom-950 ${roboto.className}`}>
        <HeaderMenu />
        {children}
        <FooterMenu />
      </body>
      <GoogleAnalytics gaId={process.env.GA_ID || ""} />
    </html>
  );
}
