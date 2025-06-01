import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar, { CalendarProps, CalendarType } from "react-calendar"; // ← CalendarType を追加
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import CharacterDisplay from "./CharacterDisplay";
import {
  evaluateWeightChange,
  evaluateSleepTime,
  getOverallEvaluation,
  HealthEvaluation,
} from "../../logic/HealthDataEvaluator";

// type Value = CalendarProps["value"];
type Value = CalendarProps["value"];

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  position: relative;
`;

// モーダルのオーバーレイ（背景）
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// モーダルの内容領域
const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// 各日付に対する入力値の型
type Entry = {
  weight: number;
  sleep: number;
};

const CustomCalendar: React.FC = () => {
  // カレンダーに表示する日付（選択状態など）
  const [date, setDate] = useState<Value>(new Date());
  // モーダルの表示・非表示の管理
  const [showModal, setShowModal] = useState<boolean>(false);
  // クリックされた日付を保存
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // モーダル内の入力値（体重と睡眠時間）
  const [weight, setWeight] = useState<string>("");
  const [sleepTime, setSleepTime] = useState<string>("");

  // 各日付に入力された値を記録する（キーは ISO 形式の日付文字列）
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  
  // キャラクター表示の状態管理
  const [showCharacter, setShowCharacter] = useState<boolean>(false);
  const [characterData, setCharacterData] = useState<HealthEvaluation | null>(null);

  // 既存データを取得
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/daily-records/", {
          withCredentials: true,
        });
        
        const existingEntries: Record<string, Entry> = {};
        response.data.forEach((record: any) => {
          const dateKey = record.recorded_at;
          existingEntries[dateKey] = {
            weight: record.weight,
            sleep: record.sleep_time,
          };
        });
        
        setEntries(existingEntries);
      } catch (err: any) {
        console.error("既存データの取得に失敗しました:", err.response?.data || err.message);
      }
    };

    fetchExistingData();
  }, []);

  // 前日の体重を取得する関数
  const getPreviousWeight = (currentDateKey: string): number | null => {
    const currentDate = new Date(currentDateKey);
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    const previousDateKey = previousDate.toISOString().split("T")[0];
    
    const previousEntry = entries[previousDateKey];
    return previousEntry ? previousEntry.weight : null;
  };

  // 日付をクリックしたときの処理
  const handleDateChange: CalendarProps["onChange"] = (value, _event) => {
    // react-calendar では Date または Date[] が返るので、ここでは Date として扱う
    const newDate = value as Date;
    setDate(newDate);
    setSelectedDate(newDate);
    setShowModal(true);
  };

  // モーダル内の入力を保存する処理
  const handleSave = async () => {
    if (!selectedDate || weight === "" || sleepTime === "") {
      alert("体重と睡眠時間の両方を入力してください。");
      return;
    }

    const dateKey = selectedDate.toISOString().split("T")[0]; // "2025-04-14" など
    const record = {
      recorded_at: dateKey,
      weight:    Number(weight),
      sleep_time: Number(sleepTime),
    };

    try {
      // 1) ローカル state を更新
      setEntries((prev) => ({
        ...prev,
        [dateKey]: {
          weight: record.weight,
          sleep:  record.sleep_time,
        },
      }));
      // 2) バックエンドに upsert リクエスト
      await axios.post(
        "http://localhost:8000/api/daily-records/",
        record,
        { withCredentials: true }
      );

      // 3) 健康データの評価を実行（更新されたentriesを使用）
      const updatedEntries = {
        ...entries,
        [dateKey]: {
          weight: record.weight,
          sleep: record.sleep_time,
        },
      };
      
      const currentDate = new Date(dateKey);
      const previousDate = new Date(currentDate);
      previousDate.setDate(previousDate.getDate() - 1);
      const previousDateKey = previousDate.toISOString().split("T")[0];
      const previousWeight = updatedEntries[previousDateKey]?.weight || null;
      
      const weightEval = evaluateWeightChange(record.weight, previousWeight);
      const sleepEval = evaluateSleepTime(record.sleep_time);
      
      // 総合評価を取得（カロリーデータは現在未実装のためnull）
      const overallEval = getOverallEvaluation(weightEval, null, sleepEval);
      
      // 4) キャラクター表示を設定
      setCharacterData(overallEval);
      setShowCharacter(true);
  
      // 5) フィールドをクリアしてモーダルを閉じる
      setWeight("");
      setSleepTime("");
      setShowModal(false);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("保存に失敗しました。もう一度お試しください。");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setWeight("");
    setSleepTime("");
  };

  return (
    <div>
      <StyledCalendar
        onChange={handleDateChange}
        value={date}
        // カレンダーの各セルに、保存された入力値を表示（オプション）
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateKey = date.toISOString().split("T")[0];
            const entry = entries[dateKey];
            if (entry !== undefined) {
              return (
                <div style={{ marginTop: "0.1rem", fontSize: "0.6em",  }}>
                  <div>体重: {entry.weight} kg</div>
                  <div>睡眠: {entry.sleep} 時間</div>
                </div>
              );
            }
          }
          return null;
        }}
      />

      {/* モーダルの表示 */}
      {showModal && selectedDate && (
        <ModalOverlay>
          <ModalContent>
            <h2>{selectedDate.toLocaleDateString()}</h2>
            <div style={{ marginBottom: "10px" }}>
              <label>
                体重 (kg):{" "}
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                睡眠時間 (時間):{" "}
                <input
                  type="number"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                />
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleSave}>保存</button>
              <button onClick={handleCancel}>キャンセル</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* キャラクター表示 */}
      {showCharacter && characterData && (
        <CharacterDisplay
          message={characterData.message}
          imagePath={characterData.imagePath}
          audioPath={characterData.audioPath}
          onClose={() => setShowCharacter(false)}
        />
      )}
    </div>
  );
};

export default CustomCalendar;
