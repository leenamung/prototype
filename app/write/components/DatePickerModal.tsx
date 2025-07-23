"use client";

import React, { useState, useEffect, useMemo } from 'react';

// Helper to format date as "YYYY년 M월 D일"
// const formatDateDisplay = (date: Date): string => {
//   return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
// };

// Helper to generate calendar days
const getCalendarDays = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days: { day: number; monthOffset: 'prev' | 'current' | 'next'; fullDate: Date }[] = [];
    const firstDayIndex = date.getDay();
    const prevMonthDate = new Date(year, month, 0);
    const prevLastDay = prevMonthDate.getDate();
    const prevMonth = prevMonthDate.getMonth();
    const prevYear = prevMonthDate.getFullYear();
    for (let i = firstDayIndex; i > 0; i--) {
        const day = prevLastDay - i + 1;
        days.push({ day: day, monthOffset: 'prev', fullDate: new Date(prevYear, prevMonth, day) });
    }
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        days.push({ day: i, monthOffset: 'current', fullDate: new Date(year, month, i) });
    }
    const nextMonthDate = new Date(year, month + 1, 1);
    const nextMonth = nextMonthDate.getMonth();
    const nextYear = nextMonthDate.getFullYear();
    const totalCells = days.length > 35 ? 42 : 35;
    const nextDaysCount = totalCells - days.length;
    for (let i = 1; i <= nextDaysCount; i++) {
        days.push({ day: i, monthOffset: 'next', fullDate: new Date(nextYear, nextMonth, i) });
    }
    return days;
};


interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSelectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ isOpen, onClose, currentSelectedDate, onDateSelect }) => {
  const [displayDate, setDisplayDate] = useState(new Date(currentSelectedDate.getFullYear(), currentSelectedDate.getMonth(), 1));
  const [tempSelectedDate, setTempSelectedDate] = useState(new Date(currentSelectedDate));

  useEffect(() => {
    if (isOpen) {
      setDisplayDate(new Date(currentSelectedDate.getFullYear(), currentSelectedDate.getMonth(), 1));
      setTempSelectedDate(new Date(currentSelectedDate));
    }
  }, [isOpen, currentSelectedDate]);

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handlePrevMonth = () => setDisplayDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setDisplayDate(new Date(year, month + 1, 1));
  const handleDayClick = (date: Date) => setTempSelectedDate(date);
  const handleTodayClick = () => {
      const today = new Date();
      setDisplayDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setTempSelectedDate(today);
  };
  const handleConfirm = () => {
    onDateSelect(tempSelectedDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-modalShowUp" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="date-picker-title">
      <div className="bg-white rounded-lg p-4 w-[320px] mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          {/* 모달 제목 텍스트 색상 적용 */}
          <h3 id="date-picker-title" className="text-lg font-medium text-[var(--text-main)]">날짜 선택</h3>
          <button onClick={onClose} className="text-[var(--text-subtle)] hover:text-[var(--text-main)] p-1 rounded-full hover:bg-[var(--color-sub-light-gray)]/50" aria-label="닫기">
            <i className="ri-close-line ri-lg"></i>
          </button>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-1.5 rounded-full hover:bg-[var(--color-sub-light-gray)]/50" aria-label="이전 달">
              <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
            </button>
            {/* 현재 월/년도 텍스트 색상 적용 */}
            <span className="text-[var(--text-main)] font-medium text-sm">{`${year}년 ${month + 1}월`}</span>
            <button onClick={handleNextMonth} className="p-1.5 rounded-full hover:bg-[var(--color-sub-light-gray)]/50" aria-label="다음 달">
              <i className="ri-arrow-right-s-line ri-lg text-[var(--text-subtle)]"></i>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekDays.map((day, index) => (
              // 요일 텍스트 색상 적용
              <div key={day} className={`text-xs font-medium ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-[var(--text-subtle)]'}`}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayObj, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(dayObj.fullDate)}
                className={`w-10 h-10 rounded-full text-xs flex items-center justify-center transition-colors
                            ${dayObj.monthOffset !== 'current' ? 'text-gray-300' : 'text-[var(--text-main)] hover:bg-[var(--color-sub-beige)]'}
                            ${tempSelectedDate.toDateString() === dayObj.fullDate.toDateString() && dayObj.monthOffset === 'current' ? 'bg-[var(--color-primary)] text-white font-semibold' : ''}
                            ${new Date().toDateString() === dayObj.fullDate.toDateString() && dayObj.monthOffset === 'current' ? 'ring-1 ring-[var(--color-primary)]' : ''}
                          `}
              >
                {dayObj.day}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between pt-3 border-t border-[var(--color-sub-light-gray)]"> {/* 구분선 색상 변경 */}
          <button
            onClick={handleTodayClick}
            // 오늘 버튼 텍스트/배경 색상 변경
            className="bg-[var(--color-sub-light-gray)]/70 text-[var(--text-subtle)] px-4 py-2 rounded-[var(--rounded-button)] text-xs font-medium hover:bg-[var(--color-sub-light-gray)] transition-colors"
          >
            오늘
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-[var(--rounded-button)] text-xs font-medium hover:opacity-90 transition-opacity"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
