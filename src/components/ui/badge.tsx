import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500",
  {
    variants: {
      variant: {
        default:
          "border-amber-400/30 bg-amber-500/10 text-amber-300 backdrop-blur-sm",
        gold:
          "border-amber-300/40 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-200",
        secondary:
          "border-slate-700 bg-slate-800 text-slate-300",
        destructive:
          "border-red-500/30 bg-red-500/10 text-red-300",
        outline:
          "text-slate-300 border-white/20",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
