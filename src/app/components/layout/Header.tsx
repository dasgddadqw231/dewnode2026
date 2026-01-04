import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "../../context/CartContext";
import { cn } from "../../../lib/utils";
import { Search, User, ShoppingBag, X, LayoutDashboard, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../../components/ui/sheet";
import logoImg from "../../../logo.png";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, openCart, closeCart } = useCart();
  const [location, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const url = `/search?search=${encodeURIComponent(searchQuery.trim())}`;
      setLocation(url);
      setIsSearchOpen(false);
      setSearchQuery("");
      window.scrollTo(0, 0);

      // Dispatch custom event to notify SearchResultsPage if already on the page
      window.dispatchEvent(new CustomEvent('search-update'));
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  // 로고 클릭 핸들러: 메뉴 닫기, 카트 닫기, 메인으로 이동
  const handleLogoClick = () => {
    closeMenu();
    closeCart();
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[110px] md:h-[120px] z-[100] bg-brand-black/95 backdrop-blur-md border-b border-brand-light/5 flex flex-col items-center justify-between py-3 pb-4 md:justify-center px-4 md:px-16 transition-all duration-300">

      {/* Desktop Actions (Search/My/Cart) - Hidden on Mobile */}
      <div className="hidden md:flex justify-between items-center md:absolute md:right-16 md:top-1/2 md:-translate-y-1/2 md:w-auto">
        <div className="flex items-center gap-5 md:gap-8 text-brand-light/80">
          {location !== "/" && (
            <button
              className="cursor-pointer hover:text-brand-cyan transition-all duration-300 bg-transparent border-none p-0 outline-none"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} strokeWidth={1} />
            </button>
          )}
          {location !== "/" && (
            <div
              className="cursor-pointer hover:text-brand-cyan transition-all duration-300 flex items-center relative"
              onClick={openCart}
            >
              <ShoppingBag size={18} strokeWidth={1} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[7px] bg-brand-cyan text-brand-black rounded-full min-w-[12px] h-[12px] flex items-center justify-center font-bold px-0.5">
                  {cartCount}
                </span>
              )}
            </div>
          )}
          <Link href="/orders">
            <span className={cn(
              "cursor-pointer hover:text-brand-cyan transition-all duration-300 block",
              location === "/orders" && "text-brand-cyan"
            )}>
              <User size={18} strokeWidth={1} />
            </span>
          </Link>
        </div>
      </div>

      {/* Logo - Center on both Mobile and Desktop */}
      <div className="relative z-10 mb-1">
        <Link href="/" onClick={handleLogoClick}>
          <img src={logoImg} alt="DEW&ODE" className="h-10 w-auto object-contain transition-transform duration-500 cursor-pointer" />
        </Link>
      </div>

      {/* Navigation (Shop/Collection) - Visible on both Mobile and Desktop */}
      <div className="flex flex-col items-center w-full mt-2">
        <div className="w-full relative h-[20px]">
          <div className="absolute left-[25%] -translate-x-1/2">
            <Link
              href="/shop"
              className={cn(
                "text-[11px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-light hover:text-brand-cyan transition-all duration-500 whitespace-nowrap",
                location === "/shop" ? "text-brand-cyan" : "text-brand-light/50"
              )}
            >
              Shop
            </Link>
          </div>

          <div className="absolute left-[75%] -translate-x-1/2">
            <Link
              href="/collection"
              className={cn(
                "text-[11px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-light hover:text-brand-cyan transition-all duration-500 whitespace-nowrap",
                location === "/collection" ? "text-brand-cyan" : "text-brand-light/50"
              )}
            >
              EDIT
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Top Icons (Search, Cart, Order) */}
      <div className="md:hidden absolute right-4 top-8 -translate-y-1/2 flex items-center gap-4">
        {/* Search */}
        {location !== "/" && (
          <button
            className="text-brand-light/70 hover:text-brand-cyan transition-colors"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} strokeWidth={1} />
          </button>
        )}

        {/* Cart */}
        {location !== "/" && (
          <button
            className="text-brand-light/70 hover:text-brand-cyan transition-colors relative"
            onClick={openCart}
          >
            <ShoppingBag size={20} strokeWidth={1} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[8px] bg-brand-cyan text-brand-black rounded-full min-w-[12px] h-[12px] flex items-center justify-center font-bold px-0.5">
                {cartCount}
              </span>
            )}
          </button>
        )}

        {/* Order History */}
        <Link href="/orders">
          <span className={cn(
            "text-brand-light/70 hover:text-brand-cyan transition-colors block",
            location === "/orders" && "text-brand-cyan"
          )}>
            <User size={20} strokeWidth={1} />
          </span>
        </Link>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-[110] bg-brand-black flex items-center justify-center px-8 fixed top-0 h-screen md:h-auto md:absolute"
          >
            <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-brand-light/20 py-4 text-xl md:text-2xl font-light tracking-widest text-brand-light outline-none focus:border-brand-cyan transition-colors uppercase placeholder:text-brand-light/20"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-light/60 hover:text-brand-cyan transition-colors"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}