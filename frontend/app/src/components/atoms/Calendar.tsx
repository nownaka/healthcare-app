import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// `Value` の型を `react-calendar` の型に統一
type Value = CalendarProps["value"];

const CustomCalendar: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());

  // `handleDateChange` の型を `CalendarProps["onChange"]` に修正
  const handleDateChange: CalendarProps["onChange"] = (value, _event) => {
    setDate(value as Value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* `onChange` の型エラーを回避 */}
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default CustomCalendar;
