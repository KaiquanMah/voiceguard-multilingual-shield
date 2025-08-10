import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusIndicatorVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 transition-all duration-300",
  {
    variants: {
      status: {
        safe: "bg-safe border-safe-glow text-safe-foreground animate-pulse-safe",
        warning: "bg-warning border-warning-glow text-warning-foreground animate-pulse-warning",
        danger: "bg-danger border-danger-glow text-danger-foreground animate-pulse-danger",
        inactive: "bg-muted border-border text-muted-foreground",
      },
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
      },
    },
    defaultVariants: {
      status: "inactive",
      size: "md",
    },
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  pulse?: boolean;
}

const StatusIndicator = ({ className, status, size, pulse = true, ...props }: StatusIndicatorProps) => {
  return (
    <div
      className={cn(
        statusIndicatorVariants({ status, size }),
        !pulse && "animate-none",
        className
      )}
      {...props}
    />
  );
};

StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, statusIndicatorVariants };