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
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  src: initialSrc,
  alt = "User Avatar",
  className,
  onImageChange,
  isEditable = false,
  isClickable=false,
  onAvatarClicked,
  ...props
}) => {
  const [imageSrc, setImageSrc] = React.useState(initialSrc);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
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
        isEditable && "cursor-pointer hover:scale-105 hover:shadow-lg",
        className
      )}
      onClick={handleImageClick}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="h-full w-full object-cover"
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
        />
      )}
    </div>
  );
};
