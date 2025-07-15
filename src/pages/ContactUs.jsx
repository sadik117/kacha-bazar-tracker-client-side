import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { toast } from "react-toastify";
import { values } from "lodash";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Example: Web3Forms endpoint
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_Web3FormKey,
          ...form,
        }),
      });

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-12 px-6">
      <Helmet>
        <title>Contact Us | কাঁচাবাজার</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">📩 Contact Us</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
          Have questions, feedback, or need help? Fill out the form below and we’ll get back to you shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="input input-bordered w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="btn btn-primary w-full dark:text-white"
          >
            Send Message
          </button>
        </form>

        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          Or email us directly at{" "}
          <a
            href="mailto:sadiksourov11@gmail.com"
            className="text-blue-500 underline"
          >
            support@kanchabazar.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
