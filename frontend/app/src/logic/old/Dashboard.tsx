import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard: React.FC = () => {
  const [calories, setCalories] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [sleepHours, setSleepHours] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // JWTトークンをヘッダーに含めず、Cookie から送信
        const calorieResponse = await axios.get('http://localhost:8000/api/calorie-records/', {
          withCredentials: true, // Cookie を送信
        });
        setCalories(calorieResponse.data.map((record: any) => record.calorie));
        setDates(calorieResponse.data.map((record: any) => record.recorded_at));

        const sleepResponse = await axios.get('http://localhost:8000/api/sleep-records/', {
          withCredentials: true, // Cookie を送信
        });
        setSleepHours(sleepResponse.data.map((record: any) => record.sleep_time));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Calories',
        data: calories,
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Sleep Hours',
        data: sleepHours,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;
