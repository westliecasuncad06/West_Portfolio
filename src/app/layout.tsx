import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Providers } from "@/components/ui/Providers";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const description = `${profile.tagline} ${profile.name} is a full-stack developer and video editor in the Philippines who builds enrollment, attendance and event systems with Next.js, Laravel and Supabase.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Full-stack developer and video editor`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} | ${profile.tagline}`,
    description,
    locale: "en_PH",
  },
  twitter: { card: "summary_large_image", title: `${profile.name} | ${profile.tagline}`, description },
};

export const viewport: Viewport = {
  themeColor: "#0b0a0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
