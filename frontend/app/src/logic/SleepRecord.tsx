import React, { useState } from 'react';
import axios from 'axios';

const SleepRecord: React.FC = () => {
  const [sleepTime, setSleepTime] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/sleep-records/',
        {
          user: 1,
          sleep_time: sleepTime,
          recorded_at: new Date().toISOString().split('T')[0],
        },
        { withCredentials: true }
      );
      alert('登録成功!');
      setSleepTime(0); // ← 入力欄を初期化！
    } catch (error) {
      console.error('なんかエラーコンソールかバックエンドのログミロ:', error);
    }
  };

  return (
  <div style={styles.wrapper}>
    <h2 style={{ marginRight: "1px" }}>睡眠時間</h2>
    <select
      value={sleepTime}
      onChange={(e) => setSleepTime(Number(e.target.value))}
      style={styles.select}
    >
      <option value={0} disabled>時間を選択</option>
      {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => (
        <option key={hour} value={hour}>
          {hour} 時間
        </option>
      ))}
    </select>
    <button style={styles.button} onClick={handleSubmit}>登録</button>
  </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#f4f4ff", 
    padding: "20px",
    borderRadius: "15px",
    margin: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    fontSize: '18px',
    padding: '10px',
    width: '200px',
    borderRadius: '25px',
    border: '1px solid #ccc',
  },
  select: {
    fontSize: '18px',
    padding: '10px',
    width: '200px',
    borderRadius: '25px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};


export default SleepRecord;
