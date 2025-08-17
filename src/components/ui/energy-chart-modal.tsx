import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Tooltip, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Battery, Clock, Zap } from 'lucide-react';

interface EnergyChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const detailedEnergyData = [
  { time: '6AM', energy: 40, focus: 30, mood: 45, tasks: 0 },
  { time: '7AM', energy: 55, focus: 50, mood: 60, tasks: 1 },
  { time: '8AM', energy: 70, focus: 65, mood: 75, tasks: 2 },
  { time: '9AM', energy: 85, focus: 90, mood: 85, tasks: 3 },
  { time: '10AM', energy: 90, focus: 95, mood: 90, tasks: 5 },
  { time: '11AM', energy: 85, focus: 85, mood: 80, tasks: 7 },
  { time: '12PM', energy: 75, focus: 70, mood: 75, tasks: 8 },
  { time: '1PM', energy: 60, focus: 55, mood: 65, tasks: 9 },
  { time: '2PM', energy: 55, focus: 45, mood: 60, tasks: 9 },
  { time: '3PM', energy: 70, focus: 65, mood: 70, tasks: 10 },
  { time: '4PM', energy: 80, focus: 75, mood: 80, tasks: 11 },
  { time: '5PM', energy: 75, focus: 70, mood: 75, tasks: 12 },
  { time: '6PM', energy: 65, focus: 60, mood: 70, tasks: 12 },
  { time: '7PM', energy: 55, focus: 50, mood: 65, tasks: 12 },
  { time: '8PM', energy: 45, focus: 40, mood: 55, tasks: 12 },
];

const weeklyData = [
  { day: 'Mon', avgEnergy: 75, peakEnergy: 90, lowEnergy: 45 },
  { day: 'Tue', avgEnergy: 80, peakEnergy: 95, lowEnergy: 50 },
  { day: 'Wed', avgEnergy: 78, peakEnergy: 92, lowEnergy: 48 },
  { day: 'Thu', avgEnergy: 82, peakEnergy: 96, lowEnergy: 52 },
  { day: 'Fri', avgEnergy: 85, peakEnergy: 98, lowEnergy: 55 },
  { day: 'Sat', avgEnergy: 70, peakEnergy: 85, lowEnergy: 40 },
  { day: 'Sun', avgEnergy: 68, peakEnergy: 82, lowEnergy: 38 },
];

export function EnergyChartModal({ isOpen, onClose }: EnergyChartModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Detailed Energy Analytics
          </DialogTitle>
          <DialogDescription>
            Comprehensive view of your energy patterns and optimization insights
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Battery className="w-4 h-4 mr-1" />
                  Peak Energy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">90%</div>
                <div className="text-xs text-muted-foreground">at 10:00 AM</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Weekly Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">+12%</div>
                <div className="text-xs text-muted-foreground">vs last week</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Optimal Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">6.5h</div>
                <div className="text-xs text-muted-foreground">high energy</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">87%</div>
                <div className="text-xs text-muted-foreground">task alignment</div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Energy Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Energy Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={detailedEnergyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.3)"
                      name="Energy Level"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="focus" 
                      stackId="2"
                      stroke="hsl(var(--accent))" 
                      fill="hsl(var(--accent) / 0.3)"
                      name="Focus Level"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      stackId="3"
                      stroke="hsl(var(--success))" 
                      fill="hsl(var(--success) / 0.3)"
                      name="Mood"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Energy Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="peakEnergy" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Peak Energy"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgEnergy" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      name="Average Energy"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lowEnergy" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Low Energy"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Energy Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Energy Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-success">Optimal</Badge>
                  <span className="text-sm">Peak energy window: 9-11 AM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-warning">Caution</Badge>
                  <span className="text-sm">Energy dip around 2 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary">Trend</Badge>
                  <span className="text-sm">Friday shows highest overall energy</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm">📈 Schedule complex tasks between 9-11 AM</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <p className="text-sm">☕ Plan breaks around 2 PM energy dip</p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm">🎯 Use Friday's high energy for important projects</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}