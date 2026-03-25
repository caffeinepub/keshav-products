import { Button } from "@/components/ui/button";
import { ArrowRight, Tag } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
  onViewSale: () => void;
}

export default function HeroSection({
  onShopNow,
  onViewSale,
}: HeroSectionProps) {
  return (
    <section
      className="relative w-full min-h-[520px] sm:min-h-[600px] flex items-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x600.jpg')",
        }}
      />
      {/* Terracotta overlay matching design palette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.38_0.1_42/0.92)] via-[oklch(0.38_0.1_42/0.72)] to-[oklch(0.38_0.1_42/0.25)]" />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/40 text-white rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5">
            <Tag className="w-3 h-3" />
            New Collection 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-tight text-white mb-5 tracking-tight">
            DISCOVER
            <br />
            <span className="text-[oklch(0.92_0.08_80)]">KESHAV</span>
            <br />
            PRODUCTS
          </h1>
          <p className="text-white/85 text-lg mb-8 leading-relaxed">
            Quality you can trust, crafted with care. Premium products for every
            need and every home.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white uppercase font-bold tracking-wide px-8"
              onClick={onShopNow}
              data-ocid="hero.primary_button"
            >
              SHOP NOW <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-foreground uppercase font-bold tracking-wide px-8"
              onClick={onViewSale}
              data-ocid="hero.secondary_button"
            >
              VIEW SALE
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
