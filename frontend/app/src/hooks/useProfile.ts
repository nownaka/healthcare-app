import { useState, useEffect } from 'react';
import axios from 'axios';

interface Profile {
  name: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
}

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Profile>(
        'http://localhost:8000/api/profile/',
        { withCredentials: true }
      );
      setProfile(response.data);
      setError(null);
    } catch (error: any) {
      console.error('Profile fetch error:', error.response?.data || error.message);
      setError('プロフィールの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      setLoading(true);
      const response = await axios.patch<Profile>(
        'http://localhost:8000/api/profile/',
        data,
        { withCredentials: true }
      );
      setProfile(response.data);
      setError(null);
    } catch (error: any) {
      console.error('Profile update error:', error.response?.data || error.message);
      setError('プロフィールの更新に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    updateProfile,
    fetchProfile,
  };
};
