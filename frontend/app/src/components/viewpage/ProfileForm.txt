import React from 'react';

export type ProfileData = {
  email: string;
  name: string;
  nickname: string;
  goal: string;
};

type ProfileFormProps = {
  profile: ProfileData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  error?: string;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onChange,
  onSubmit,
  error,
}) => {
  return (
    <div>
      <h2>Update Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email (read-only):</label>
        <input type="email" name="email" value={profile.email} readOnly />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={profile.name} onChange={onChange} />
      </div>
      <div>
        <label>Nickname:</label>
        <input type="text" name="nickname" value={profile.nickname} onChange={onChange} />
      </div>
      <div>
        <label>Goal:</label>
        <textarea name="goal" value={profile.goal} onChange={onChange} />
      </div>
      <button onClick={onSubmit}>Update Profile</button>
    </div>
  );
};

export default ProfileForm;