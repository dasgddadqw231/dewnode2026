import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { dbService } from "../../../utils/supabase/service";
import { Product } from "../../utils/mockDb";
import { cn } from "../../../lib/utils";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function SearchResultsPage() {
  const [location] = useLocation();
  const [results, setResults] = useState<Product[]>([]);

  // Get query from URL whenever location changes or component mounts
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("search") || "";

  useEffect(() => {
    const performSearch = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get("search") || "";

      if (query) {
        try {
          const allProducts = await dbService.products.getAll();
          const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
          );
          setResults(filtered);
        } catch (error) {
          console.error("Failed to search products", error);
        }
      } else {
        setResults([]);
      }
    };

    // Initial search
    performSearch();

    // Listen for custom search update event
    const handleSearchUpdate = () => {
      performSearch();
    };

    window.addEventListener('search-update', handleSearchUpdate);

    // Also listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleSearchUpdate);

    return () => {
      window.removeEventListener('search-update', handleSearchUpdate);
      window.removeEventListener('popstate', handleSearchUpdate);
    };
  }, [location]);

  return (
    <div className="w-full bg-brand-black min-h-screen pt-16 md:pt-[120px]">
      {/* Search Result Header - Schematic Style */}
      <div className="max-w-[1440px] mx-auto px-8 pb-8 md:pb-20 border-b border-brand-light/5">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[24px] md:text-[32px] font-light tracking-[0.4em] text-brand-light uppercase">
            {query}
          </h2>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-24">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-24">
            {results.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] mb-3 md:mb-8 overflow-hidden relative bg-brand-gray/5 border border-brand-light/5">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    />

                    <div className="absolute top-0 left-0 z-10">
                      {product.isSoldOut && (
                        <div className="bg-brand-cyan text-brand-black px-3 py-1.5 text-[7px] tracking-[0.2em] uppercase font-bold">
                          SOLD OUT
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 px-1">
                    <h3 className="text-[10px] font-normal text-brand-light uppercase tracking-[0.2em]">
                      {product.name}
                    </h3>
                    <p className="text-[9px] text-brand-light/40 tracking-[0.1em]">
                      {product.price.toLocaleString()} KRW
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="w-20 h-20 border border-dashed border-brand-light/10 flex items-center justify-center mb-8">
              <div className="w-10 h-px bg-brand-light/20 rotate-45 absolute" />
              <div className="w-10 h-px bg-brand-light/20 -rotate-45 absolute" />
            </div>
            <p className="text-[11px] tracking-[0.5em] text-brand-light/40 uppercase">
              No matching products found
            </p>
            <Link href="/shop" className="mt-12 text-[9px] tracking-[0.3em] text-brand-cyan uppercase hover:opacity-70 transition-opacity">
              Back to Shop [→]
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}