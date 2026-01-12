import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F14] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white hover:from-[#F43F5E] hover:to-[#E11D48] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] shadow-lg",
        destructive:
          "bg-gradient-to-r from-[#991B1B] to-[#BE185D] text-white hover:shadow-[0_0_20px_rgba(190,24,93,0.4)]",
        outline:
          "border border-[#322D3C] bg-transparent text-[#FAF5FF] hover:bg-[#2D2837] hover:border-[#E11D48]",
        secondary:
          "bg-[#2D2837] text-[#FAF5FF] hover:bg-[#3D3548] border border-[#3D3548]",
        ghost: "text-[#FAF5FF] hover:bg-[#2D2837]",
        link: "text-[#E11D48] underline-offset-4 hover:underline hover:text-[#F43F5E]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
