import { Metadata } from 'next';
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Arts.by Paul-Ray-vibes",
  description: "Learn more about Arts.by Paul-Ray-vibes, a leading lifestyle and event photography brand in Nigeria. Meet our CEO and creative team.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://artbypaulrayvibes.com'}/about-Us`,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
