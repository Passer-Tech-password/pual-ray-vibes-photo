import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://artbypaulrayvibes.com"),
  title: {
    default: "Arts.by Paul-Ray-vibes | Professional Creative Photographer",
    template: "%s | Arts.by Paul-Ray-vibes",
  },
  description:
    "A high-quality photography website showcasing lifestyle, events, family, outdoor, and portrait photography. Explore our gallery and services.",
  keywords: [
    "photography",
    "lifestyle photography",
    "event photography",
    "family portraits",
    "Nigerian photographer",
    "Paul Ray Vibes",
    "creative photography",
    "fashion photography",
  ],
  openGraph: {
    title: "Arts.by Paul-Ray-vibes | Professional Creative Photographer",
    description:
      "Timeless imagery defined by color, depth, and story. Explore our portfolio of lifestyle, event, and portrait photography.",
    url: "https://artbypaulrayvibes.com",
    siteName: "Arts.by Paul-Ray-vibes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arts.by Paul-Ray-vibes Photography Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arts.by Paul-Ray-vibes | Professional Creative Photographer",
    description: "Professional photography portfolio website showcasing lifestyle, events, and portraits.",
    images: ["/og-image.jpg"],
    creator: "@paulrayvibes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Arts.by Paul-Ray-vibes",
    "image": "https://artbypaulrayvibes.com/og-image.jpg",
    "description": "Professional creative photographer specializing in lifestyle, events, and portraits.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NG"
    },
    "priceRange": "$$",
    "telephone": "+2348168847345"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-gradient-to-b from-surface-light to-gray-50 dark:from-surface-dark dark:to-brand-soft text-gray-900 dark:text-gray-100 antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <ToastProvider />
          <Nav />
          <main className="pt-20">
            <div className="container-width">{children}</div>
          </main>
          <footer className="mt-16 border-t border-gray-200 dark:border-white/10">
            <div className="container-width py-8 flex items-center justify-between">
              <span className="font-semibold text-brand dark:text-white">
                Arts.by Paul-Ray-vibes
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
