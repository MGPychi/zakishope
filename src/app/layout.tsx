import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WorldTech Constantine - Électroménager de Qualité au Meilleur Prix",
  description: "Découvrez WorldTech, votre boutique en ligne à Constantine spécialisée dans la vente d'électroménager de haute qualité. Trouvez des appareils modernes pour votre maison avec livraison rapide et service client dédié",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased    `}
        >
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
