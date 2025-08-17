import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const energyData = [
  { time: '6AM', energy: 40 },
  { time: '7AM', energy: 55 },
  { time: '8AM', energy: 70 },
  { time: '9AM', energy: 85 },
  { time: '10AM', energy: 90 },
  { time: '11AM', energy: 85 },
  { time: '12PM', energy: 75 },
  { time: '1PM', energy: 60 },
  { time: '2PM', energy: 55 },
  { time: '3PM', energy: 70 },
  { time: '4PM', energy: 80 },
  { time: '5PM', energy: 75 },
  { time: '6PM', energy: 65 },
  { time: '7PM', energy: 55 },
  { time: '8PM', energy: 45 },
];

interface EnergyChartProps {
  onChartClick?: () => void;
}

export function EnergyChart({ onChartClick }: EnergyChartProps) {
  return (
    <div 
      className="h-64 w-full cursor-pointer hover:bg-muted/20 transition-colors duration-200 rounded-lg p-2"
      onClick={onChartClick}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={energyData}>
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
          <Line 
            type="monotone" 
            dataKey="energy" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}