import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AllProducts from "./components/AllProducts";
import CartSidebar from "./components/CartSidebar";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import NewsletterSection from "./components/NewsletterSection";
import PromoBanner from "./components/PromoBanner";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    document
      .getElementById("all-products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <HeroSection
          onShopNow={() => handleFilterChange("all")}
          onViewSale={() => handleFilterChange("sale")}
        />
        <FeaturedProducts />
        <PromoBanner onShopSale={() => handleFilterChange("sale")} />
        <AllProducts
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <NewsletterSection />
      </main>
      <Footer />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toaster position="top-right" richColors />
    </div>
  );
}
