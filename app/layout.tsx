import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title:
    "APD.by-Paul-Ray-vibes-Photography | Professional Creative Photographer",
  description:
    "A high-quality photography website showcasing lifestyle, events, family, outdoor, and portrait photography. Explore our gallery and services.",
  keywords: [
    "photography",
    "lifestyle",
    "event photography",
    "family portraits",
    "Nigerian photography",
  ],
  openGraph: {
    title: "Art.by-Paul-Ray-vibes-Photography",
    description:
      "Professional lifestyle, event, and outdoor photography. Visit our gallery.",
    url: "https://yourwebsite.com",
    siteName: "Art.by-Paul-Ray-vibes-Photography",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APD.by-Paul-Ray-vibes-Photography",
    description: "Professional photography portfolio website",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] dark:from-brand.soft dark:to-[#0b1220] text-gray-900 dark:text-gray-100 antialiased">
        <ThemeProvider>
          <ToastProvider />
          <Nav />
          <main className="pt-20">
            <div className="max-w-6xl mx-auto px-4">{children}</div>
          </main>
          <footer className="mt-16 border-t border-gray-200 dark:border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-between">
              <span className="font-semibold text-brand dark:text-white">
                Art.by Paul-Ray-vibes
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} All rights reserved
              </span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
