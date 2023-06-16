import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
        ${inter.variable} 
        bg-primary-900 leading-relaxed text-primary-400 
        antialiased selection:bg-secondary-300 custom-scrollbar
        selection:text-secondary-400 overflow-x-hidden 
      `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
