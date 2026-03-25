import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-secondary" data-ocid="newsletter.section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-navy mb-2">
            Stay Updated
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and be first to know about exclusive
            deals, new arrivals, and special offers.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-6 py-3 font-semibold"
              data-ocid="newsletter.success_state"
            >
              <CheckCircle className="w-5 h-5" />
              You're subscribed! Welcome to the club.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-11"
                data-ocid="newsletter.input"
              />
              <Button
                type="submit"
                className="bg-navy hover:bg-navy/90 text-white uppercase font-bold tracking-wide px-8 h-11"
                data-ocid="newsletter.submit_button"
              >
                SUBSCRIBE
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
