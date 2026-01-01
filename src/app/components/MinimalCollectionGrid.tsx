import { useState, useEffect } from "react";
import { WireframePlaceholder } from "./WireframePlaceholder";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { dbService } from "../../utils/supabase/service";
import { Collection } from "../utils/mockDb";

export function MinimalCollectionGrid() {
  const [collections, setCollections] = useState<Collection[]>([]);

  const loadCollections = async () => {
    try {
      const data = await dbService.collections.getAll();
      console.log('MinimalCollectionGrid loaded collections:', data);
      setCollections(data);
    } catch (error) {
      console.error("Failed to load collections", error);
    }
  };

  useEffect(() => {
    loadCollections();

    // Refresh on window focus to sync with admin changes
    const handleFocus = () => {
      loadCollections();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Create 4x4 grid matching admin layout
  const getItemAt = (row: number, col: number) => {
    return collections.find(c => c.row === row && c.col === col);
  };

  // Generate 4x4 grid slots (16 total)
  const gridSlots = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      gridSlots.push({ row, col, item: getItemAt(row, col) });
    }
  }

  // Check if any collections exist
  if (collections.length === 0) {
    return (
      <div className="w-full bg-brand-black min-h-[60vh] flex items-center justify-center">
        <div className="text-center text-brand-light/30 text-sm tracking-widest uppercase">
          No collections available yet
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-black">
      {/* 4x4 Grid matching admin layout - all 16 slots rendered */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l border-brand-light/5">
        {gridSlots.map(({ row, col, item }) => (
          <div key={`${row}-${col}`} className="group relative aspect-square border-r border-b border-brand-light/5 overflow-hidden bg-brand-black">
            {item ? (
              <div className="w-full h-full">
                <ImageWithFallback
                  src={item.image}
                  alt="Collection"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-brand-black" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}