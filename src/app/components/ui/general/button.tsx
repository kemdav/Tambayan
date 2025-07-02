import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "select-none cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-action-fresh-green text-primary-foreground shadow-xs hover:bg-action-fresh-green/40 rounded-md",
        destructive:
          "bg-action-soft-rose text-white shadow-xs hover:bg-action-soft-rose/90 focus-visible:ring-action-error/20 dark:focus-visible:ring-action-error/40 dark:bg-action-soft-rose/60 rounded-md",
        navigation:
          "bg-action-forest-green text-neutral-linen-white shadow-xs hover:bg-action-forest-green/60",
        sideNavigation:
          "sideNavBarButton justify-start text-lg h-12 bg-tint-forest-fern hover:bg-action-success-green/25 text-neutral-pure-white shadow-none rounded-[40px] w-full",
        horizontalNavigation:
          "bg-background justify-center text-lg h-12 text-tint-forest-fern transition-all duration-500 ease-in-out",
        link: "text-info underline-offset-4 underline rounded-md",
        outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "bg-transparent hover:bg-muted/40 text-inherit shadow-none",
      },
      size: {
        default: "h-9 px-4 py-1 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      isSelected : {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
        {
          variant: "sideNavigation",
          isSelected: true,
          className: "bg-action-forest-green rounded-[10px]",
        },
        {
          variant: "horizontalNavigation",
          isSelected: true,
          className: "border-b-4",
        },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      isSelected: false,
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}


function Button({
  className,
  variant,
  size,
  isSelected,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className, isSelected }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
