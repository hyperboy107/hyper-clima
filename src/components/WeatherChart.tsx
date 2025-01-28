// import {
//   Area,
//   AreaChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';
// import { Card } from './ui/card';

// interface ChartData {
//   time: string;
//   value: number;
// }

// interface WeatherChartProps {
//   data: ChartData[];
//   type: 'temperature' | 'humidity' | 'wind';
// }

// export default function WeatherChart({ data, type }: WeatherChartProps) {
//   if (type === 'wind') {
//     return <WindGauge value={data[0].value} />;
//   }

//   const colorsByType = {
//     temperature: '#a855f7', // Purple for temperature
//     humidity: '#9333ea', // Darker purple for humidity
//     wind: '#6b21a8', // Even darker purple for wind
//   };

//   return (
//     <Card className="p-4">
//     <ResponsiveContainer width="100%" height={300}>
//       <AreaChart
//         data={data}
//         margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//       >
//         <defs>
//           <linearGradient id={`color${type}`} x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor={colorsByType[type]} stopOpacity={0.8} />
//             <stop offset="100%" stopColor={colorsByType[type]} stopOpacity={0.1} />
//           </linearGradient>
//         </defs>
//         <XAxis
//           dataKey="time"
//           stroke="hsl(var(--muted-foreground))"
//           fontSize={12}
//         />
//         <YAxis
//           stroke="hsl(var(--muted-foreground))"
//           fontSize={12}
//           unit={type === 'temperature' ? '°C' : '%'}
//         />
//         <Tooltip
//           contentStyle={{
//             backgroundColor: 'hsl(var(--background))',
//             border: '1px solid hsl(var(--border))',
//           }}
//         />
//         <Area
//           type="monotone"
//           dataKey="value"
//           stroke={colorsByType[type]}
//           fill={`url(#color${type})`}
//           unit={type === 'temperature' ? '°C' : '%'}
//         />
//       </AreaChart>
//     </ResponsiveContainer>
//     </Card>
//   );
// }

// function WindGauge({ value }: { value: number }) {
//   const maxSpeed = 50; // Maximum wind speed in m/s
//   // const percentage = (value / maxSpeed) * 100;
//   // const rotation = (percentage / 100) * 180; // Convert to degrees (half circle)
//   const rotation = (value / maxSpeed) * 180;

//   return (
//     <div className="relative w-full h-[300px] flex items-center justify-center">
//       <div className="relative w-48 h-24 overflow-hidden">
//         {/* Gauge background */}
//         <div className="absolute w-48 h-48 rounded-full border-[16px] border-muted -top-24" />
        
//         {/* Gauge fill */}
//         <div 
//           className="absolute w-48 h-48 rounded-full border-[16px] border-t-purple-600 border-l-purple-600 border-r-transparent border-b-transparent -top-24"
//           style={{ transform: `rotate(${rotation}deg)` }}
//         />
        
//         {/* Value */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center">
//           <div className="text-2xl font-bold">{value.toFixed(1)}</div>
//           <div className="text-sm text-muted-foreground">m/s</div>
//         </div>
//       </div>
//     </div>
//   );
// }





// // import React from 'react';
// import {
//   Area,
//   AreaChart,
//   Bar,
//   BarChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';
// import { PieChart as RechartsPieChart } from 'recharts';
// import { Card } from './ui/card';

// interface ChartData {
//   time: string;
//   value: number;
// }

// interface WeatherConditionData {
//   condition: string;
//   percentage: number;
// }

// interface WeatherChartProps {
//   data: ChartData[];
//   type: 'temperature' | 'humidity' | 'wind' | 'rainfall' | 'pressure' | 'sunrise-sunset' | 'weather-conditions';
//   conditionData?: WeatherConditionData[]; // For weather condition breakdown
// }

// export default function WeatherChart({ data, type, conditionData }: WeatherChartProps) {
//   const maxSpeed = Math.max(...data.map((d) => d.value)) || 50;

//   if (type === 'wind') {
//     return (
//       <Card className="p-4">
//         <h2 className="text-lg font-bold mb-4 text-center">Wind Speed</h2>
//         <WindGauge value={data[0].value} maxSpeed={maxSpeed} />
//       </Card>
//     );
//   }

//   if (type === 'rainfall') {
//     return (
//       <Card className="p-4">
//         <h2 className="text-lg font-bold mb-4 text-center">Rainfall</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//             <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="mm" />
//             <Tooltip />
//             <Bar dataKey="value" fill="#34d399" radius={[5, 5, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </Card>
//     );
//   }

//   if (type === 'pressure') {
//     return (
//       <Card className="p-4">
//         <h2 className="text-lg font-bold mb-4 text-center">Pressure</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
//                 <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.1} />
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//             <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="hPa" />
//             <Tooltip />
//             <Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#colorPressure)" />
//           </AreaChart>
//         </ResponsiveContainer>
//       </Card>
//     );
//   }

//   if (type === 'sunrise-sunset') {
//     return (
//       <Card className="p-4">
//         <h2 className="text-lg font-bold mb-4 text-center">Sunrise & Sunset</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//             <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//             <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="hours" />
//             <Tooltip />
//             <Bar dataKey="value" fill="#f59e0b" radius={[5, 5, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </Card>
//     );
//   }

//   if (type === 'weather-conditions' && conditionData) {
//     const COLORS = ['#34d399', '#60a5fa', '#f59e0b', '#f87171', '#a78bfa'];

//     return (
//       <Card className="p-4">
//         <h2 className="text-lg font-bold mb-4 text-center">Weather Conditions</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={conditionData}
//               dataKey="percentage"
//               nameKey="condition"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               label={(entry) => `${entry.condition}: ${entry.percentage}%`}
//             >
//               {conditionData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </Card>
//     );
//   }

//   const colorsByType: Record<string, string> = {
//     temperature: '#a855f7',
//     humidity: '#9333ea',
//     wind: '#6b21a8',
//     rainfall: '#34d399', // Added a color for rainfall
//     pressure: '#60a5fa', // Added a color for pressure
//     'sunrise-sunset': '#f59e0b', // Added a color for sunrise-sunset
//     'weather-conditions': '#8884d8', // Added a color for weather conditions
//   };

//   const color = colorsByType[type] || '#a855f7'; // Default to temperature color if no match

//   return (
//     <Card className="p-4">
//       <h2 className="text-lg font-bold mb-4 capitalize text-center">{type}</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//           <defs>
//             <linearGradient id={`color${type}`} x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor={color} stopOpacity={0.8} />
//               <stop offset="100%" stopColor={color} stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//           <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit={type === 'temperature' ? '°C' : '%'} />
//           <Tooltip />
//           <Area type="monotone" dataKey="value" stroke={color} fill={`url(#color${type})`} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// }

// function WindGauge({ value, maxSpeed }: { value: number; maxSpeed: number }) {
//   const rotation = (value / maxSpeed) * 180;

//   return (
//     <div className="relative w-full h-[300px] flex items-center justify-center">
//       <div className="relative w-48 h-24 overflow-hidden">
//         <div className="absolute w-48 h-48 rounded-full border-[16px] border-muted -top-24" />
//         <div
//           className="absolute w-48 h-48 rounded-full border-[16px] border-t-purple-600 border-l-purple-600 border-r-transparent border-b-transparent -top-24"
//           style={{ transform: `rotate(${rotation}deg)` }}
//         />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center">
//           <div className="text-2xl font-bold">{value.toFixed(1)}</div>
//           <div className="text-sm text-muted-foreground">m/s</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PieChart({ data }: { data: { condition: string; value: number }[] }) {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart
//         data={data}
//         dataKey="value"
//         nameKey="condition"
//         cx="50%"
//         cy="50%"
//         outerRadius={100}
//         label
//       >
//         <Cell key="0" fill="#ef4444" />
//         <Cell key="1" fill="#3b82f6" />
//         <Cell key="2" fill="#34d399" />
//         <Cell key="3" fill="#fbbf24" />
//       </PieChart>
//     </ResponsiveContainer>
//   )
// }







// import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// import { Card } from './ui/card';

// interface ChartData {
//   time: string;
//   value: number;
// }

// interface WeatherChartProps {
//   data: ChartData[];
//   type: 'temperature' | 'humidity' | 'wind' | 'rainfall' | 'pressure';
// }

// export default function WeatherChart({ data, type }: WeatherChartProps) {
//   const colorsByType = {
//     temperature: '#a855f7',
//     humidity: '#9333ea',
//     wind: '#6b21a8',
//     rainfall: '#1e40af', // Blue for rainfall
//     pressure: '#2563eb', // Blue for pressure
//   };

//   return (
//     <Card className="p-4">
//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//           <defs>
//             <linearGradient id={`color${type}`} x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor={colorsByType[type]} stopOpacity={0.8} />
//               <stop offset="100%" stopColor={colorsByType[type]} stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//           <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit={type === 'temperature' ? '°C' : type === 'pressure' ? 'hPa' : type === 'rainfall' ? 'mm' : '%'}/>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: 'hsl(var(--background))',
//               border: '1px solid hsl(var(--border))',
//             }}
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke={colorsByType[type]}
//             fill={`url(#color${type})`}
//             unit={type === 'temperature' ? '°C' : type === 'pressure' ? 'hPa' : type === 'rainfall' ? 'mm' : '%'}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// }







// import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// import { Card } from './ui/card';
// import { AreaChart } from 'lucide-react';

// interface ChartData {
//   time: string;
//   value: number;
// }

// interface WeatherChartProps {
//   data: ChartData[];
//   type: 'temperature' | 'humidity' | 'wind' | 'rainfall' | 'pressure';
// }

// export default function WeatherChart({ data, type }: WeatherChartProps) {
//   const colorsByType = {
//     temperature: '#a855f7',
//     humidity: '#ff1d1d',
//     wind: '#ff1de0',
//     rainfall: '#1e40af', // Blue for rainfall
//     pressure: '#FFAC1C', // Blue for pressure
//   };

//   // console.log(data); // Log data to verify it's correct

//   return (
//     <Card className="p-4">
//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//           <defs>
//             <linearGradient id={`color${type}`} x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor={colorsByType[type]} stopOpacity={0.8} />
//               <stop offset="100%" stopColor={colorsByType[type]} stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//           <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: 'hsl(var(--background))',
//               border: '1px solid hsl(var(--border))',
//             }}
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke={colorsByType[type]}
//             fill={`url(#color${type})`}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// }











import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from './ui/card';

interface ChartData {
  time: string;
  value: number;
}

interface WeatherChartProps {
  data: ChartData[];
  type: 'temperature' | 'humidity' | 'wind' | 'rainfall' | 'pressure';
}

export default function WeatherChart({ data, type }: WeatherChartProps) {
  const colorsByType = {
    temperature: '#a855f7',
    humidity: '#ff1d1d',
    wind: '#ff1de0',
    rainfall: '#1e40af', 
    pressure: '#FFAC1C', 
  };

  const formatYAxisLabel = (value: number) => {
    switch (type) {
      case 'temperature':
        return `${value}°C`;
      case 'pressure':
        return `${value} hPa`;
      case 'rainfall':
        return `${value} mm`;
      default:
        return value;
    }
  };

  return (
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorsByType[type]} stopOpacity={0.8} />
              <stop offset="100%" stopColor={colorsByType[type]} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            // tickFormatter={formatYAxisLabel} // Custom formatter
            unit="mm"
            tickFormatter={(value: any) => value.toString()} // Always return a string
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
            }}
            formatter={(value: number) => formatYAxisLabel(value)} // Custom formatter for tooltip
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={colorsByType[type]}
            fill={`url(#color${type})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
