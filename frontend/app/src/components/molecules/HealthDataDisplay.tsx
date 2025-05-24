import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HealthDataGraph from './HealthDataGraph';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface HealthData {
  date: string;
  value: number;
}

const HealthDataDisplay: React.FC = () => {
  const [weightData, setWeightData] = useState<HealthData[]>([]);
  const [calorieData, setCalorieData] = useState<HealthData[]>([]);
  const [sleepData, setSleepData] = useState<HealthData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [weightResponse, calorieResponse, sleepResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/weight-records/', { withCredentials: true }),
        axios.get('http://localhost:8000/api/calorie-records/', { withCredentials: true }),
        axios.get('http://localhost:8000/api/sleep-records/', { withCredentials: true })
      ]);

      // 体重データの変換
      const weightRecords = weightResponse.data.map((record: any) => ({
        date: record.recorded_at,
        value: record.weight
      }));

      // カロリーデータの変換
      const calorieRecords = calorieResponse.data.map((record: any) => ({
        date: record.recorded_at,
        value: record.calorie
      }));

      // 睡眠データの変換
      const sleepRecords = sleepResponse.data.map((record: any) => ({
        date: record.recorded_at,
        value: record.sleep_time
      }));

      setWeightData(weightRecords);
      setCalorieData(calorieRecords);
      setSleepData(sleepRecords);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>データを読み込み中...</div>;
  }

  return (
    <Container>
      <HealthDataGraph
        type="weight"
        data={weightData}
        title="体重"
        unit="kg"
      />
      <HealthDataGraph
        type="calorie"
        data={calorieData}
        title="カロリー"
        unit="kcal"
      />
      <HealthDataGraph
        type="sleep"
        data={sleepData}
        title="睡眠時間"
        unit="時間"
      />
    </Container>
  );
};

export default HealthDataDisplay;

