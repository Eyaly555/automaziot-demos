import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automaziot AI — Demos",
  description: "Interactive demos by Automaziot AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
