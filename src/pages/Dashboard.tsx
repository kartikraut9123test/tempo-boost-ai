import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskCard } from '@/components/ui/task-card';
import { TaskForm } from '@/components/ui/task-form';
import { UserProfileDropdown } from '@/components/ui/user-profile-dropdown';
import { EnergyMeter } from '@/components/ui/energy-meter';
import { EnergyChart } from '@/components/dashboard/energy-chart';
import { BreakReminder } from '@/components/dashboard/break-reminder';
import { ProductivityStats } from '@/components/dashboard/productivity-stats';
import { TaskCalendar } from '@/components/ui/task-calendar';
import { StatsDetailDialog } from '@/components/ui/stats-detail-dialog';
import { EnergyChartModal } from '@/components/ui/energy-chart-modal';
import { UserInfoDialog } from '@/components/ui/user-info-dialog';
import { SettingsDialog } from '@/components/ui/settings-dialog';
import { Calendar, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
type Task = {
  id: string;
  title: string;
  duration: number;
  energyRequired: 'low' | 'medium' | 'high';
  category: string;
  completed?: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);
  const [selectedStatType, setSelectedStatType] = useState<'tasks' | 'energy' | 'focus' | 'trend' | null>(null);
  const [energyChartModalOpen, setEnergyChartModalOpen] = useState(false);
  const [userInfoDialogOpen, setUserInfoDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const { toast } = useToast();
  const currentEnergyLevel = 85;

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await loadTasks(user.id);
      }
      setLoading(false);
    };
    init();
  }, []);

  const loadTasks = async (uid: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('id, title, duration, energy_required, category, completed')
      .eq('user_id', uid)
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Failed to load tasks', description: error.message });
      return;
    }
    const mapped = (data || []).map((t: any) => ({
      id: t.id,
      title: t.title,
      duration: t.duration,
      energyRequired: t.energy_required as 'low' | 'medium' | 'high',
      category: t.category,
      completed: t.completed,
    }));
    setTasks(mapped);
  };

  const handleCompleteTask = async (id: string) => {
    if (!userId) return;
    const { error } = await supabase
      .from('tasks')
      .update({ completed: true, completed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId);
    if (error) {
      toast({ title: 'Could not complete task', description: error.message });
      return;
    }
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: true } : task));
    toast({ title: 'Task completed' });
  };

  const addTask = async (taskData: {
    title: string;
    category: string;
    duration: number;
    energyRequired: 'low' | 'medium' | 'high';
  }) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        title: taskData.title,
        duration: taskData.duration,
        energy_required: taskData.energyRequired,
        category: taskData.category,
      })
      .select('id, title, duration, energy_required, category, completed')
      .single();
    if (error) {
      toast({ title: 'Could not add task', description: error.message });
      return;
    }
    const mapped: Task = {
      id: data!.id,
      title: data!.title,
      duration: data!.duration,
      energyRequired: data!.energy_required as 'low' | 'medium' | 'high',
      category: data!.category,
      completed: data!.completed,
    };
    setTasks(prev => [mapped, ...prev]);
    toast({ title: 'Task added successfully!' });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  const handleStatClick = (statType: 'tasks' | 'energy' | 'focus' | 'trend') => {
    setSelectedStatType(statType);
    setStatsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Good morning, Alex! ⚡
            </h1>
            <p className="text-muted-foreground">
              Your energy is high - perfect time for challenging tasks
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <EnergyMeter level={currentEnergyLevel} />
            <UserProfileDropdown 
              onSignOut={handleSignOut}
              onShowUserInfo={() => setUserInfoDialogOpen(true)}
              onShowSettings={() => setSettingsDialogOpen(true)}
            />
          </div>
        </div>

        {/* Productivity Stats */}
        <ProductivityStats onStatClick={handleStatClick} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Optimized Schedule
                </CardTitle>
                <TaskForm onSubmit={addTask} />
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    timeSlot={getTimeSlot(task)}
                    onComplete={handleCompleteTask}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Task Calendar */}
          <div className="space-y-4">
            <TaskCalendar tasks={tasks} />
          </div>

          {/* Energy Analytics */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Energy Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EnergyChart onChartClick={() => setEnergyChartModalOpen(true)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-foreground">
                    🎯 <strong>Peak Focus:</strong> Schedule complex tasks between 9-11 AM
                  </p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-foreground">
                    ☕ <strong>Break Time:</strong> Take a 5-minute break in 15 minutes
                  </p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-foreground">
                    📈 <strong>Trend:</strong> Your productivity is 15% higher this week
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BreakReminder />

      {/* Dialogs */}
      <StatsDetailDialog
        isOpen={statsDialogOpen}
        onClose={() => setStatsDialogOpen(false)}
        statType={selectedStatType}
      />
      
      <EnergyChartModal
        isOpen={energyChartModalOpen}
        onClose={() => setEnergyChartModalOpen(false)}
      />
      
      <UserInfoDialog
        isOpen={userInfoDialogOpen}
        onClose={() => setUserInfoDialogOpen(false)}
      />
      
      <SettingsDialog
        isOpen={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
      />
    </div>
  );
}

function getTimeSlot(task: any): string {
  const timeSlots = [
    '9:00 AM - 9:45 AM',
    '10:15 AM - 10:35 AM',
    '11:00 AM - 12:00 PM',
    '2:30 PM - 3:00 PM'
  ];
  return timeSlots[Math.floor(Math.random() * timeSlots.length)];
}