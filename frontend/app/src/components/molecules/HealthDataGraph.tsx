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
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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
  type: 'weight' | 'calorie' | 'sleep';
  data: DataPoint[];
  title: string;
  unit: string;
}

const HealthDataGraph: React.FC<HealthDataGraphProps> = ({ type, data, title, unit }) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [chartData, setChartData] = useState<any>(null);

  const processData = (rawData: DataPoint[]) => {
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
          label: title,
          data: sortedData.map(item => item.value),
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          tension: 0.1
        }
      ]
    };
  };

  useEffect(() => {
    if (data) {
      const processed = processData(data);
      setChartData(processed);
    }
  }, [data, viewMode]);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
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
  };

  return (
    <GraphContainer>
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
      {chartData && <Line options={options} data={chartData} />}
    </GraphContainer>
  );
};

export default HealthDataGraph;
