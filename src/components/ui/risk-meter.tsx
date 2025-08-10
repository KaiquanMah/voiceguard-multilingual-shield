import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface RiskMeterProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const RiskMeter = ({ value, className, showLabel = true, size = "md" }: RiskMeterProps) => {
  const getRiskLevel = (val: number) => {
    if (val <= 30) return { level: "Safe", color: "safe", glow: "shadow-safe" };
    if (val <= 70) return { level: "Suspicious", color: "warning", glow: "shadow-warning" };
    return { level: "Scam Alert", color: "danger", glow: "shadow-danger" };
  };

  const { level, color, glow } = getRiskLevel(value);
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">Risk Level</span>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm font-bold",
              color === "safe" && "text-safe",
              color === "warning" && "text-warning", 
              color === "danger" && "text-danger"
            )}>
              {level}
            </span>
            <span className="text-xs text-muted-foreground">{value}%</span>
          </div>
        </div>
      )}
      <div className={cn("relative", glow)}>
        <Progress 
          value={value} 
          className={cn(
            sizeClasses[size],
            "bg-secondary",
            color === "safe" && "[&>div]:bg-gradient-safe",
            color === "warning" && "[&>div]:bg-gradient-warning",
            color === "danger" && "[&>div]:bg-gradient-danger"
          )}
        />
      </div>
    </div>
  );
};

export { RiskMeter };