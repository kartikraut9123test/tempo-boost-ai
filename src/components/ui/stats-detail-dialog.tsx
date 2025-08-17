import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap, CheckCircle, Calendar, Clock, BarChart3 } from 'lucide-react';

interface StatsDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  statType: 'tasks' | 'energy' | 'focus' | 'trend' | null;
}

const statDetails = {
  tasks: {
    icon: CheckCircle,
    title: 'Tasks Completed',
    description: 'Detailed breakdown of your task completion',
    data: {
      completed: 12,
      total: 15,
      percentage: 80,
      byCategory: [
        { name: 'Work', completed: 8, total: 10 },
        { name: 'Personal', completed: 3, total: 4 },
        { name: 'Learning', completed: 1, total: 1 }
      ],
      recentTasks: [
        { name: 'Review quarterly reports', time: '10:30 AM', category: 'Work' },
        { name: 'Team standup meeting', time: '9:00 AM', category: 'Work' },
        { name: 'Workout session', time: '7:00 AM', category: 'Personal' }
      ]
    }
  },
  energy: {
    icon: Zap,
    title: 'Energy Alignment',
    description: 'How well your tasks match your energy levels',
    data: {
      percentage: 87,
      peakHours: '9:00 AM - 11:00 AM',
      lowHours: '2:00 PM - 3:00 PM',
      energyDistribution: [
        { level: 'High Energy', tasks: 8, optimal: 10 },
        { level: 'Medium Energy', tasks: 5, optimal: 4 },
        { level: 'Low Energy', tasks: 2, optimal: 1 }
      ]
    }
  },
  focus: {
    icon: Target,
    title: 'Focus Score',
    description: 'Your concentration and deep work metrics',
    data: {
      score: 9.2,
      maxScore: 10,
      percentage: 92,
      focusSessions: 6,
      avgSessionLength: 45,
      distractions: 3,
      deepWorkHours: 4.5
    }
  },
  trend: {
    icon: TrendingUp,
    title: 'Productivity Trend',
    description: 'Your productivity improvement over time',
    data: {
      percentage: 15,
      period: 'This week vs last week',
      metrics: [
        { name: 'Tasks completed', change: '+18%', positive: true },
        { name: 'Focus time', change: '+12%', positive: true },
        { name: 'Break frequency', change: '+8%', positive: true },
        { name: 'Stress level', change: '-15%', positive: true }
      ]
    }
  }
};

export function StatsDetailDialog({ isOpen, onClose, statType }: StatsDetailDialogProps) {
  if (!statType || !statDetails[statType]) return null;

  const stat = statDetails[statType];
  const IconComponent = stat.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <IconComponent className="w-5 h-5 mr-2" />
            {stat.title}
          </DialogTitle>
          <DialogDescription>
            {stat.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {statType === 'tasks' && stat.data && 'completed' in stat.data && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.data.completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.data.total - stat.data.completed}</div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.data.percentage}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">By Category</h4>
                {stat.data.byCategory.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.completed}/{category.total}
                      </span>
                    </div>
                    <Progress value={(category.completed / category.total) * 100} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Completions</h4>
                {stat.data.recentTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <div className="text-sm font-medium">{task.name}</div>
                      <div className="text-xs text-muted-foreground">{task.category}</div>
                    </div>
                    <Badge variant="outline">{task.time}</Badge>
                  </div>
                ))}
              </div>
            </>
          )}

          {statType === 'energy' && stat.data && 'peakHours' in stat.data && (
            <>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.data.percentage}%</div>
                <div className="text-sm text-muted-foreground">Energy Alignment Score</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="text-sm font-medium text-success">Peak Hours</div>
                  <div className="text-xs text-muted-foreground">{stat.data.peakHours}</div>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <div className="text-sm font-medium text-warning">Low Energy</div>
                  <div className="text-xs text-muted-foreground">{stat.data.lowHours}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Energy Distribution</h4>
                {stat.data.energyDistribution.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{item.level}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.tasks} tasks</span>
                      <Badge variant={item.tasks <= item.optimal ? "default" : "destructive"}>
                        {item.tasks <= item.optimal ? "Optimal" : "Overloaded"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {statType === 'focus' && stat.data && 'score' in stat.data && (
            <>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.data.score}/10</div>
                <div className="text-sm text-muted-foreground">Focus Score</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">{stat.data.focusSessions}</div>
                  <div className="text-sm text-muted-foreground">Focus Sessions</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">{stat.data.avgSessionLength}m</div>
                  <div className="text-sm text-muted-foreground">Avg Length</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">{stat.data.deepWorkHours}h</div>
                  <div className="text-sm text-muted-foreground">Deep Work</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">{stat.data.distractions}</div>
                  <div className="text-sm text-muted-foreground">Distractions</div>
                </div>
              </div>

              <Progress value={stat.data.percentage} className="h-3" />
            </>
          )}

          {statType === 'trend' && stat.data && 'period' in stat.data && (
            <>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">+{stat.data.percentage}%</div>
                <div className="text-sm text-muted-foreground">{stat.data.period}</div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Metric Changes</h4>
                {stat.data.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span className="text-sm">{metric.name}</span>
                    <Badge variant={metric.positive ? "default" : "destructive"}>
                      {metric.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}