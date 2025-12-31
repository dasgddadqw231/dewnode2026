import { useState, useEffect } from "react";
import { db, Collection } from "../../utils/mockDb";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function CollectionPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  const loadCollections = () => {
    const data = db.collections.getAll();
    console.log('Loading collections:', data); // Debug log
    setCollections(data);
  };

  useEffect(() => {
    loadCollections();

    // Refresh on window focus
    const handleFocus = () => {
      loadCollections();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // If no collections at all
  if (collections.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 bg-brand-black min-h-screen">
        <h1 className="text-2xl font-light tracking-[0.4em] text-center mb-20 uppercase text-brand-light">COLLECTION</h1>
        <div className="text-center text-brand-light/30 text-sm tracking-widest uppercase">
          No collections available yet
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 bg-brand-black min-h-screen">
      <h1 className="text-2xl font-light tracking-[0.4em] text-center mb-20 uppercase text-brand-light">COLLECTION</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-[1000px] mx-auto">
        {collections.map((item) => (
          <div key={item.id} className="aspect-[4/5] w-full relative">
            <div className="w-full h-full relative group overflow-hidden border border-brand-light/5">
              <ImageWithFallback 
                src={item.image} 
                alt="Collection" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}