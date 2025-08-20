"use client";
import React, { useState } from 'react';

// Define the props for the FilterPanel component
interface FilterPanelProps {
  isOpen: boolean; // Controls visibility of the panel
  onClose: () => void; // Function to call when closing the panel
  onApplyFilters: (filters: ActiveFilters) => void; // Function to call when applying filters
}

// Define the structure for the active filters state
export interface ActiveFilters {
  dateRange?: string; // Selected date range string (e.g., '최근 일주일')
  emotions?: string[]; // Array of selected emotion names (e.g., ['happy', 'calm'])
  privacy?: string; // Selected privacy option string (e.g., '비공개')
  diaryTypes?: string[]; // Array of selected diary type names (e.g., ['텍스트', '사진'])
}

// The FilterPanel component
const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, onApplyFilters }) => {
  // State hooks for managing selected filter values within the panel
  const [selectedDateRange, setSelectedDateRange] = useState<string>('전체');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedPrivacy, setSelectedPrivacy] = useState<string>('전체');
  // Default to all diary types selected initially
  const [selectedDiaryTypes, setSelectedDiaryTypes] = useState<string[]>(['텍스트', '사진', '영상', '음성']);

  // Define the available filter options
  const dateRanges = ['전체', '최근 일주일', '최근 한 달', '올해', '작년'];
  const emotions = [
    { name: 'happy', color: 'var(--emotion-happy)', label: '행복' },
    { name: 'sad', color: 'var(--emotion-sad)', label: '슬픔' },
    { name: 'angry', color: 'var(--emotion-angry)', label: '화남' },
    { name: 'calm', color: 'var(--emotion-calm)', label: '평온' },
    { name: 'anxious', color: 'var(--emotion-anxious)', label: '불안' },
  ];
  const privacyOptions = ['전체', '비공개', '친구 공개', '아지트 공개', '전체 공개'];
  const diaryTypeOptions = [
    { name: '텍스트', icon: 'ri-file-text-line' },
    { name: '사진', icon: 'ri-image-line' },
    { name: '영상', icon: 'ri-video-line' },
    { name: '음성', icon: 'ri-mic-line' },
  ];

  // Toggles selection state for an emotion
  const handleEmotionToggle = (emotionName: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotionName) 
        ? prev.filter(e => e !== emotionName) // Remove if already selected
        : [...prev, emotionName] // Add if not selected
    );
  };

  // Toggles selection state for a diary type
  const handleDiaryTypeToggle = (typeName: string) => {
    setSelectedDiaryTypes(prev =>
      prev.includes(typeName) 
        ? prev.filter(t => t !== typeName) // Remove if already selected
        : [...prev, typeName] // Add if not selected
    );
  };
  
  // Resets all filters to their default values
  const handleResetFilters = () => {
    setSelectedDateRange('전체');
    setSelectedEmotions([]);
    setSelectedPrivacy('전체');
    setSelectedDiaryTypes(['텍스트', '사진', '영상', '음성']);
    // Optionally, apply the reset immediately by calling onApplyFilters with empty object
    // onApplyFilters({}); 
  };

  // Applies the currently selected filters by calling the prop function
  const handleSubmit = () => {
    onApplyFilters({
      dateRange: selectedDateRange,
      emotions: selectedEmotions,
      privacy: selectedPrivacy,
      diaryTypes: selectedDiaryTypes,
    });
  };

  return (
    // Main container for the filter panel, visibility controlled by `isOpen`
    <div className={`fixed top-0 left-0 w-full h-[calc(100%-4rem)] bg-[var(--color-component-bg)] z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div id="filterPanelContent" className="p-4 pt-16 h-full flex flex-col">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-[var(--text-subtle)] hover:text-[var(--text-main)] z-40 p-1 rounded-full hover:bg-[var(--color-subtle-bg)] transition-colors duration-150"
          aria-label="필터 닫기"
        >
          <i className="ri-close-line ri-xl"></i>
        </button>
        
        <h2 id="filter-panel-title" className="sr-only">일기 필터</h2> 

        <div className="overflow-y-auto flex-grow mb-4 pr-1">
          <section className="mb-6" aria-labelledby="date-filter-heading">
            <h3 id="date-filter-heading" className="text-sm font-semibold mb-2.5 text-[var(--text-main)]">날짜</h3>
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
              {dateRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setSelectedDateRange(range)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-primary)]
                              ${selectedDateRange === range 
                                ? 'bg-[var(--color-primary)] border border-[var(--color-primary-dark)] text-white shadow-sm' 
                                // 비활성 버튼 배경 및 텍스트 색상 변경
                                : 'bg-[var(--color-sub-beige)] hover:bg-opacity-80 text-[var(--text-subtle)] hover:text-[var(--text-main)]'
                              }`}
                  aria-pressed={selectedDateRange === range}
                >
                  {range}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-6" aria-labelledby="emotion-filter-heading">
            <h3 id="emotion-filter-heading" className="text-sm font-semibold mb-2.5 text-[var(--text-main)]">감정</h3>
            <div className="flex space-x-3 items-center">
              {emotions.map(emotion => (
                <button
                  key={emotion.name}
                  onClick={() => handleEmotionToggle(emotion.name)}
                  className={`w-9 h-9 rounded-full transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none
                              ${selectedEmotions.includes(emotion.name) ? 'ring-2 ring-offset-2 ring-[var(--color-primary-dark)] scale-105' : 'ring-1 ring-[var(--color-border)]'}`}
                  style={{ backgroundColor: emotion.color }}
                  aria-pressed={selectedEmotions.includes(emotion.name)}
                  aria-label={emotion.label}
                  title={emotion.label}
                ></button>
              ))}
            </div>
          </section>
          
          {/* 공개 범위, 일기 타입 섹션의 버튼들도 유사하게 수정 */}
          <section className="mb-6" aria-labelledby="privacy-filter-heading">
            <h3 id="privacy-filter-heading" className="text-sm font-semibold mb-2.5 text-[var(--text-main)]">공개 범위</h3>
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
              {privacyOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setSelectedPrivacy(option)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-primary)]
                              ${selectedPrivacy === option 
                                ? 'bg-[var(--color-primary)] border border-[var(--color-primary-dark)] text-white shadow-sm' 
                                : 'bg-[var(--color-sub-beige)] hover:bg-opacity-80 text-[var(--text-subtle)] hover:text-[var(--text-main)]'
                              }`}
                  aria-pressed={selectedPrivacy === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-6" aria-labelledby="type-filter-heading">
            <h3 id="type-filter-heading" className="text-sm font-semibold mb-2.5 text-[var(--text-main)]">일기 타입</h3>
            <div className="flex flex-wrap gap-2">
              {diaryTypeOptions.map(type => (
                <button
                  key={type.name}
                  onClick={() => handleDiaryTypeToggle(type.name)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs flex items-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-primary)]
                              ${selectedDiaryTypes.includes(type.name) 
                                ? 'bg-[var(--color-primary)] border border-[var(--color-primary-dark)] text-white shadow-sm' 
                                : 'bg-[var(--color-sub-beige)] hover:bg-opacity-80 text-[var(--text-subtle)] hover:text-[var(--text-main)]'
                              }`}
                  aria-pressed={selectedDiaryTypes.includes(type.name)}
                >
                  <i className={`${type.icon} mr-1.5 ri-sm`}></i>{type.name}
                </button>
              ))}
            </div>
          </section>
        </div>
        
        <div className="flex space-x-3 pt-4 border-t border-[var(--color-border)] mt-auto">
          <button 
            onClick={handleResetFilters}
            className="flex-1 py-2.5 bg-[var(--color-subtle-bg)] hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] rounded-[var(--rounded-button)] text-sm text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors"
          >
            초기화
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-[var(--rounded-button)] text-sm hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
