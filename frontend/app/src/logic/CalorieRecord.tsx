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
      alert('Calorie recorded!aaaaaaaaaaaaaaaaa');
    } catch (error) {
      console.error('Error recording calorie:', error);
    }
  };

  return (
    <div>
      <h2>カロリー登録</h2>
      <input type="number" value={calorie} onChange={(e) => setCalorie(Number(e.target.value))} />
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default CalorieRecord;
