import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileForm, { ProfileData } from '../viewpage/ProfileForm';

const ProfileContainer: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    email: '',
    name: '',
    nickname: '',
    goal: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // プロフィール情報の取得
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ここは実際のユーザーIDに合わせる必要があります
        const response = await axios.get<ProfileData>('http://localhost:8000/api/user-profiles/1/', {
          withCredentials: true,
        });
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 入力変更のハンドリング
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // プロフィール更新処理
  const handleSubmit = async () => {
    try {
      // PUT リクエストでプロフィール情報を更新
      await axios.put(
        'http://localhost:8000/api/user-profiles/1/', // 適宜ユーザーIDを変更
        profile,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      alert('Profile updated successfully!');
      navigate('/success');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Profile update failed.');
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <ProfileForm
      profile={profile}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error || undefined}
    />
  );
};

export default ProfileContainer;