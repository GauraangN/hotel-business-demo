import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98]",
        gold:
          "bg-[#c5a880] text-slate-950 font-semibold hover:bg-[#d8bc95] shadow-md hover:shadow-lg transition-transform active:scale-[0.98]",
        outline:
          "border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-amber-400/50 hover:text-amber-300",
        ghost:
          "text-slate-300 hover:text-white hover:bg-white/10",
        secondary:
          "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/60",
        destructive:
          "bg-red-500/80 text-white hover:bg-red-600 border border-red-500/30",
        glass:
          "bg-slate-900/60 backdrop-blur-xl border border-white/15 text-white hover:bg-slate-800/80 hover:border-amber-400/40",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-13 rounded-xl px-8 text-base tracking-wide",
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
