import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import CharacterDisplay from "../molecules/CharacterDisplay";
import RecordModal from "./Modal";
import {
  evaluateWeightChange,
  evaluateSleepTime,
  getOverallEvaluation,
  HealthEvaluation,
} from "../../logic/HealthDataEvaluator";
import { getAllHealthRecords, DailyHealthData } from "../../logic/healthRecordsApi";

type Value = CalendarProps["value"];

type Entry = {
  weight?: number;
  sleep?: number;
  calories?: number;
  exercise?: number;
};

type CustomCalendarProps = {
  onDateClick?: (date: Date) => void;
  onCharacterTrigger: (data: HealthEvaluation) => void;
};

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateClick, onCharacterTrigger }) => {
  const [date, setDate] = useState<Value>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [sleepTime, setSleepTime] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");
  const [entries, setEntries] = useState<Record<string, Entry>>({});

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const healthRecords = await getAllHealthRecords();
        
        const existingEntries: Record<string, Entry> = {};
        Object.keys(healthRecords).forEach((dateKey) => {
          const record = healthRecords[dateKey];
          existingEntries[dateKey] = {
            weight: record.weight,
            sleep: record.sleep,
            calories: record.calories,
            exercise: record.exercise,
          };
        });

        setEntries(existingEntries);
      } catch (err: any) {
        console.error(
          "既存データの取得に失敗しました:",
          err.response?.data || err.message
        );
      }
    };

    fetchExistingData();
  }, []);


  const handleDateChange: CalendarProps["onChange"] = (value, _event) => {
    const newDate = value as Date;
    
    setDate(newDate);
    setSelectedDate(newDate);
    setShowModal(true);
    if (onDateClick) onDateClick(newDate);
  };

  const handleSave = async () => {
    if (!selectedDate || weight === "" || sleepTime === "") {
      alert("体重と睡眠時間の両方を入力してください。");
      return;
    }

    const dateKey = selectedDate.toISOString().split("T")[0];
    const record = {
      recorded_at: dateKey,
      weight: Number(weight),
      sleep_time: Number(sleepTime),
      calories: Number(calories),
      exercise: Number(exercise),
    };

    try {
      // 先にローカル状態を更新
      const newEntry = {
        weight: record.weight,
        sleep: record.sleep_time,
        calories: record.calories,
        exercise: record.exercise,
      };

      setEntries((prev) => ({
        ...prev,
        [dateKey]: newEntry,
      }));

      // バックエンドに保存
      await axios.post("http://localhost:8000/api/daily-records/", record, {
        withCredentials: true,
      });

      // データを再取得してカレンダーを更新
      const healthRecords = await getAllHealthRecords();
      const existingEntries: Record<string, Entry> = {};
      Object.keys(healthRecords).forEach((dateKey) => {
        const record = healthRecords[dateKey];
        existingEntries[dateKey] = {
          weight: record.weight,
          sleep: record.sleep,
          calories: record.calories,
          exercise: record.exercise,
        };
      });
      setEntries(existingEntries);

      const updatedEntries = existingEntries;

      const currentDate = new Date(dateKey);
      const previousDate = new Date(currentDate);
      previousDate.setDate(previousDate.getDate() - 1);
      const previousDateKey = previousDate.toISOString().split("T")[0];
      const previousWeight = updatedEntries[previousDateKey]?.weight || null;

      const weightEval = evaluateWeightChange(record.weight, previousWeight);
      const sleepEval = evaluateSleepTime(record.sleep_time);
      const overallEval = getOverallEvaluation(weightEval, null, sleepEval);

      // ✅ キャラクター再生トリガーを呼び出す
      onCharacterTrigger(overallEval);
      setWeight("");
      setSleepTime("");
      setCalories("");
      setExercise("");
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
    setCalories("");
    setExercise("");
  };

  return (
    <>
    <div>
      <StyledCalendar
        onChange={handleDateChange}
        value={date}
        calendarType="gregory"
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateKey = date.toISOString().split("T")[0];
            const entry = entries[dateKey];
            if (entry && (entry.weight || entry.sleep || entry.calories || entry.exercise)) {
              return (
                <div style={{ marginTop: "0.1rem", fontSize: "0.6em", lineHeight: "1.1" }}>
                  {entry.weight && <div>体重: {entry.weight}kg</div>}
                  {entry.sleep && <div>睡眠: {entry.sleep}h</div>}
                  {entry.calories && <div>カロリー: {entry.calories}</div>}
                  {entry.exercise && <div>運動: {entry.exercise}</div>}
                </div>
              );
            }
          }
          return null;
        }}
      />

      {/* モーダル表示を RecordModal に一任 */}
      {showModal && selectedDate && (
        <RecordModal
          dateLabel={selectedDate.toLocaleDateString()}
          weight={weight}
          sleep={sleepTime}
          calories={calories}
          exercise={exercise}
          setWeight={setWeight}
          setSleep={setSleepTime}
          setCalories={setCalories}
          setExercise={setExercise}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      
    </div>

    </>
  );
};

export default CustomCalendar;

