// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useToast } from '@/components/ui/use-toast';
// import WeatherChart from './WeatherChart';
// import {
//   Cloud,
//   Droplets,
//   Thermometer,
//   Wind,
// } from 'lucide-react';

// const API_KEY = '8d2de98e089f1c28e1a22fc19a24ef04';
// const API_URL = 'https://api.openweathermap.org/data/2.5';

// interface WeatherData {
//   main: {
//     temp: number;
//     humidity: number;
//     feels_like: number;
//   };
//   weather: Array<{
//     main: string;
//     description: string;
//     icon: string;
//   }>;
//   wind: {
//     speed: number;
//   };
//   name: string;
// }

// interface WeatherDashboardProps {
//   city: string;
// }

// export default function WeatherDashboard({ city }: WeatherDashboardProps) {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
//         );
//         if (!response.ok) throw new Error('City not found');
//         const data = await response.json();
//         setWeather(data);
//       } catch (error) {
//         toast({
//           title: 'Error',
//           description: 'Failed to fetch weather data. Please try again.',
//           variant: 'destructive',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (city) {
//       fetchWeather();
//     }
//   }, [city, toast]);

//   if (loading) {
//     return <WeatherSkeleton />;
//   }

//   if (!weather) {
//     return null;
//   }

//   const backgroundImage = `https://source.unsplash.com/1600x900/?${weather.weather[0].main},landscape`;

//   // Generate hourly forecast data (simulated)
//   const generateHourlyData = (baseValue: number, variance: number) => {
//     const hours = Array.from({ length: 24 }, (_, i) => i);
//     return hours.map(hour => {
//       const random = Math.random() * variance * 2 - variance;
//       return {
//         time: `${hour.toString().padStart(2, '0')}:00`,
//         value: Math.round((baseValue + random) * 10) / 10
//       };
//     });
//   };

//   const hourlyTemperature = generateHourlyData(weather.main.temp, 3);
//   const hourlyHumidity = generateHourlyData(weather.main.humidity, 10);
//   const hourlyWind = generateHourlyData(weather.wind.speed, 2);



//   return (
//     <div className="space-y-8 animate-fade-in">
//       <div
//         className="relative h-[300px] rounded-lg overflow-hidden bg-cover bg-center"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       >
//         <div className="absolute inset-0 bg-black/40" /> 
//         <div className="absolute inset-0 p-8 text-white">
//           <div className="h-full flex flex-col justify-between">
//             <h1 className="text-4xl font-bold">{weather.name}</h1>
//             <div>
//               <p className="text-6xl font-bold mb-2">
//                 {Math.round(weather.main.temp)}°C
//               </p>
//               <p className="text-xl capitalize">
//                 {weather.weather[0].description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <WeatherCard
//           title="Temperature"
//           value={`${Math.round(weather.main.temp)}°C`}
//           icon={<Thermometer className="h-4 w-4" />}
//         />
//         <WeatherCard
//           title="Humidity"
//           value={`${weather.main.humidity}%`}
//           icon={<Droplets className="h-4 w-4" />}
//         />
//         <WeatherCard
//           title="Wind Speed"
//           value={`${weather.wind.speed} m/s`}
//           icon={<Wind className="h-4 w-4" />}
//         />
//         <WeatherCard
//           title="Feels Like"
//           value={`${Math.round(weather.main.feels_like)}°C`}
//           icon={<Cloud className="h-4 w-4" />}
//         />
//       </div>

//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Temperature</CardTitle>
//           </CardHeader>
//           <CardContent className="h-[400px]">
//             <WeatherChart
//               data={hourlyTemperature}
//               type="temperature"
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Humidity</CardTitle>
//           </CardHeader>
//           <CardContent className="h-[400px]">
//             <WeatherChart
//               data={hourlyHumidity}
//               type="humidity"
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Wind Speed</CardTitle>
//           </CardHeader>
//           <CardContent className="h-[400px]">
//             <WeatherChart
//               data={hourlyWind}
//               type="wind"
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// function WeatherCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         {icon}
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{value}</div>
//       </CardContent>
//     </Card>
//   );
// }

// function WeatherSkeleton() {
//   return (
//     <div className="space-y-8">
//       <Skeleton className="h-[300px] w-full" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {Array(4)
//           .fill(0)
//           .map((_, i) => (
//             <Card key={i}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <Skeleton className="h-4 w-[100px]" />
//                 <Skeleton className="h-4 w-4" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-8 w-[80px]" />
//               </CardContent>
//             </Card>
//           ))}
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import WeatherChart from './WeatherChart';
import {
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  CloudRain,
  ThermometerSun,
  Sun,
  ArrowUpRight,
  Snowflake,
} from 'lucide-react';

const API_KEY = '8d2de98e089f1c28e1a22fc19a24ef04';
const API_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  rain?: {
    "1h": number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
}

interface WeatherDashboardProps {
  city: string;
}

export default function WeatherDashboard({ city }: WeatherDashboardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch weather data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city, toast]);

  if (loading) {
    return <WeatherSkeleton />;
  }

  if (!weather) {
    return null;
  }

  const backgroundImage = `https://source.unsplash.com/1600x900/?${weather.weather[0].main},landscape`;

  const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'rain':
      return <CloudRain className="h-6 w-6" />;
    case 'snow':
      return <Snowflake className="h-6 w-6" />;
    case 'clear':
      return <Sun className="h-6 w-6" />;
    case 'cloudy':
      return <Cloud className="h-6 w-6" />;
    default:
      return <Sun className="h-6 w-6" />; // Default icon if no condition matches
  }
};

  // Generate hourly forecast data (simulated)
  const generateHourlyData = (baseValue: number, variance: number) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => {
      const random = Math.random() * variance * 2 - variance;
      return {
        time: `${hour.toString().padStart(2, '0')}:00`,
        value: Math.round((baseValue + random) * 10) / 10
      };
    });
  };

  const hourlyTemperature = generateHourlyData(weather.main.temp, 3);
  const hourlyHumidity = generateHourlyData(weather.main.humidity, 10);
  const hourlyWind = generateHourlyData(weather.wind.speed, 2);

  const rainfall = weather.rain ? weather.rain["1h"] : 0;
  const pressure = weather.main.pressure;
  const sunriseTime = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString();
  const weatherCondition = weather.weather[0].description;

  const rainfallData = [
  { time: '00:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '01:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '02:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '03:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '04:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '05:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '06:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '07:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '08:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '09:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '10:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '11:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '12:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '13:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '14:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '15:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '16:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '17:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '18:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '19:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '20:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '21:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '22:00', value: rainfall }, // Example: you can update the time dynamically
  { time: '23:00', value: rainfall }, // Example: you can update the time dynamically
];

const pressureData = [
  { time: '00:00', value: pressure },
  { time: '01:00', value: pressure },
  { time: '02:00', value: pressure },
  { time: '03:00', value: pressure },
  { time: '04:00', value: pressure },
  { time: '05:00', value: pressure },
  { time: '06:00', value: pressure },
  { time: '07:00', value: pressure },
  { time: '08:00', value: pressure },
  { time: '09:00', value: pressure },
  { time: '10:00', value: pressure },
  { time: '11:00', value: pressure },
  { time: '12:00', value: pressure },
  { time: '13:00', value: pressure },
  { time: '14:00', value: pressure },
  { time: '15:00', value: pressure },
  { time: '16:00', value: pressure },
  { time: '17:00', value: pressure },
  { time: '18:00', value: pressure },
  { time: '19:00', value: pressure },
  { time: '20:00', value: pressure },
  { time: '21:00', value: pressure },
  { time: '22:00', value: pressure },
  { time: '23:00', value: pressure },
];


  return (
    <div className="space-y-8 animate-fade-in">
      <div
        className="relative h-[300px] rounded-lg overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 p-8 text-white">
          <div className="h-full flex flex-col justify-between">
            <h1 className="text-4xl font-bold">{weather.name}</h1>
            <div>
              <p className="text-6xl font-bold mb-2">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-xl capitalize">{weatherCondition}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WeatherCard
          title="Temperature"
          value={`${Math.round(weather.main.temp)}°C`}
          icon={<Thermometer className="h-4 w-4" />}
        />
        <WeatherCard
          title="Humidity"
          value={`${weather.main.humidity}%`}
          icon={<Droplets className="h-4 w-4" />}
        />
        <WeatherCard
          title="Wind Speed"
          value={`${weather.wind.speed} m/s`}
          icon={<Wind className="h-4 w-4" />}
        />
        <WeatherCard
          title="Feels Like"
          value={`${Math.round(weather.main.feels_like)}°C`}
          icon={<Cloud className="h-4 w-4" />}
        />
        <WeatherCard
          title="Rainfall"
          value={`${rainfall ? rainfall : 0} mm`}
          icon={<CloudRain className="h-4 w-4" />}
        />
        <WeatherCard
          title="Pressure"
          value={`${pressure} hPa`}
          icon={<ArrowUpRight className="h-4 w-4" />}
        />
        <WeatherCard
          title="Sunrise"
          value={sunriseTime}
          icon={<Sun className="h-4 w-4" />}
        />
        <WeatherCard
          title="Sunset"
          value={sunsetTime}
          icon={<ThermometerSun className="h-4 w-4" />}
        />
        <WeatherCard
          title="Weather Condition"
          value={weatherCondition}
          icon={getWeatherIcon(weatherCondition)}
        />
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Temperature</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <WeatherChart
              data={hourlyTemperature}
              type="temperature"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Humidity</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <WeatherChart
              data={hourlyHumidity}
              type="humidity"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wind Speed</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <WeatherChart
              data={hourlyWind}
              type="wind"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
          <CardTitle>Rain Fall</CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherChart 
            data={rainfallData} type="rainfall" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
          <CardTitle>Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherChart 
            data={pressureData} type="pressure" />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function WeatherCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function WeatherSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[300px] w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[80px]" />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
