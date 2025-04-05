import React, { useState } from "react";
import Calendar, { CalendarProps, CalendarType } from "react-calendar"; // ← CalendarType を追加
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

type Value = CalendarProps["value"];

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const CustomCalendar: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());

  const handleDateChange: CalendarProps["onChange"] = (value, _event) => {
    setDate(value as Value);
  };

  const calendarType: CalendarProps["calendarType"] = "gregory";

  return (
    <StyledCalendar
      onChange={handleDateChange}
      value={date}
      calendarType="gregory"
    />
  );
};

export default CustomCalendar;
