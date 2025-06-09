import React, { useState } from 'react';
import axios from 'axios';

const CalorieRecord: React.FC = () => {
  const [calorie, setCalorie] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/calorie-records/',
        {  user: 1,  // user ID を固定値 1 に設定
          calorie,
         recorded_at: new Date().toISOString().split('T')[0] },
        {withCredentials: true,} // Cookie を送信するために必要
      );
      alert('登録成功');
      setCalorie(0); // ← 入力欄を初期化！
    } catch (error) {
      console.error('なんかエラーコンソールかバックエンドのログミロ', error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>カロリー</h2>
      <input type="number" value={calorie} onChange={(e) => setCalorie(Number(e.target.value))}
      style={styles.select} />
      <button style={styles.button} onClick={handleSubmit}>登録</button>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#f0f8ff", 
    padding: "20px",
    borderRadius: "15px",
    margin: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  select: {
    fontSize: '18px',
    padding: '10px',
    width: '180px',
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


export default CalorieRecord;