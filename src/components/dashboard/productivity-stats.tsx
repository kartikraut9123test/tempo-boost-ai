import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Zap, CheckCircle } from 'lucide-react';

const stats = [
  {
    title: 'Tasks Completed',
    value: '12/15',
    percentage: 80,
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    title: 'Energy Alignment',
    value: '87%',
    percentage: 87,
    icon: Zap,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    title: 'Focus Score',
    value: '9.2/10',
    percentage: 92,
    icon: Target,
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    title: 'Productivity Trend',
    value: '+15%',
    percentage: 75,
    icon: TrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10'
  }
];

export function ProductivityStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Card key={index} className="p-4 hover:shadow-primary transition-shadow duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {stat.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.percentage}%
                </span>
              </div>
              <Progress value={stat.percentage} className="h-2" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}