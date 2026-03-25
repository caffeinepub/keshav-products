import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { useAddToCart } from "../hooks/useQueries";

function formatPrice(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "fill-gold text-gold"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Electronics: "from-blue-500 to-purple-600",
  Fashion: "from-pink-400 to-rose-500",
  Home: "from-green-400 to-teal-500",
  Beauty: "from-orange-400 to-yellow-400",
};

function ProductImagePlaceholder({
  category,
  name,
}: { category: string; name: string }) {
  const gradient = CATEGORY_GRADIENTS[category] || "from-gray-400 to-gray-500";
  return (
    <div
      className={`w-full h-48 bg-gradient-to-br ${gradient} flex items-center justify-center rounded-t-lg`}
    >
      <div className="text-white text-center px-3">
        <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-60" />
        <p className="text-xs font-medium opacity-80 line-clamp-2">{name}</p>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addToCart = useAddToCart();

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1n });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden group"
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="relative overflow-hidden">
        <ProductImagePlaceholder
          category={product.category}
          name={product.name}
        />
        {product.isOnSale && (
          <Badge className="absolute top-2 left-2 bg-primary text-white border-0 text-[10px] font-bold uppercase">
            <Tag className="w-2.5 h-2.5 mr-1" /> SALE
          </Badge>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-bold text-sm text-foreground mb-2 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            ({Number(product.reviewCount)})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-navy">
            {formatPrice(product.price)}
          </span>
        </div>
        <Button
          className="w-full mt-3 bg-primary hover:bg-primary/90 text-white uppercase font-bold tracking-wide text-xs"
          size="sm"
          onClick={handleAddToCart}
          disabled={addToCart.isPending}
          data-ocid={`products.item.${index + 1}.button`}
        >
          {added ? (
            <span className="flex items-center gap-1">
              <span>✓</span> Added!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <ShoppingCart className="w-3.5 h-3.5" /> ADD TO CART
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
