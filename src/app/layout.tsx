import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./themeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moodtify",
  description: "Turn your mood into the perfect playlist",
  keywords: [
    "moodify",
    "moodify playlist",
    "spotify playlist",
    "moodify spotify",
    "moodify ai",
    "moodify mood",
    "moodify music",
    "moodify generator",
    "moodify generator ai",
    "moodify generator spotify",
    "moodify generator music",
    "moodify generator playlist",
    "moodify generator playlist ai",
    "moodify generator playlist spotify",
    "moodify generator playlist music",
    "moodify generator playlist mood",
    "moodify generator playlist mood ai",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
