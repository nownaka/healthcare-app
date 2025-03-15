import React, { useState } from 'react';
import axios from 'axios';

const SleepRecord: React.FC = () => {
  const [sleepTime, setSleepTime] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/sleep-records/',
        {
          user: 1,  // user ID を固定値 1 に設定
          sleep_time: sleepTime,
          recorded_at: new Date().toISOString().split('T')[0],
        },
        {
          withCredentials: true, // Cookie を送信するために必要
        }
      );
      alert('Sleep time recorded!');
    } catch (error) {
      console.error('Error recording sleep time:', error);
    }
  };

  return (
    <div>
      <h2>Sleep Record</h2>
      <input type="number" value={sleepTime} onChange={(e) => setSleepTime(Number(e.target.value))} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SleepRecord;
