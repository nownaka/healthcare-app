// グラフ表示のコンポーネント
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

// Chart.jsの設定
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  padding: 20px;
`;

const GraphCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  width: 600px;
  box-sizing: border-box;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Button = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: ${props => props.active ? '#0056b3' : '#e9ecef'};
  }
`;

interface DataPoint {
  date: string;
  value: number;
}

interface HealthDataGraphProps {
  weightData: DataPoint[];
  calorieData: DataPoint[];
  exerciseData: DataPoint[];
  sleepData: DataPoint[];
}

const HealthDataGraph: React.FC<HealthDataGraphProps> = ({ 
  weightData,
  calorieData,
  exerciseData,
  sleepData
}) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [weightChartData, setWeightChartData] = useState<any>(null);
  const [calorieChartData, setCalorieChartData] = useState<any>(null);
  const [exerciseChartData, setExerciseChartData] = useState<any>(null);
  const [sleepChartData, setSleepChartData] = useState<any>(null);

  useEffect(() => {
    if (weightData) {
      const processed = processData(weightData, '体重', '#007bff');
      setWeightChartData(processed);
    }
    if (calorieData) {
      const processed = processData(calorieData, 'カロリー', '#28a745');
      setCalorieChartData(processed);
    }
    if (exerciseData) {
      const processed = processData(exerciseData, '運動量', '#dc3545');
      setExerciseChartData(processed);
    }
    if (sleepData) {
      const processed = processData(sleepData, '睡眠時間', '#17a2b8');
      setSleepChartData(processed);
    }
  }, [weightData, calorieData, exerciseData, sleepData, viewMode]);

  const getOptions = (title: string, unit: string): any => ({
    responsive: true,
    maintainAspectRatio: 2,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false, // （青枠）を消す
      },
      title: {
        display: false,
        text: `${title} (${unit})`
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: false,
        ticks: {
          callback: function(value: number) {
            return `${value}${unit}`;
          }
        }
      }
    }
  });

  const processData = (rawData: DataPoint[], label: string, color: string = '#007bff') => {
    const now = dayjs();
    let startDate: dayjs.Dayjs;
    let dateFormat: string;

    if (viewMode === 'week') {
      startDate = now.subtract(7, 'day');
      dateFormat = 'M/D';
    } else {
      startDate = now.subtract(30, 'day');
      dateFormat = 'M/D';
    }

    const filteredData = rawData.filter(item => 
      dayjs(item.date).isAfter(startDate) || dayjs(item.date).isSame(startDate)
    );

    const sortedData = filteredData.sort((a, b) => 
      dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    );

    return {
      labels: sortedData.map(item => dayjs(item.date).format(dateFormat)),
      datasets: [
        {
          label: label,
          data: sortedData.map(item => item.value),
          borderColor: color,
          backgroundColor: `${color}1a`,
          tension: 0.1
        }
      ]
    };
  };

  return (
    <>
      <ControlContainer>
        <div>
          <Button
            active={viewMode === 'week'}
            onClick={() => setViewMode('week')}
          >
            週間
          </Button>
          <Button
            active={viewMode === 'month'}
            onClick={() => setViewMode('month')}
          >
            月間
          </Button>
        </div>
      </ControlContainer>
      <GraphContainer>
        <GraphCard>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src="/icons/体重.png" alt="体重アイコン" width={50} height={50} style={{ marginRight: 8 }} />
          <h1 style={{ margin: 0 }}>体重</h1>
        </div>
        {weightChartData && <Line options={getOptions('体重', 'kg')} data={weightChartData} />} 
        </GraphCard>
        <GraphCard>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src="/icons/運動.png" alt="運動アイコン" width={50} height={50} style={{ marginRight: 8 }} />
          <h1 style={{ margin: 0 }}>運動量</h1>
        </div>
        {exerciseChartData && <Line options={getOptions('運動量', 'kcal')} data={exerciseChartData} />}
        </GraphCard>
        <GraphCard>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src="/icons/カロリー.png" alt="カロリーアイコン" width={50} height={50} style={{ marginRight: 8 }} />
          <h1 style={{ margin: 0 }}>カロリー</h1>
        </div>
        {calorieChartData && <Line options={getOptions('カロリー', 'kcal')} data={calorieChartData} />}
        </GraphCard>
        <GraphCard>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src="/icons/睡眠.png" alt="睡眠アイコン" width={50} height={50} style={{ marginRight: 8 }} />
          <h1 style={{ margin: 0 }}>睡眠時間</h1>
        </div>
        {sleepChartData && <Line options={getOptions('睡眠時間', '時間')} data={sleepChartData} />}
        </GraphCard>
      </GraphContainer>
    </>
  );
};

export default HealthDataGraph;
