import { ShoppingBag } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const SHOP_LINKS = [
  "New Arrivals",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sale Items",
];
const COMPANY_LINKS = ["About Us", "Careers", "Press", "Blog"];
const SUPPORT_LINKS = [
  "Help Center",
  "Contact Us",
  "Returns & Refunds",
  "Shipping Info",
  "Track Order",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="bg-navy text-white" data-ocid="footer.section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                Keshav Products
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium quality products crafted with care. Bringing you the best
              in every category.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-extrabold uppercase text-sm tracking-widest mb-4 text-white/90">
              Shop
            </h3>
            <ul className="space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-white/60 hover:text-primary text-sm transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-extrabold uppercase text-sm tracking-widest mb-4 text-white/90">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-white/60 hover:text-primary text-sm transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-extrabold uppercase text-sm tracking-widest mb-4 text-white/90">
              Support
            </h3>
            <ul className="space-y-2">
              {SUPPORT_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-white/60 hover:text-primary text-sm transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
