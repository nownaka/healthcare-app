import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// APIクライアントの設定
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 体重記録の型定義
export interface WeightRecord {
  id: number;
  user: number;
  weight: number;
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

// カロリー記録の型定義
export interface CalorieRecord {
  id: number;
  user: number;
  calorie: number;
  category: string;
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

// 睡眠記録の型定義
export interface SleepRecord {
  id: number;
  user: number;
  sleep_time: number;
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

// 統合された日別データの型定義
export interface DailyHealthData {
  date: string;
  weight?: number;
  calories?: number;
  sleep?: number;
  exercise?: number;
}

// 体重記録を取得
export const getWeightRecords = async (): Promise<WeightRecord[]> => {
  try {
    const response = await apiClient.get('/weight-records/');
    return response.data;
  } catch (error) {
    console.error('体重記録の取得に失敗しました:', error);
    throw error;
  }
};

// カロリー記録を取得
export const getCalorieRecords = async (): Promise<CalorieRecord[]> => {
  try {
    const response = await apiClient.get('/calorie-records/');
    return response.data;
  } catch (error) {
    console.error('カロリー記録の取得に失敗しました:', error);
    throw error;
  }
};

// 睡眠記録を取得
export const getSleepRecords = async (): Promise<SleepRecord[]> => {
  try {
    const response = await apiClient.get('/sleep-records/');
    return response.data;
  } catch (error) {
    console.error('睡眠記録の取得に失敗しました:', error);
    throw error;
  }
};

// 全ての健康記録を取得して日別にまとめる
export const getAllHealthRecords = async (): Promise<Record<string, DailyHealthData>> => {
  try {
    const [weightRecords, calorieRecords, sleepRecords] = await Promise.all([
      getWeightRecords(),
      getCalorieRecords(),
      getSleepRecords(),
    ]);

    const dailyData: Record<string, DailyHealthData> = {};

    // 体重記録を処理
    weightRecords.forEach((record) => {
      const date = record.recorded_at;
      if (!dailyData[date]) {
        dailyData[date] = { date };
      }
      dailyData[date].weight = record.weight;
    });

    // カロリー記録を処理（正のカロリーと負のカロリー（運動）を分けて処理）
    calorieRecords.forEach((record) => {
      const date = record.recorded_at;
      if (!dailyData[date]) {
        dailyData[date] = { date };
      }
      
      if (record.calorie > 0) {
        // 正のカロリー（摂取カロリー）
        dailyData[date].calories = (dailyData[date].calories || 0) + record.calorie;
      } else if (record.calorie < 0) {
        // 負のカロリー（運動による消費カロリー）
        dailyData[date].exercise = (dailyData[date].exercise || 0) + Math.abs(record.calorie);
      }
    });

    // 睡眠記録を処理
    sleepRecords.forEach((record) => {
      const date = record.recorded_at;
      if (!dailyData[date]) {
        dailyData[date] = { date };
      }
      dailyData[date].sleep = record.sleep_time;
    });

    return dailyData;
  } catch (error) {
    console.error('健康記録の取得に失敗しました:', error);
    throw error;
  }
};
