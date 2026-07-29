import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "AI Resume",
    template: "%s | AI Resume",
  },
  description: "A polished Next.js app foundation with a scalable structure.",
  metadataBase: new URL("https://example.com"),
};
