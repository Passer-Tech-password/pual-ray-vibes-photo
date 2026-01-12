export default function AboutUs() {
  return (
    <section className="max-w-3xl mx-auto rounded-2xl ring-1 ring-accent/20 dark:ring-accent/25 bg-white dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-brand dark:text-white">About Our Photography Brand</h1>
      <div className="h-1.5 w-16 bg-accent rounded-full mt-2 mb-6"></div>

      <p className="mb-4">
        We are a professional photography company specializing in lifestyle,
        portrait, events, family, and outdoor photography.
      </p>

      <h2 className="text-2xl font-semibold mt-6 text-brand dark:text-white">Our Services</h2>
      <div className="h-1 w-12 bg-accent rounded mt-2 mb-3"></div>
      <ul className="list-disc pl-6 mt-3">
        <li>Lifestyle Photography</li>
        <li>Event Photography</li>
        <li>Loveline Couple Shoots</li>
        <li>Family Portraits</li>
        <li>Outdoor Photography</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 text-brand dark:text-white">Meet the CEO</h2>
      <div className="h-1 w-12 bg-accent rounded mt-2 mb-3"></div>
      <p className="mt-2">
        Our CEO is an experienced photographer with a passion for storytelling
        and artistic creativity.
      </p>
    </section>
  );
}
