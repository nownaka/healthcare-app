import { useState, useEffect } from 'react';
import { useRecords } from './useRecords';

interface GraphData {
  labels: string[];
  values: number[];
}

interface UseGraphDataReturn {
  calorieGraphData: GraphData | null;
  sleepGraphData: GraphData | null;
  loading: boolean;
  error: string | null;
  fetchGraphData: (days: number) => Promise<void>;
}

export const useGraphData = (): UseGraphDataReturn => {
  const [calorieGraphData, setCalorieGraphData] = useState<GraphData | null>(null);
  const [sleepGraphData, setSleepGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getCalorieRecords, getSleepRecords } = useRecords();

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
  };

  const getDateRange = (days: number): [string, string] => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    
    return [
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0]
    ];
  };

  const fetchGraphData = async (days: number = 7) => {
    try {
      setLoading(true);
      const [startDate, endDate] = getDateRange(days);

      // カロリーデータの取得と処理
      const calorieRecords = await getCalorieRecords(startDate, endDate);
      const calorieData = processCalorieData(calorieRecords, days);
      setCalorieGraphData(calorieData);

      // 睡眠データの取得と処理
      const sleepRecords = await getSleepRecords(startDate, endDate);
      console.log('Sleep Records:', sleepRecords);
      const sleepData = processSleepData(sleepRecords, days);
      console.log('Processed Sleep Data:', sleepData);
      setSleepGraphData(sleepData);

      setError(null);
    } catch (error: any) {
      console.error('Graph data fetch error:', error);
      setError('グラフデータの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const processCalorieData = (records: any[], days: number): GraphData => {
    const labels: string[] = [];
    const values: number[] = [];
    const today = new Date();

    // 過去days日分のデータを初期化
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      labels.push(formatDate(date));
      values.push(0);
    }

    // 記録データを集計
    records.forEach(record => {
      const recordDate = new Date(record.date);
      const index = days - 1 - Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
      if (index >= 0 && index < days) {
        values[index] += record.calories;
      }
    });

    return { labels, values };
  };

  const processSleepData = (records: any[], days: number): GraphData => {
    const labels: string[] = [];
    const values: number[] = [];
    const today = new Date();

    // 過去days日分のデータを初期化
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      labels.push(formatDate(date));
      values.push(0);
    }

    // 記録データを集計
    records.forEach(record => {
      const recordDate = new Date(record.date);
      const index = days - 1 - Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
      if (index >= 0 && index < days) {
        values[index] = record.sleep_time / 60; // 分から時間に変換
      }
    });

    return { labels, values };
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  return {
    calorieGraphData,
    sleepGraphData,
    loading,
    error,
    fetchGraphData,
  };
};
