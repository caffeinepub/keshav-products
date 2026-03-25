import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Product } from "../backend.d";
import { useGetAllProducts } from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const SAMPLE_ALL: Product[] = [
  {
    id: 1n,
    name: "Premium Wireless Headphones",
    description: "High-quality sound",
    category: "Electronics",
    price: 8999n,
    rating: 4.5,
    reviewCount: 128n,
    isFeatured: true,
    isOnSale: false,
  },
  {
    id: 2n,
    name: "Designer Leather Jacket",
    description: "Italian leather",
    category: "Fashion",
    price: 24900n,
    rating: 4.8,
    reviewCount: 56n,
    isFeatured: true,
    isOnSale: true,
  },
  {
    id: 3n,
    name: "Smart Home Hub",
    description: "Control devices",
    category: "Home",
    price: 12999n,
    rating: 4.3,
    reviewCount: 89n,
    isFeatured: true,
    isOnSale: false,
  },
  {
    id: 4n,
    name: "Luxury Face Serum Set",
    description: "Anti-aging",
    category: "Beauty",
    price: 6499n,
    rating: 4.7,
    reviewCount: 214n,
    isFeatured: true,
    isOnSale: true,
  },
  {
    id: 5n,
    name: "4K Ultra HD Smart TV",
    description: "55-inch display",
    category: "Electronics",
    price: 59900n,
    rating: 4.6,
    reviewCount: 320n,
    isFeatured: false,
    isOnSale: false,
  },
  {
    id: 6n,
    name: "Running Shoes Pro",
    description: "Comfort & performance",
    category: "Fashion",
    price: 11900n,
    rating: 4.4,
    reviewCount: 175n,
    isFeatured: false,
    isOnSale: true,
  },
  {
    id: 7n,
    name: "Bamboo Coffee Table",
    description: "Eco-friendly design",
    category: "Home",
    price: 18500n,
    rating: 4.2,
    reviewCount: 43n,
    isFeatured: false,
    isOnSale: false,
  },
  {
    id: 8n,
    name: "Moisturizing Night Cream",
    description: "Deep hydration",
    category: "Beauty",
    price: 3499n,
    rating: 4.9,
    reviewCount: 512n,
    isFeatured: false,
    isOnSale: false,
  },
];

const CATEGORIES = ["all", "sale", "Electronics", "Fashion", "Home", "Beauty"];

interface AllProductsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function AllProducts({
  activeFilter,
  onFilterChange,
}: AllProductsProps) {
  const { data: products, isLoading } = useGetAllProducts();
  const displayProducts =
    products && products.length > 0 ? products : SAMPLE_ALL;

  // Listen for filter changes from header nav
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      onFilterChange(ce.detail);
    };
    window.addEventListener("filterChange", handler);
    return () => window.removeEventListener("filterChange", handler);
  }, [onFilterChange]);

  const filtered = displayProducts.filter((p) => {
    if (activeFilter === "all" || activeFilter === "new") return true;
    if (activeFilter === "sale") return p.isOnSale;
    return p.category === activeFilter;
  });

  return (
    <section
      id="all-products"
      className="py-16 bg-background"
      data-ocid="products.section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Browse Collection
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-navy">
            ALL PRODUCTS
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-8"
          data-ocid="products.filter.tab"
        >
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeFilter === cat ? "default" : "outline"}
              size="sm"
              className={`uppercase font-bold tracking-wide text-xs ${
                activeFilter === cat
                  ? "bg-primary hover:bg-primary/90 text-white border-primary"
                  : "border-border text-foreground/70 hover:border-primary hover:text-primary"
              }`}
              onClick={() => onFilterChange(cat)}
              data-ocid={`products.${cat.toLowerCase()}.tab`}
            >
              {cat === "all" ? "All" : cat === "sale" ? "🔥 Sale" : cat}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            data-ocid="products.loading_state"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-9 w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="products.empty_state"
          >
            <p className="text-lg font-medium">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
