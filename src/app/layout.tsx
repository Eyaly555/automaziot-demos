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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
