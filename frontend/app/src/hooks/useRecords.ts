import { useState } from 'react';
import axios from 'axios';

interface CalorieRecord {
  date: string;
  calories: number;
  meal_type: string;
  description: string;
}

interface SleepRecord {
  date: string;
  duration: number;
  quality: number;
  notes: string;
}

interface UseRecordsReturn {
  addCalorieRecord: (record: Omit<CalorieRecord, 'date'>) => Promise<void>;
  addSleepRecord: (record: Omit<SleepRecord, 'date'>) => Promise<void>;
  getCalorieRecords: (startDate: string, endDate: string) => Promise<CalorieRecord[]>;
  getSleepRecords: (startDate: string, endDate: string) => Promise<SleepRecord[]>;
  loading: boolean;
  error: string | null;
}

export const useRecords = (): UseRecordsReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addCalorieRecord = async (record: Omit<CalorieRecord, 'date'>) => {
    try {
      setLoading(true);
      await axios.post(
        'http://localhost:8000/api/records/calorie/',
        {
          ...record,
          date: new Date().toISOString().split('T')[0],
        },
        { withCredentials: true }
      );
      setError(null);
    } catch (error: any) {
      console.error('Calorie record error:', error.response?.data || error.message);
      setError('カロリー記録の追加に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const addSleepRecord = async (record: Omit<SleepRecord, 'date'>) => {
    try {
      setLoading(true);
      await axios.post(
        'http://localhost:8000/api/records/sleep/',
        {
          ...record,
          date: new Date().toISOString().split('T')[0],
        },
        { withCredentials: true }
      );
      setError(null);
    } catch (error: any) {
      console.error('Sleep record error:', error.response?.data || error.message);
      setError('睡眠記録の追加に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const getCalorieRecords = async (startDate: string, endDate: string): Promise<CalorieRecord[]> => {
    try {
      setLoading(true);
      const response = await axios.get<CalorieRecord[]>(
        `http://localhost:8000/api/records/calorie/?start_date=${startDate}&end_date=${endDate}`,
        { withCredentials: true }
      );
      setError(null);
      return response.data;
    } catch (error: any) {
      console.error('Calorie records fetch error:', error.response?.data || error.message);
      setError('カロリー記録の取得に失敗しました。');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSleepRecords = async (startDate: string, endDate: string): Promise<SleepRecord[]> => {
    try {
      setLoading(true);
      const response = await axios.get<SleepRecord[]>(
        `http://localhost:8000/api/records/sleep/?start_date=${startDate}&end_date=${endDate}`,
        { withCredentials: true }
      );
      setError(null);
      return response.data;
    } catch (error: any) {
      console.error('Sleep records fetch error:', error.response?.data || error.message);
      setError('睡眠記録の取得に失敗しました。');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    addCalorieRecord,
    addSleepRecord,
    getCalorieRecords,
    getSleepRecords,
    loading,
    error,
  };
};
