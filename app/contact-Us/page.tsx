export default function ContactUs() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-brand dark:text-white">Contact Us</h1>
      <div className="h-1.5 w-16 bg-accent rounded-full mt-2 mb-6"></div>

      <form className="space-y-4 bg-white dark:bg-gray-900 p-6 shadow rounded-lg">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        ></textarea>

        <button className="w-full bg-accent text-black p-3 rounded-full shadow-sm hover:brightness-95">
          Send Message
        </button>
      </form>
    </div>
  );
}

