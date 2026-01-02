import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "../../context/CartContext";
import { useLocation } from "wouter";
import { MinimalCollectionGrid } from "../MinimalCollectionGrid";

interface UserLayoutProps {
  children: React.ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const [location] = useLocation();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-brand-black">
        <Header />
        <main className="flex-1 pt-[110px] md:pt-[120px]">
          {location === "/collection" ? (
            <MinimalCollectionGrid />
          ) : (
            children
          )}
        </main>

        <div className="w-full bg-brand-black pb-8 flex justify-center text-center">
          {location !== "/collection" && (
            null
          )}
        </div>

        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}