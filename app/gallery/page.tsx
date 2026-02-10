import { Metadata } from 'next';
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Arts.by Paul-Ray-vibes",
  description: "Explore our portfolio of lifestyle, event, family, and portrait photography. View our latest work and creative projects.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://artbypaulrayvibes.com'}/gallery`,
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
