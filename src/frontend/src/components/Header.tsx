import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useGetCart } from "../hooks/useQueries";

interface HeaderProps {
  onCartClick: () => void;
}

const NAV_LINKS = [
  { label: "Shop All", filter: "all" },
  { label: "New Arrivals", filter: "new" },
  { label: "Electronics", filter: "Electronics" },
  { label: "Fashion", filter: "Fashion" },
  { label: "Home", filter: "Home" },
  { label: "Sale", filter: "sale" },
];

export default function Header({ onCartClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: cart } = useGetCart();
  const cartCount =
    cart?.items.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0;

  const scrollToProducts = (filter: string) => {
    const el = document.getElementById("all-products");
    el?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("filterChange", { detail: filter }));
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-border shadow-xs"
      data-ocid="header.section"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToProducts("all")}
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-navy">
            Keshav Products
          </span>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          data-ocid="header.section"
        >
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.filter}
              onClick={() => scrollToProducts(link.filter)}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary ${
                link.filter === "sale" ? "text-primary" : "text-foreground/70"
              }`}
              data-ocid={`nav.${link.filter.toLowerCase()}.link`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Utility Icons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
            aria-label="Cart"
            data-ocid="cart.open_modal_button"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-primary text-white border-0">
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.filter}
              onClick={() => scrollToProducts(link.filter)}
              className="text-left text-sm font-semibold uppercase tracking-wide text-foreground/70 hover:text-primary py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
