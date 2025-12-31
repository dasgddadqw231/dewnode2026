import { useState, useEffect } from "react";
import { useRoute } from "wouter";
<<<<<<< HEAD
import { dbService } from "../../../utils/supabase/service";
import { Product } from "../../utils/mockDb";
=======
import { db, Product } from "../../utils/mockDb";
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
import { Button } from "../../components/ui/button";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ProductDetailPage() {
  const [match, params] = useRoute("/shop/:id");
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
<<<<<<< HEAD
    const fetchProduct = async () => {
      if (params?.id) {
        try {
          const found = await dbService.products.getById(params.id);
          setProduct(found);
        } catch (error) {
          console.error("Failed to fetch product", error);
        }
      }
    };
    fetchProduct();
=======
    if (params?.id) {
      const found = db.products.getById(params.id);
      setProduct(found);
    }
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
  }, [params?.id]);

  if (!product) return <div className="h-96 flex items-center justify-center text-brand-light/20 uppercase tracking-widest text-xs">Loading...</div>;

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-20 bg-brand-black">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Gallery Section */}
        <div className="w-full lg:w-3/5 space-y-4">
          {/* Main Image */}
          <div className="aspect-[1/1] overflow-hidden bg-brand-gray/5 border border-brand-light/5 relative group">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Info Section - Sticky on Desktop */}
        <div className="w-full lg:w-2/5">
          <div className="lg:sticky lg:top-[160px] flex flex-col space-y-6"> {/* Reduced from space-y-12 */}
            <div className="space-y-4">
              <h1 className="text-xl font-normal tracking-[0.2em] uppercase text-brand-light">{product.name}</h1>
              <p className="text-lg text-brand-light/60 tracking-wider">{product.price.toLocaleString()} KRW</p>
            </div>

            {product.description && (
              <div className="border-t border-b border-brand-gray py-6 text-[12px] text-brand-light/70 tracking-widest leading-loose whitespace-pre-line">
                {product.description}
              </div>
            )}

<<<<<<< HEAD
            <Button
=======
            <Button 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
              className="w-full h-10 text-[10px] font-bold tracking-[0.4em] uppercase rounded-none bg-brand-cyan text-brand-black hover:bg-brand-light transition-colors"
              disabled={product.isSoldOut}
              onClick={() => {
                addItem(product);
                toast.success("Added to cart", {
                  style: {
                    backgroundColor: '#383838',
                    color: '#00E2E3',
                    border: '1px solid #00E2E3',
                    borderRadius: '0px',
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    letterSpacing: '0.2em'
                  }
                });
              }}
            >
              {product.isSoldOut ? "SOLD OUT" : "ADD TO CART"}
            </Button>

            {/* Accordion Sections */}
            <div className="space-y-0 border-t border-brand-light/10">
              {[
<<<<<<< HEAD
                {
                  id: 'details',
                  title: 'Details & Size',
                  content: product.details || 'Premium materials, minimalist silhouette. Designed for daily wear with a focus on durability and comfort. Available in multiple sizes.'
                },
                {
                  id: 'shipping',
                  title: 'Shipping & Returns',
                  content: product.shippingInfo || 'Standard shipping takes 3-5 business days. Returns are accepted within 14 days of delivery in original condition.'
=======
                { 
                  id: 'details', 
                  title: 'Details & Size', 
                  content: product.details || 'Premium materials, minimalist silhouette. Designed for daily wear with a focus on durability and comfort. Available in multiple sizes.' 
                },
                { 
                  id: 'shipping', 
                  title: 'Shipping & Returns', 
                  content: product.shippingInfo || 'Standard shipping takes 3-5 business days. Returns are accepted within 14 days of delivery in original condition.' 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
                }
              ].map((section) => (
                <div key={section.id} className="border-b border-brand-light/10">
                  <button
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                    className="w-full py-6 flex items-center justify-between group"
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-brand-light/80 group-hover:text-brand-cyan transition-colors">
                      {section.title}
                    </span>
                    {openSection === section.id ? (
                      <ChevronUp size={14} className="text-brand-light/40" />
                    ) : (
                      <ChevronDown size={14} className="text-brand-light/40" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openSection === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-[11px] text-brand-light/50 tracking-widest leading-relaxed uppercase">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Grid - Moved to bottom */}
      {product.detailImages && product.detailImages.length > 0 && (
        <div className="mt-20 grid grid-cols-2 gap-4">
          {product.detailImages.map((img, idx) => (
            <div key={idx} className="aspect-[1/1] overflow-hidden bg-brand-gray/5 border border-brand-light/5 relative group">
              <ImageWithFallback
                src={img}
                alt={`${product.name} detail ${idx + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}