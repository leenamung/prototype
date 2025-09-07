"use client";

import React, { useState, useMemo } from 'react';
import { MyDiaryEntry } from '../data/profileSampleData'; 

interface DiaryCalendarViewProps {
  diaries: MyDiaryEntry[];
}

const getDaysInMonth = (year: number, month: number) => {
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

const getDateKey = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const DiaryCalendarView: React.FC<DiaryCalendarViewProps> = ({ diaries }) => {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []); 
  const todayKey = getDateKey(today);

  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1)); 
  const [selectedDate, setSelectedDate] = useState<Date | null>(today); 

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 
  
  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const diariesByDate = useMemo(() => {
    const grouped: { [key: string]: MyDiaryEntry[] } = {};
    diaries.forEach(diary => {
      const dateKey = getDateKey(diary.dateObject); 
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(diary);
    });
    return grouped;
  }, [diaries]);

  const selectedDateKey = selectedDate ? getDateKey(selectedDate) : null;
  const selectedDateDiaries = selectedDateKey ? diariesByDate[selectedDateKey] || [] : [];

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  const handleDateClick = (dayData: { day: number; monthOffset: 'current' | 'prev' | 'next'; fullDate: Date }) => {
    if (dayData.monthOffset === 'prev') {
      setCurrentDate(new Date(dayData.fullDate.getFullYear(), dayData.fullDate.getMonth(), 1));
    } else if (dayData.monthOffset === 'next') {
      setCurrentDate(new Date(dayData.fullDate.getFullYear(), dayData.fullDate.getMonth(), 1));
    }
    setSelectedDate(dayData.fullDate); 
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPrevMonth} className="p-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors" aria-label="이전 달">
          {/* ✨ 아이콘 색상 text-[var(--text-subtle)] 적용 */}
          <i className="ri-arrow-left-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
        {/* ✨ 월/년도 텍스트 색상 text-[var(--text-main)] 적용 */}
        <h2 className="text-base font-semibold text-[var(--text-main)]">{`${year}년 ${month + 1}월`}</h2>
        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors" aria-label="다음 달">
          {/* ✨ 아이콘 색상 text-[var(--text-subtle)] 적용 */}
          <i className="ri-arrow-right-s-line ri-lg text-[var(--text-subtle)]"></i>
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((day, index) => (
          // ✨ 요일 텍스트 색상 text-[var(--text-subtle)] 적용 (주말 제외)
          <div key={day} className={`text-center text-xs font-medium ${index === 0 ? 'text-[var(--color-warning)]' : index === 6 ? 'text-[var(--color-accent-blue)]' : 'text-[var(--text-subtle)]'}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 bg-[var(--color-border)] rounded-lg overflow-hidden shadow-sm border border-[var(--color-border)]">
        {daysInMonth.map((dayData, index) => {
          const dateKey = getDateKey(dayData.fullDate);
          const dayDiaries = diariesByDate[dateKey] || [];
          const representativeDiary = dayDiaries[0]; 
          const calendarEmotionClass = representativeDiary ? `has-diary-${representativeDiary.emotion}` : '';
          const isSelected = selectedDateKey === dateKey;
          const isCurrentMonth = dayData.monthOffset === 'current';
          const isTodayInCalendar = representativeDiary?.isToday ?? (dateKey === todayKey && isCurrentMonth) ; 

          return (
            <div
              key={index}
              onClick={() => handleDateClick(dayData)}
              className={`calendar-day text-center p-1 text-sm cursor-pointer bg-[var(--color-component-bg)] hover:bg-[var(--color-subtle-bg)] transition-colors relative border-t border-l border-[var(--color-border)] 
                          ${!isCurrentMonth ? 'text-[var(--color-border)]' : 'text-[var(--text-main)]'} 
                          ${isTodayInCalendar ? 'font-bold text-[var(--color-primary-dark)]' : ''}
                          ${isSelected && isCurrentMonth ? 'ring-2 ring-[var(--color-primary)] ring-inset z-10' : ''}
                          ${dayDiaries.length > 0 && isCurrentMonth ? `has-diary ${calendarEmotionClass}` : ''}`}
            >
              {dayData.day}
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-6">
          {/* ✨ 선택된 날짜 텍스트 색상 text-[var(--text-main)] 적용 */}
          <h3 className="text-sm font-semibold mb-3 text-[var(--text-main)]">
            {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일의 일기`}
          </h3>
          {selectedDateDiaries.length > 0 ? (
            <div className="space-y-2">
              {selectedDateDiaries.map(diary => (
                <div key={diary.id} className={`flex bg-[var(--color-component-bg)] rounded-md overflow-hidden shadow-sm cursor-pointer border border-[var(--color-border)] border-l-4 border-l-[var(--emotion-${diary.emotion})] hover:shadow transition-shadow`}>
                  <div className="flex-1 p-2.5">
                    <div className="flex justify-between items-center">
                      {/* ✨ 시간/제목 텍스트 색상 text-[var(--text-subtle)] 적용 */}
                      <span className="text-xs text-[var(--text-subtle)]">{diary.time || diary.title}</span>
                       <i className={`${diary.typeIcon} text-[var(--color-border)] ri-sm`} title={diary.type}></i>
                    </div>
                    {/* ✨ 제목 텍스트 색상 text-[var(--text-main)] 적용 */}
                    {diary.time && <h4 className="font-medium text-xs text-[var(--text-main)] mt-0.5 truncate">{diary.title}</h4>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // ✨ 메시지 텍스트 색상 text-[var(--text-subtle)] 적용
            <p className="text-xs text-[var(--text-subtle)] py-4 text-center">선택된 날짜에 작성된 일기가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiaryCalendarView;
