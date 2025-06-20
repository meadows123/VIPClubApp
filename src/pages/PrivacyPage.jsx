import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPage = () => {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8 text-brand-burgundy">
            Privacy Policy & Cookies
          </h1>

          <div className="space-y-8 text-brand-burgundy/80">
            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including name, email address, phone number, and payment information. We also collect information about your use of our services and website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use your information to process bookings, communicate with you, improve our services, and provide personalized experiences. We may also use your information for marketing purposes with your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">3. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">5. Third-Party Services</h2>
              <p className="mb-4">
                We may use third-party services that collect, monitor, and analyze data. These services have their own privacy policies and may collect information as specified in their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">6. Your Rights</h2>
              <p className="mb-4">
                You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time. Contact us to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">7. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage; 