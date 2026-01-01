import { useState, useEffect } from "react";
import { dbService } from "../../../utils/supabase/service";
import { Product } from "../../utils/mockDb";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ImageUpload } from "../../components/admin/ImageUpload";
import { Plus, X, Pencil, Trash2 } from "lucide-react";

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Product, 'id' | 'createdAt'>>();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // State for detail images and tags
  const [detailImages, setDetailImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

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

  const resetForm = () => {
    reset({
      name: '',
      price: 0,
      stock: 0,
      image: '',
      description: '',
      details: '',
      shippingInfo: '',
      isSoldOut: false
    });
    setDetailImages([]);
    setTags([]);
    setCurrentTag("");
    setEditingId(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("stock", product.stock);
    setValue("image", product.image);
    setValue("description", product.description || "");
    setValue("details", product.details || "");
    setValue("shippingInfo", product.shippingInfo || "");
    setValue("isSoldOut", product.isSoldOut);
    setDetailImages(product.detailImages || []);
    setTags(product.tags || []);
    setIsOpen(true);
  };

  const onSubmit = async (data: Omit<Product, 'id' | 'createdAt'>) => {
    const productData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      isSoldOut: Boolean(data.isSoldOut),
      detailImages: detailImages,
      tags: tags
    };

    try {
      if (editingId) {
        await dbService.products.update(editingId, productData);
        toast.success("Product updated");
      } else {
        await dbService.products.add(productData);
        toast.success("Product added");
      }

      const updated = await dbService.products.getAll();
      setProducts(updated);
      setIsOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Failed to save product", error);
      toast.error(`Failed to save product: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await dbService.products.delete(id);
        const updated = await dbService.products.getAll();
        setProducts(updated);
        toast.success("Product deleted");
      } catch (error: any) {
        console.error("Failed to delete product", error);
        toast.error(`Failed to delete product: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const addDetailImages = (urls: string[]) => {
    const remainingSlots = 6 - detailImages.length;
    if (remainingSlots <= 0) {
      toast.error("Maximum 6 detail images allowed");
      return;
    }

    const newImages = urls.slice(0, remainingSlots);
    if (newImages.length < urls.length) {
      toast.info(`Only ${remainingSlots} images added (max 6 limit)`);
    }

    setDetailImages([...detailImages, ...newImages]);
  };

  const removeDetailImage = (index: number) => {
    setDetailImages(detailImages.filter((_, i) => i !== index));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
    e.preventDefault(); // Prevent form submission if enter is pressed

    const trimmed = currentTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Watch main image for preview in form
  const mainImage = watch("image");

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">PRODUCTS</h1>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none text-[11px] font-bold tracking-widest uppercase px-8 h-12">
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-brand-black border-brand-gray text-brand-light rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[12px] font-medium tracking-[0.2em] uppercase text-brand-cyan">
                {editingId ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription className="sr-only">Form to manage product</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Images */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Main Image</label>
                    <ImageUpload
                      value={mainImage}
                      onChange={(val) => setValue("image", val)}
                      label="Upload Main"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Detail Images</label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {detailImages.map((img, idx) => (
                        <div key={idx} className="aspect-square relative group border border-brand-light/10">
                          <img src={img} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeDetailImage(idx)}
                            className="absolute top-0 right-0 bg-black/50 p-1 hover:bg-red-500 text-white"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      <div className="aspect-square relative">
                        <ImageUpload
                          className="h-full"
                          multiple
                          onImagesSelected={addDetailImages}
                          label="+"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Info */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Product Info</label>
                    <Input {...register("name")} placeholder="PRODUCT NAME" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12 placeholder:text-brand-light/20" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Price</label>
                      <Input {...register("price")} type="number" placeholder="PRICE" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12 placeholder:text-brand-light/20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Stock</label>
                      <Input {...register("stock")} type="number" placeholder="QTY" required className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12 placeholder:text-brand-light/20" />
                    </div>
                  </div>



                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Search Tags</label>
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="TYPE & ENTER"
                        className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none h-12 placeholder:text-brand-light/20 flex-1"
                      />
                      <Button type="button" onClick={handleAddTag} className="w-12 h-12 bg-brand-gray/20 hover:bg-brand-cyan hover:text-black rounded-none">
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tags.map((tag, idx) => (
                        <div key={idx} className="bg-brand-gray/20 border border-brand-light/10 text-brand-light px-2 py-1 flex items-center gap-2 text-[9px] tracking-widest uppercase">
                          <span>{tag}</span>
                          <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Description</label>
                    <Textarea {...register("description")} placeholder="Short description..." className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none min-h-[60px] placeholder:text-brand-light/20" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Detail & Size</label>
                    <Textarea {...register("details")} placeholder="Material, Sizing info..." className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none min-h-[60px] placeholder:text-brand-light/20" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-brand-light/60">Shipping & Returns</label>
                    <Textarea {...register("shippingInfo")} placeholder="Shipping policy..." className="bg-brand-black border-brand-gray text-brand-light text-[11px] tracking-widest rounded-none min-h-[60px] placeholder:text-brand-light/20" />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      {...register("isSoldOut")}
                      id="isSoldOut"
                      className="w-4 h-4 rounded-none border-brand-gray bg-transparent checked:bg-brand-cyan checked:border-brand-cyan appearance-none border cursor-pointer relative after:content-[''] after:hidden checked:after:block after:absolute after:top-[2px] after:left-[5px] after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-black after:rotate-45"
                    />
                    <label htmlFor="isSoldOut" className="text-[10px] uppercase tracking-widest text-brand-light cursor-pointer select-none">Mark as Sold Out</label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-14 text-[11px] font-bold tracking-widest uppercase transition-colors">
                {editingId ? "Update Product" : "Save Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-brand-gray bg-brand-gray/5">
        <table className="w-full text-[11px] tracking-wider text-left uppercase">
          <thead className="border-b border-brand-gray">
            <tr>
              <th className="p-6 font-medium text-brand-light/40 w-[100px]">Image</th>
              <th className="p-6 font-medium text-brand-light/40">Name</th>
              <th className="p-6 font-medium text-brand-light/40">Search Tags</th>
              <th className="p-6 font-medium text-brand-light/40">Price</th>
              <th className="p-6 font-medium text-brand-light/40">Stock</th>
              <th className="p-6 font-medium text-brand-light/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-brand-gray/10 transition-colors group">
                <td className="p-4 pl-6">
                  <div className="w-12 h-16 overflow-hidden relative border border-brand-light/10">
                    <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-6 text-brand-light font-medium">{product.name}</td>
                <td className="p-6 text-brand-light/60">
                  {product.tags && product.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="inline-block px-1.5 py-0.5 border border-brand-light/10 text-[9px] text-brand-light/60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-brand-light/20">-</span>
                  )}
                </td>
                <td className="p-6 text-brand-light/60">{product.price.toLocaleString()}</td>
                <td className="p-6 text-brand-light/60">
                  <span className={product.stock <= 5 ? "text-red-400" : "text-brand-light/60"}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-brand-light/40 hover:text-brand-cyan transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-brand-light/40 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}