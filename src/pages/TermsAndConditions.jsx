import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen px-6 py-12">
      <Helmet>
        <title>Terms & Conditions | কাঁচাবাজার</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          📜 Terms & Conditions
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Welcome to কাঁচাবাজার, your trusted platform for tracking and comparing daily market prices.
            By accessing our website or using our services, you agree to the following terms and conditions.
            Please read them carefully.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>You must provide accurate and complete registration information.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>Misuse of the platform (e.g., fake pricing, offensive content) will result in account suspension.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. Vendor Policies</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Vendors must ensure that all submitted product data, prices, and advertisements are truthful and updated regularly.
            Suspicious or misleading content may be rejected or removed by the admin.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">4. Payment & Transactions</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Payments made through our platform (via Stripe) are secure. We do not store your payment details.
            All transactions are final and subject to the vendor's individual return or refund policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
          <p className="text-gray-700 dark:text-gray-300">
            All content and materials on কাঁচাবাজার, including logos, design, and data, are owned by the platform
            and protected by copyright laws. You may not reuse or reproduce them without permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to terminate or restrict access to any account that violates our policies
            or engages in harmful behavior, with or without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">7. Modifications</h2>
          <p className="text-gray-700 dark:text-gray-300">
            কাঁচাবাজার may update these Terms and Conditions at any time.
            Continued use of the platform after changes are made signifies your acceptance of the new terms.
          </p>
        </section>

        <section className="text-center text-gray-600 dark:text-gray-400 mt-10">
          <p>
            Last Updated: <span className="font-medium">July 15, 2025</span>
          </p>
          <p className="mt-2">For any queries, contact us at <a className="text-blue-500 underline" href="mailto:sadiksourov11@gmail.com">support@kanchabazar.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
