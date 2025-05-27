// グラフを呼び出して情報を渡すコンポーネント
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HealthDataGraph from '../components/molecules/HealthDataGraph';

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

interface HealthData {
  date: string;
  value: number;
}

const HealthDataDisplay: React.FC = () => {
  const [weightData, setWeightData] = useState<HealthData[]>([]);
  const [calorieData, setCalorieData] = useState<HealthData[]>([]);
  const [exerciseData, setExerciseData] = useState<HealthData[]>([]);
  const [sleepData, setSleepData] = useState<HealthData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("user_id");
  
      const [weightResponse, calorieResponse, sleepResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/weight-records/?user=${userId}`, { withCredentials: true }),
        axios.get(`http://localhost:8000/api/calorie-records/?user=${userId}`, { withCredentials: true }),
        axios.get(`http://localhost:8000/api/sleep-records/?user=${userId}`, { withCredentials: true })
      ]);

      // 運動量データはカロリーデータと同じものを使用
      const exerciseResponse = calorieResponse;

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

      // 運動量データの変換（カロリーデータと同じ）
      const exerciseRecords = exerciseResponse.data.map((record: any) => ({
        date: record.recorded_at,
        value: record.calorie
      }));

      setWeightData(weightRecords);
      setCalorieData(calorieRecords);
      setExerciseData(exerciseRecords);
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
      <HealthDataGraph
        weightData={weightData}
        calorieData={calorieData}
        exerciseData={exerciseData}
        sleepData={sleepData}
      />
  );
};

export default HealthDataDisplay;
