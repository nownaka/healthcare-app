import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import CharacterDisplay from "./CharacterDisplay";
import RecordModal from "./Modal";
import {
  evaluateWeightChange,
  evaluateSleepTime,
  getOverallEvaluation,
  HealthEvaluation,
} from "../../logic/HealthDataEvaluator";

type Value = CalendarProps["value"];

type Entry = {
  weight: number;
  sleep: number;
};

type CustomCalendarProps = {
  onDateClick?: (date: Date) => void;
};

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateClick }) => {
  const [date, setDate] = useState<Value>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [sleepTime, setSleepTime] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  const [showCharacter, setShowCharacter] = useState<boolean>(false);
  const [characterData, setCharacterData] = useState<HealthEvaluation | null>(
    null
  );

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/daily-records/",
          {
            withCredentials: true,
          }
        );

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
        console.error(
          "既存データの取得に失敗しました:",
          err.response?.data || err.message
        );
      }
    };

    fetchExistingData();
  }, []);

  const getPreviousWeight = (currentDateKey: string): number | null => {
    const currentDate = new Date(currentDateKey);
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    const previousDateKey = previousDate.toISOString().split("T")[0];
    const previousEntry = entries[previousDateKey];
    return previousEntry ? previousEntry.weight : null;
  };

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
    };

    try {
      setEntries((prev) => ({
        ...prev,
        [dateKey]: {
          weight: record.weight,
          sleep: record.sleep_time,
        },
      }));

      await axios.post("http://localhost:8000/api/daily-records/", record, {
        withCredentials: true,
      });

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
      const overallEval = getOverallEvaluation(weightEval, null, sleepEval);

      setCharacterData(overallEval);
      setShowCharacter(true);
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
    <div>
      <StyledCalendar
        onChange={handleDateChange}
        value={date}
        calendarType="gregory"
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateKey = date.toISOString().split("T")[0];
            const entry = entries[dateKey];
            if (entry !== undefined) {
              return (
                <div style={{ marginTop: "0.1rem", fontSize: "0.6em" }}>
                  <div>体重: {entry.weight} kg</div>
                  <div>睡眠: {entry.sleep} 時間</div>
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
          showCharacter={showCharacter}
          characterData={characterData}
          onCharacterClose={() => setShowCharacter(false)}
        />
      )}
    </div>
  );
};

export default CustomCalendar;
