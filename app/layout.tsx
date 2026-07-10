import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Афиша",
  description: "Сервис поиска мероприятий",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}