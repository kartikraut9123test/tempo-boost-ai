import { cn } from "@/lib/utils";

interface EnergyMeterProps {
  level: number; // 0-100
  className?: string;
}

export function EnergyMeter({ level, className }: EnergyMeterProps) {
  const getEnergyColor = (level: number) => {
    if (level >= 75) return "bg-gradient-success";
    if (level >= 50) return "bg-gradient-energy";
    if (level >= 25) return "bg-gradient-break";
    return "bg-warning";
  };

  const getEnergyLabel = (level: number) => {
    if (level >= 75) return "Peak Energy";
    if (level >= 50) return "Good Energy";
    if (level >= 25) return "Low Energy";
    return "Rest Time";
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative w-24 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-500 ease-smooth",
            getEnergyColor(level)
          )}
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        {getEnergyLabel(level)}
      </span>
    </div>
  );
}