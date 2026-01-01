import { useState, useEffect } from "react";
import { dbService } from "../../../utils/supabase/service";
import { HeroImage } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ImageUpload } from "../../components/admin/ImageUpload";
import { Trash2, AlertCircle, Edit2, Check, X } from "lucide-react";

export function AdminHero() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [newImage, setNewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await dbService.hero.getAll();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch hero images", error);
      }
    };
    fetchImages();
  }, []);

  const handleAdd = async () => {
    if (!newImage) return;
    if (images.length >= 3) {
      toast.error("Maximum 3 hero images allowed");
      return;
    }

    try {
      await dbService.hero.add(newImage, newTitle);
      const updated = await dbService.hero.getAll();
      setImages(updated);
      setNewImage("");
      setNewTitle("");
      toast.success("Image added");
    } catch (error) {
      console.error("Failed to add hero image", error);
      toast.error("Failed to add image");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this hero image?")) {
      try {
        await dbService.hero.delete(id);
        const updated = await dbService.hero.getAll();
        setImages(updated);
        toast.success("Image deleted");
      } catch (error) {
        console.error("Failed to delete hero image", error);
        toast.error("Failed to delete image");
      }
    }
  };

  const handleEdit = (id: string) => {
    const image = images.find(img => img.id === id);
    if (image) {
      setEditingId(id);
      setEditingTitle(image.title || "");
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await dbService.hero.update(id, { title: editingTitle });
      const updated = await dbService.hero.getAll();
      setImages(updated);
      setEditingId(null);
      setEditingTitle("");
      toast.success("Title updated");
    } catch (error) {
      console.error("Failed to update title", error);
      toast.error("Failed to update title");
    }

  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">HERO IMAGES</h1>
        <p className="text-[10px] text-brand-light/40 tracking-wider uppercase">
          Manage the main visual sliders (Max 3)
        </p>
      </div>

      {/* Add New Section */}
      <div className="bg-brand-gray/5 border border-brand-gray p-8">
        {images.length < 3 ? (
          <div className="max-w-md space-y-6">
            <h2 className="text-[12px] font-medium tracking-[0.2em] uppercase text-brand-light">Add New Image</h2>
            <ImageUpload
              value={newImage}
              onChange={setNewImage}
              label="Upload Hero Image"
              className="aspect-video w-full"
            />
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full bg-brand-gray/5 border border-brand-gray p-2 text-brand-light/40 placeholder-brand-light/40"
            />
            <Button
              onClick={handleAdd}
              disabled={!newImage}
              className="w-full bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-12 text-[11px] font-bold tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Slider
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-brand-light/40 py-8">
            <AlertCircle size={20} />
            <span className="text-[11px] tracking-widest uppercase">Maximum number of hero images reached (3/3). Delete an image to add a new one.</span>
          </div>
        )
        }
      </div >

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          images.map((img, index) => (
            <div key={img.id} className="relative group">
              <div className="aspect-[21/12] overflow-hidden border border-brand-light/10 relative bg-brand-black">
                <ImageWithFallback
                  src={img.image}
                  alt={`Hero ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-brand-black/80 backdrop-blur text-brand-cyan px-3 py-1 text-[9px] font-bold tracking-widest border border-brand-cyan/20">
                    SLIDE 0{index + 1}
                  </div>
                </div>

                <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 w-12 h-12 flex items-center justify-center transition-all duration-300"
                    title="Delete Image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {editingId === img.id ? (
                <div className="mt-2">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full bg-brand-gray/5 border border-brand-gray p-2 text-brand-light/40 placeholder-brand-light/40"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      onClick={() => handleSaveEdit(img.id)}
                      className="bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-12 text-[11px] font-bold tracking-widest uppercase transition-colors"
                    >
                      <Check size={16} />
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      className="bg-brand-gray/5 text-brand-light/40 hover:bg-brand-gray/10 rounded-none h-12 text-[11px] font-bold tracking-widest uppercase transition-colors"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-light/40 text-[11px] tracking-widest uppercase">{img.title}</span>
                    <Button
                      onClick={() => handleEdit(img.id)}
                      className="bg-brand-gray/5 text-brand-light/40 hover:bg-brand-gray/10 rounded-none h-12 text-[11px] font-bold tracking-widest uppercase transition-colors"
                    >
                      <Edit2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}