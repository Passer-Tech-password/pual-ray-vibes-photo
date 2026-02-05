import { Metadata } from 'next';
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Session | Arts.by Paul-Ray-vibes",
  description: "Schedule your photography session with Arts.by Paul-Ray-vibes. Choose your preferred date, time, and package for a professional photoshoot.",
  alternates: {
    canonical: 'https://artbypaulrayvibes.com/booking',
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
