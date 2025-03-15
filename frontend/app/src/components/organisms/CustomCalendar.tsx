import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

// `Value` の型を `react-calendar` の公式の `CalendarProps["value"]` に統一
type Value = CalendarProps["value"];

// カレンダーのスタイル
const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const CustomCalendar: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());

  // `handleDateChange` の型を修正し、イベント引数 `_event` を無視
  const handleDateChange: CalendarProps["onChange"] = (value, _event) => {
    setDate(value as Value);
  };

  return <StyledCalendar onChange={handleDateChange} value={date} />;
};

export default CustomCalendar;
