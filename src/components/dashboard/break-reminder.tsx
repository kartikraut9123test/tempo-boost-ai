import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Coffee, Eye, Droplets, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const breakTypes = [
  {
    type: 'stretch',
    icon: Eye,
    title: 'Time to Stretch',
    message: 'Take 2 minutes to stretch your neck and shoulders',
    duration: '2 min',
    color: 'bg-gradient-break'
  },
  {
    type: 'hydrate',
    icon: Droplets,
    title: 'Stay Hydrated',
    message: 'Grab a glass of water to keep your mind sharp',
    duration: '1 min',
    color: 'bg-gradient-energy'
  },
  {
    type: 'rest',
    icon: Coffee,
    title: 'Mental Break',
    message: 'Step away from your screen for a few minutes',
    duration: '5 min',
    color: 'bg-gradient-success'
  }
];

export function BreakReminder() {
  const [currentBreak, setCurrentBreak] = useState<typeof breakTypes[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate break reminders every 45 seconds for demo
    const interval = setInterval(() => {
      const randomBreak = breakTypes[Math.floor(Math.random() * breakTypes.length)];
      setCurrentBreak(randomBreak);
      setIsVisible(true);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setCurrentBreak(null), 300);
  };

  const handleTakeBreak = () => {
    // Here you would implement break timer logic
    handleDismiss();
  };

  if (!currentBreak || !isVisible) return null;

  const IconComponent = currentBreak.icon;

  return (
    <Card className={cn(
      "fixed bottom-4 right-4 p-4 w-80 animate-slide-up z-50",
      "border-primary/50 shadow-glow"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "p-2 rounded-full",
          currentBreak.color
        )}>
          <IconComponent className="w-5 h-5 text-foreground" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-foreground mb-1">
          {currentBreak.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {currentBreak.message}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Suggested: {currentBreak.duration}
        </span>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleDismiss}>
            Later
          </Button>
          <Button size="sm" onClick={handleTakeBreak}>
            Take Break
          </Button>
        </div>
      </div>
    </Card>
  );
}