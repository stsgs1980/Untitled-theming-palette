import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Untitled UI React — Вся палитра для init --color",
  description:
    "Все палитры для npx untitledui@latest init --color <name>: brand и 22 встроенные палитры Tailwind, оттенки 50–950 с HEX-кодами и готовыми CLI-командами.",
  keywords: [
    "Untitled UI",
    "Untitled UI React",
    "theming",
    "brand color",
    "Tailwind CSS",
    "палитры",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Untitled UI React — Вся палитра для init --color",
    description:
      "23 палитры × 11 оттенков: brand и встроенные палитры Tailwind для флага --color.",
    siteName: "Untitled UI React Theming",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
