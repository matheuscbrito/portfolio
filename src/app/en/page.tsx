import type { Metadata } from "next";
import { Home } from "@/components/home";

export const metadata: Metadata = {
  description:
    "Co-founder of No Foco, an ENEM prep platform with 40+ paying students in its first 6 months. Computer Science at UFPB.",
  alternates: { languages: { "pt-BR": "/" } },
};

export default function Page() {
  return <Home lang="en" />;
}
