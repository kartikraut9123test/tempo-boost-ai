import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Zap, CheckCircle } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    duration: number;
    energyRequired: 'low' | 'medium' | 'high';
    category: string;
    completed?: boolean;
  };
  timeSlot?: string;
  className?: string;
  onComplete?: (id: string) => void;
}

export function TaskCard({ task, timeSlot, className, onComplete }: TaskCardProps) {
  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'high': return 'bg-gradient-energy text-foreground';
      case 'medium': return 'bg-gradient-break text-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEnergyIcon = (energy: string) => {
    switch (energy) {
      case 'high': return <Zap className="w-3 h-3" />;
      case 'medium': return <Zap className="w-3 h-3 opacity-70" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div
      className={cn(
        "group relative p-4 rounded-lg border bg-card transition-all duration-300 ease-smooth",
        "hover:shadow-primary hover:border-primary/50",
        task.completed && "opacity-60",
        className
      )}
    >
      {task.completed && (
        <div className="absolute inset-0 bg-success/10 rounded-lg pointer-events-none" />
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={cn(
            "font-medium text-foreground mb-1",
            task.completed && "line-through"
          )}>
            {task.title}
          </h3>
          {timeSlot && (
            <p className="text-sm text-muted-foreground">{timeSlot}</p>
          )}
        </div>
        
        {!task.completed && onComplete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComplete(task.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <CheckCircle className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {task.category}
          </Badge>
          <div className={cn(
            "flex items-center space-x-1 px-2 py-1 rounded-full text-xs",
            getEnergyColor(task.energyRequired)
          )}>
            {getEnergyIcon(task.energyRequired)}
            <span className="capitalize">{task.energyRequired}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          {task.duration}m
        </div>
      </div>
    </div>
  );
}