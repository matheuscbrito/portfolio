import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Senna Display only covers A–Z, a–z, 0–9 and basic punctuation; the stacks in
// globals.css fall back to Newsreader for accents and anything else.
const display = localFont({
  src: "./fonts/SennaDisplay-Regular.woff2",
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
