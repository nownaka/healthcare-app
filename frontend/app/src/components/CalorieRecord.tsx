import React, { useState } from 'react';
import axios from 'axios';

const CalorieRecord: React.FC = () => {
  const [calorie, setCalorie] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        'http://localhost:8000/api/calorie-records/',
        {  user: 1,  // user ID を固定値 1 に設定
          calorie,
         recorded_at: new Date().toISOString().split('T')[0] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Calorie recorded!');
    } catch (error) {
      console.error('Error recording calorie:', error);
    }
  };

  return (
    <div>
      <h2>Calorie Intake</h2>
      <input type="number" value={calorie} onChange={(e) => setCalorie(Number(e.target.value))} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CalorieRecord;
