import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
  multiple?: boolean;
  onImagesSelected?: (values: string[]) => void;
}

export function ImageUpload({ 
  value, 
  onChange, 
  className, 
  label = "Upload Image",
  multiple = false,
  onImagesSelected 
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const processFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error(`File ${file.name} is too large (max 5MB)`);
            return false;
        }
        return true;
    });

    if (validFiles.length === 0) return;

    if (multiple && onImagesSelected) {
        // Read all files
        const promises = validFiles.map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(results => {
            onImagesSelected(results);
        });
    } else if (onChange) {
        // Single file mode
        const file = validFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => onChange(reader.result as string);
            reader.readAsDataURL(file);
        }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border border-dashed border-brand-gray/50 bg-brand-black cursor-pointer transition-all duration-300 group overflow-hidden h-[200px] flex items-center justify-center",
          isHovering ? "border-brand-cyan bg-brand-cyan/5" : "hover:border-brand-light/20 hover:bg-brand-light/5",
          value ? "border-solid" : ""
        )}
        onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
        onDragLeave={() => setIsHovering(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsHovering(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
          }
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
        />
        
        {value ? (
          <div className="relative w-full h-full">
            <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
            <button 
              onClick={clearImage}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-none hover:bg-red-500/80 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-brand-light/40 group-hover:text-brand-cyan transition-colors">
            <Upload size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase tracking-widest">{label}</span>
            {multiple && <span className="text-[8px] text-brand-light/20">(Multiple allowed)</span>}
          </div>
        )}
      </div>
    </div>
  );
}