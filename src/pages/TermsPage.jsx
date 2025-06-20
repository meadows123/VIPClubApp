import React from 'react';
import { motion } from 'framer-motion';

const TermsPage = () => {
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
            Terms and Conditions
          </h1>

          <div className="space-y-8 text-brand-burgundy/80">
            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using LagosVibe's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">2. Booking and Reservations</h2>
              <p className="mb-4">
                All bookings are subject to availability and confirmation. We reserve the right to refuse service to anyone. Bookings must be made in advance and are subject to our cancellation policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">3. Payment Terms</h2>
              <p className="mb-4">
                All prices are in Naira and include applicable taxes. Payment is required at the time of booking. We accept various payment methods as indicated during the booking process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">4. Cancellation Policy</h2>
              <p className="mb-4">
                Cancellations must be made at least 24 hours before the booking time for a full refund. Late cancellations may be subject to charges. Special events may have different cancellation policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">5. User Conduct</h2>
              <p className="mb-4">
                Users must behave appropriately and respect venue rules. We reserve the right to refuse service or remove users who violate our terms or behave inappropriately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">6. Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, and images, is the property of LagosVibe and is protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">7. Limitation of Liability</h2>
              <p className="mb-4">
                LagosVibe is not liable for any indirect, incidental, or consequential damages arising from the use of our services or inability to access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-brand-burgundy">8. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage; 