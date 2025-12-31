import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "../../context/CartContext";
import { cn } from "../../../lib/utils";
import { Search, User, ShoppingBag, X, LayoutDashboard, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../../components/ui/sheet";
<<<<<<< HEAD
import logoImg from "../../../logo.png";
=======
import logoImg from "figma:asset/125e01c0368c5cef3f56649d3abb745a00e9ee3d.png";
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e

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
<<<<<<< HEAD

=======
      
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
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
    <header className="fixed top-0 left-0 w-full h-[80px] md:h-[120px] z-[100] bg-brand-black/95 backdrop-blur-md border-b border-brand-light/5 flex flex-col items-center justify-between py-3 md:justify-center px-4 md:px-16 transition-all duration-300">
<<<<<<< HEAD

=======
      
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
      {/* Desktop Actions (Search/My/Cart) - Hidden on Mobile */}
      <div className="hidden md:flex justify-between items-center md:absolute md:right-16 md:top-1/2 md:-translate-y-1/2 md:w-auto">
        <div className="flex items-center gap-5 md:gap-8 text-brand-light/80">
          {location === "/" ? (
            <Link href="/admin">
              <span className="cursor-pointer hover:text-brand-cyan transition-all duration-300 block text-brand-light/80" title="Admin Demo">
                <LayoutDashboard size={16} md:size={18} strokeWidth={1} />
              </span>
            </Link>
          ) : (
<<<<<<< HEAD
            <button
=======
            <button 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
              className="cursor-pointer hover:text-brand-cyan transition-all duration-300 bg-transparent border-none p-0 outline-none"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={16} md:size={18} strokeWidth={1} />
            </button>
          )}
          <Link href="/orders">
            <span className={cn(
              "cursor-pointer hover:text-brand-cyan transition-all duration-300 block",
              location === "/orders" && "text-brand-cyan"
            )}>
              <User size={16} md:size={18} strokeWidth={1} />
            </span>
          </Link>
<<<<<<< HEAD
          <div
=======
          <div 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
            className="cursor-pointer hover:text-brand-cyan transition-all duration-300 flex items-center relative"
            onClick={openCart}
          >
            <ShoppingBag size={16} md:size={18} strokeWidth={1} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[7px] bg-brand-cyan text-brand-black rounded-full min-w-[12px] h-[12px] flex items-center justify-center font-bold px-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Logo - Center on both Mobile and Desktop */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:relative md:left-0 md:top-0 md:translate-x-0 md:translate-y-0 z-10 md:mb-1">
        <Link href="/" onClick={handleLogoClick}>
          <img src={logoImg} alt="DEW&ODE" className="h-10 w-auto object-contain transition-transform duration-500 cursor-pointer" />
        </Link>
      </div>

      {/* Desktop Navigation (Shop/Collection) - Hidden on Mobile */}
      <div className="hidden md:flex flex-col items-center w-full mt-2">
        <div className="flex items-center w-full justify-center relative">
          <div className="flex-1 flex justify-end items-center">
<<<<<<< HEAD
            <Link
              href="/shop"
=======
            <Link 
              href="/shop" 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
              className={cn(
                "text-[7px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-light hover:text-brand-cyan transition-all duration-500 pr-18 md:pr-36",
                location === "/shop" ? "text-brand-cyan" : "text-brand-light/50"
              )}
            >
              Shop
            </Link>
          </div>

          <div className="flex-1 flex justify-start items-center">
<<<<<<< HEAD
            <Link
              href="/collection"
=======
            <Link 
              href="/collection" 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
              className={cn(
                "text-[7px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-light hover:text-brand-cyan transition-all duration-500 pl-18 md:pl-36",
                location === "/collection" ? "text-brand-cyan" : "text-brand-light/50"
              )}
            >
              Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
<<<<<<< HEAD
          <SheetTrigger asChild>
            <button className="text-brand-light hover:text-brand-cyan transition-colors p-2">
              <Menu size={20} strokeWidth={1} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-brand-black border-l border-brand-gray w-[80%] max-w-[300px] p-0 z-[150]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full py-8 px-6">

              {/* Top Icons: Search, User, Cart */}
              <div className="flex items-center justify-between px-2 mb-8">
                <button
                  className="text-brand-light/70 hover:text-brand-cyan transition-colors p-2"
                  onClick={() => {
                    closeMenu();
                    setTimeout(() => setIsSearchOpen(true), 150);
                  }}
                >
                  <Search size={22} strokeWidth={1} />
                </button>

                <Link href="/orders" onClick={closeMenu}>
                  <span className={cn(
                    "text-brand-light/70 hover:text-brand-cyan transition-colors block p-2",
                    location === "/orders" && "text-brand-cyan"
                  )}>
                    <User size={22} strokeWidth={1} />
                  </span>
                </Link>

                <button
                  className="text-brand-light/70 hover:text-brand-cyan transition-colors p-2 relative"
                  onClick={() => {
                    closeMenu();
                    openCart();
                  }}
                >
                  <ShoppingBag size={22} strokeWidth={1} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-0 text-[8px] bg-brand-cyan text-brand-black rounded-full min-w-[14px] h-[14px] flex items-center justify-center font-bold px-0.5">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="h-px bg-brand-light/10 w-full mb-8" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-8 px-2">
                <Link href="/shop" onClick={closeMenu}>
                  <span className={cn(
                    "text-lg uppercase tracking-[0.2em] font-light hover:text-brand-cyan transition-colors block",
                    location === "/shop" ? "text-brand-cyan" : "text-brand-light"
                  )}>
                    Shop
                  </span>
                </Link>
                <Link href="/collection" onClick={closeMenu}>
                  <span className={cn(
                    "text-lg uppercase tracking-[0.2em] font-light hover:text-brand-cyan transition-colors block",
                    location === "/collection" ? "text-brand-cyan" : "text-brand-light"
                  )}>
                    Collection
                  </span>
                </Link>
              </div>
            </div>
          </SheetContent>
=======
            <SheetTrigger asChild>
                <button className="text-brand-light hover:text-brand-cyan transition-colors p-2">
                    <Menu size={20} strokeWidth={1} />
                </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-brand-black border-l border-brand-gray w-[80%] max-w-[300px] p-0 z-[150]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full py-8 px-6">
                    
                    {/* Top Icons: Search, User, Cart */}
                    <div className="flex items-center justify-between px-2 mb-8">
                        <button 
                            className="text-brand-light/70 hover:text-brand-cyan transition-colors p-2"
                            onClick={() => {
                                closeMenu();
                                setTimeout(() => setIsSearchOpen(true), 150);
                            }}
                        >
                            <Search size={22} strokeWidth={1} />
                        </button>

                        <Link href="/orders" onClick={closeMenu}>
                             <span className={cn(
                                "text-brand-light/70 hover:text-brand-cyan transition-colors block p-2",
                                location === "/orders" && "text-brand-cyan"
                             )}>
                                <User size={22} strokeWidth={1} />
                            </span>
                        </Link>

                        <button 
                            className="text-brand-light/70 hover:text-brand-cyan transition-colors p-2 relative"
                            onClick={() => {
                                closeMenu();
                                openCart();
                            }}
                        >
                            <ShoppingBag size={22} strokeWidth={1} />
                            {cartCount > 0 && (
                              <span className="absolute top-1 right-0 text-[8px] bg-brand-cyan text-brand-black rounded-full min-w-[14px] h-[14px] flex items-center justify-center font-bold px-0.5">
                                {cartCount}
                              </span>
                            )}
                        </button>
                    </div>

                    <div className="h-px bg-brand-light/10 w-full mb-8" />

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-8 px-2">
                        <Link href="/shop" onClick={closeMenu}>
                            <span className={cn(
                                "text-lg uppercase tracking-[0.2em] font-light hover:text-brand-cyan transition-colors block",
                                location === "/shop" ? "text-brand-cyan" : "text-brand-light"
                            )}>
                                Shop
                            </span>
                        </Link>
                        <Link href="/collection" onClick={closeMenu}>
                            <span className={cn(
                                "text-lg uppercase tracking-[0.2em] font-light hover:text-brand-cyan transition-colors block",
                                location === "/collection" ? "text-brand-cyan" : "text-brand-light"
                            )}>
                                Collection
                            </span>
                        </Link>
                    </div>
                </div>
            </SheetContent>
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
        </Sheet>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
<<<<<<< HEAD
          <motion.div
=======
          <motion.div 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
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
<<<<<<< HEAD
              <button
=======
              <button 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
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