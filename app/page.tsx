import { Metadata } from 'next';
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Arts.by Paul-Ray-vibes | Home",
  description: "Welcome to Arts.by Paul-Ray-vibes. Discover professional lifestyle, fashion, and event photography that captures the essence of every moment.",
  alternates: {
    canonical: 'https://artbypaulrayvibes.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
