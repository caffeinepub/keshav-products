import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import {
  useAddToCart,
  useClearCart,
  useGetAllProducts,
  useGetCart,
  usePlaceOrder,
  useRemoveFromCart,
} from "../hooks/useQueries";

function formatPrice(cents: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(cents) / 100);
}

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { data: cart, isLoading: cartLoading } = useGetCart();
  const { data: products } = useGetAllProducts();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();
  const placeOrder = usePlaceOrder();

  const getProduct = (productId: bigint): Product | undefined => {
    return products?.find((p) => p.id === productId);
  };

  const total =
    cart?.items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      if (!product) return sum;
      return sum + Number(product.price) * Number(item.quantity);
    }, 0) ?? 0;

  const handlePlaceOrder = async () => {
    try {
      await placeOrder.mutateAsync();
      toast.success("Order placed successfully! 🎉", {
        description: `Total: ${formatPrice(BigInt(Math.round(total)))}`,
      });
      onClose();
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart.mutateAsync();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
            data-ocid="cart.modal"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            data-ocid="cart.sheet"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-extrabold text-lg uppercase tracking-tight text-navy">
                  Your Cart
                </h2>
                {cart && cart.items.length > 0 && (
                  <span className="bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.items.reduce((s, i) => s + Number(i.quantity), 0)}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items */}
            <ScrollArea className="flex-1 px-6 py-4">
              {cartLoading ? (
                <div className="space-y-4" data-ocid="cart.loading_state">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="w-16 h-16 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !cart || cart.items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-64 text-muted-foreground"
                  data-ocid="cart.empty_state"
                >
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1">
                    Add some products to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item, idx) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    return (
                      <div
                        key={String(item.productId)}
                        className="flex gap-4"
                        data-ocid={`cart.item.${idx + 1}`}
                      >
                        <div
                          className={`w-16 h-16 rounded-md flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${
                            {
                              Electronics: "from-blue-400 to-purple-500",
                              Fashion: "from-pink-400 to-rose-500",
                              Home: "from-green-400 to-teal-500",
                              Beauty: "from-orange-400 to-yellow-400",
                            }[product.category] ?? "from-gray-400 to-gray-500"
                          }`}
                        >
                          <ShoppingBag className="w-6 h-6 text-white opacity-70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {formatPrice(product.price)} each
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-7 h-7"
                              onClick={() =>
                                removeFromCart.mutate(item.productId)
                              }
                              data-ocid={`cart.item.${idx + 1}.delete_button`}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-bold w-6 text-center">
                              {Number(item.quantity)}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-7 h-7"
                              onClick={() =>
                                addToCart.mutate({
                                  productId: item.productId,
                                  quantity: 1n,
                                })
                              }
                              data-ocid={`cart.item.${idx + 1}.button`}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-extrabold text-sm text-navy">
                            {formatPrice(
                              BigInt(
                                Number(product.price) * Number(item.quantity),
                              ),
                            )}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 text-destructive hover:text-destructive mt-1"
                            onClick={() =>
                              removeFromCart.mutate(item.productId)
                            }
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {cart && cart.items.length > 0 && (
              <div className="px-6 py-4 border-t border-border bg-secondary/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-muted-foreground uppercase text-sm tracking-wide">
                    Total
                  </span>
                  <span className="font-extrabold text-xl text-navy">
                    {formatPrice(BigInt(Math.round(total)))}
                  </span>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white uppercase font-bold tracking-wide mb-2"
                  onClick={handlePlaceOrder}
                  disabled={placeOrder.isPending}
                  data-ocid="cart.submit_button"
                >
                  <PackageCheck className="w-4 h-4 mr-2" />
                  {placeOrder.isPending ? "Placing Order..." : "PLACE ORDER"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-destructive hover:text-destructive uppercase font-bold text-xs tracking-wide"
                  onClick={handleClearCart}
                  disabled={clearCart.isPending}
                  data-ocid="cart.delete_button"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  CLEAR CART
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
