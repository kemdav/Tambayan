"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarIconProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  alt?: string;
  className?: string;
  onImageChange?: (file: File) => void;
  onAvatarClicked?: () => void;
  isClickable?:boolean,
  isEditable?: boolean;
  isLoading?:boolean;
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  src: initialSrc,
  alt = "User Avatar",
  className,
  onImageChange,
  isEditable = false,
  isClickable=false,
  onAvatarClicked,
  isLoading = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = React.useState(initialSrc);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

   React.useEffect(() => {
    setImageSrc(initialSrc);
  }, [initialSrc]);

  const handleImageClick = () => {
    if (isLoading) return;
    if (isEditable && fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (!isEditable && isClickable && onAvatarClicked){
        onAvatarClicked();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  return (
    <div
      className={cn(
        "relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-black transition-transform duration-200 ease-in-out",
        isEditable && !isLoading && "cursor-pointer hover:scale-105 hover:shadow-lg", // Disable hover effects while isLoading
        isLoading && "cursor-wait", // Change cursor while isLoading
        className
      )}
      onClick={handleImageClick}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          {/* You can use a more sophisticated spinner here */}
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={cn("h-full w-full object-cover", isLoading && "opacity-50")}
          {...props}
        />
      ) : (
        <svg
          className="h-full w-full text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.993A5.993 5.993 0 015.993 15h12.014A5.993 5.993 0 0124 20.993zM12 12c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
        </svg>
      )}
      {isEditable && (
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      )}
    </div>
  );
};
