import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fridge Recipe MVP",
  description: "冷蔵庫食材からレシピ提案するMVP"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-slate-50">{children}</div>
      </body>
    </html>
  );
}
