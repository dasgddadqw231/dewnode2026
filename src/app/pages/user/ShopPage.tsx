import { useState, useEffect } from "react";
import { Link } from "wouter";
import { dbService } from "../../../utils/supabase/service";
import { Product } from "../../utils/mockDb";
import { cn } from "../../../lib/utils";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { WireframePlaceholder } from "../../components/WireframePlaceholder";



export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await dbService.products.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products;

  return (
    <div className="w-full bg-brand-black min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-32 pb-40">
        <div className="mb-20 flex flex-col items-start opacity-90">
          <h1 className="text-[16px] md:text-[20px] font-light tracking-[1em] text-brand-light uppercase">
            PRODUCTS
          </h1>
        </div>

        {/* Product Grid - 3 Columns with Badge Detail */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-24">
          {filteredProducts.map((product, idx) => (
            <Link key={product.id} href={`/shop/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="aspect-square mb-8 overflow-hidden relative bg-brand-gray/5 border border-brand-light/5">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Status Badges - Unified Schematic Rectangles */}
                  <div className="absolute top-0 left-0 z-10 flex flex-col items-start gap-[1px]">
                    {product.isSoldOut && (
                      <div className="bg-brand-cyan text-brand-black px-3 py-1.5 text-[7px] tracking-[0.2em] uppercase font-bold border-r border-b border-brand-black/10">
                        SOLD OUT
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 px-1">
                  <h3 className="text-[11px] font-normal text-brand-light uppercase tracking-[0.3em] leading-relaxed">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    <p className="text-[10px] text-brand-light/40 tracking-[0.2em]">
                      {product.price.toLocaleString()} KRW
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}