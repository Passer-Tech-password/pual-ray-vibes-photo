import { Metadata } from 'next';
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Arts.by Paul-Ray-vibes",
  description: "Get in touch with Arts.by Paul-Ray-vibes for bookings, inquiries, and collaborations. Let's create beautiful memories together.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://artbypaulrayvibes.com'}/contact-Us`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
