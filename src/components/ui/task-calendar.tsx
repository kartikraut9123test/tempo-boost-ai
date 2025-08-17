import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  duration: number;
  energyRequired: 'low' | 'medium' | 'high';
  category: string;
  completed?: boolean;
  scheduledFor?: Date;
}

interface TaskCalendarProps {
  tasks: Task[];
}

export function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock scheduled tasks for demo
  const scheduledTasks = tasks.map((task, index) => ({
    ...task,
    scheduledFor: addDays(new Date(), index % 7)
  }));

  const getTasksForDate = (date: Date) => {
    return scheduledTasks.filter(task => 
      task.scheduledFor && isSameDay(task.scheduledFor, date)
    );
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const getEnergyColor = (energy: 'low' | 'medium' | 'high') => {
    switch (energy) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Task Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={{
            hasTask: (date) => getTasksForDate(date).length > 0
          }}
          modifiersClassNames={{
            hasTask: "bg-primary/20 text-primary font-semibold"
          }}
          className="rounded-md border"
        />
        
        {selectedDate && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">
              Tasks for {format(selectedDate, 'MMMM d, yyyy')}
            </h4>
            {selectedDateTasks.length > 0 ? (
              <div className="space-y-2">
                {selectedDateTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-foreground">{task.title}</h5>
                      <Badge 
                        variant="secondary" 
                        className={getEnergyColor(task.energyRequired)}
                      >
                        {task.energyRequired}
                      </Badge>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.duration} minutes • {task.category}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No tasks scheduled for this day</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}