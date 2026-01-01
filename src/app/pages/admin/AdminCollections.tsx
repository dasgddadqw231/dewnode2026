import { useState, useEffect } from "react";
import { dbService } from "../../../utils/supabase/service";
import { Collection } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { ImageUpload } from "../../components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await dbService.collections.getAll();
        setCollections(data);
      } catch (error) {
        console.error("Failed to fetch collections", error);
      }
    };
    fetchCollections();
  }, []);

  const handleImageUpload = async (image: string, row: number, col: number) => {
    if (!image) return;

    try {
      await dbService.collections.add({
        image,
        row,
        col
      });
      const updated = await dbService.collections.getAll();
      setCollections(updated);
      toast.success("Image added to collection");
    } catch (error) {
      console.error("Failed to add collection image", error);
      toast.error("Failed to add image");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove image?")) {
      try {
        await dbService.collections.delete(id);
        const updated = await dbService.collections.getAll();
        setCollections(updated);
        toast.success("Image removed");
      } catch (error) {
        console.error("Failed to remove collection image", error);
        toast.error("Failed to remove image");
      }
    }
  };

  const getCollectionAt = (row: number, col: number) => {
    return collections.find(c => c.row === row && c.col === col);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">COLLECTION GRID (4x4)</h1>
      </div>

      <div className="bg-brand-gray/5 border border-brand-gray p-8">
        <div className="grid grid-cols-4 gap-4 aspect-square max-w-[800px] mx-auto">
          {Array.from({ length: 16 }).map((_, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const item = getCollectionAt(row, col);

            return (
              <div key={index} className="relative w-full h-full border border-brand-light/10 bg-brand-black flex items-center justify-center overflow-hidden group">
                {item ? (
                  <>
                    <ImageWithFallback
                      src={item.image}
                      alt="Collection"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <X size={24} />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full p-2">
                    <ImageUpload
                      onChange={(val) => handleImageUpload(val, row, col)}
                      className="w-full h-full"
                      label="+"
                    />
                  </div>
                )}
                <div className="absolute top-1 left-2 text-[8px] text-brand-light/20 pointer-events-none">
                  {row},{col}
                </div>
              </div>
            );
          })}
        </div >
      </div >
    </div >
  );
}