import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { motion } from "motion/react";

interface PromoBannerProps {
  onShopSale: () => void;
}

export default function PromoBanner({ onShopSale }: PromoBannerProps) {
  return (
    <section className="py-12 bg-secondary" data-ocid="promo.section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-navy px-8 py-14 text-center"
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" />
              Limited Time Offer
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight mb-3">
              EXCLUSIVE SALE EVENT
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Up to 50% off selected items — don't miss out!
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-navy uppercase font-bold tracking-wider px-10"
              onClick={onShopSale}
              data-ocid="promo.primary_button"
            >
              SHOP THE SALE
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
