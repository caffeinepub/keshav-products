import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import { useGetFeaturedProducts } from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const SAMPLE_FEATURED: Product[] = [
  {
    id: 1n,
    name: "Premium Wireless Headphones",
    description: "High-quality sound experience",
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
    description: "Premium Italian leather",
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
    description: "Control all your devices",
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
    description: "Anti-aging formula",
    category: "Beauty",
    price: 6499n,
    rating: 4.7,
    reviewCount: 214n,
    isFeatured: true,
    isOnSale: true,
  },
];

export default function FeaturedProducts() {
  const { data: products, isLoading } = useGetFeaturedProducts();
  const displayProducts =
    products && products.length > 0 ? products : SAMPLE_FEATURED;

  return (
    <section className="py-16 bg-secondary" data-ocid="featured.section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Handpicked For You
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-navy">
            FEATURED PRODUCTS
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            data-ocid="featured.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-9 w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {displayProducts.map((product, i) => (
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
