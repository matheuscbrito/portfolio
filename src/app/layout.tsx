import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Senna Display covers A–Z, a–z, 0–9, Portuguese accents and . , only; the
// stacks in globals.css fall back to Newsreader for anything else. Headings
// ask for weight 400, which resolves to Medium; font-bold picks Bold.
const display = localFont({
  src: [
    { path: "./fonts/SennaDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/SennaDisplay-Bold.woff2", weight: "700" },
  ],
  variable: "--font-senna",
  display: "swap",
});

const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matheus Brito",
  description:
    "Cofundador da No Foco, plataforma de preparação para o ENEM com 40+ alunos pagantes nos primeiros 6 meses. Ciência da Computação na UFPB.",
  alternates: { languages: { en: "/en" } },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${serif.variable} ${sans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
