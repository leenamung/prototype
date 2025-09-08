"use client";
import React, { useState } from 'react';
import { emotions } from '../../../../data/emotionData';

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
    <div className={`fixed top-0 left-0 w-full h-[calc(100%-4em)] bg-[var(--color-component-bg)] z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div id="filterPanelContent" className="h-full flex flex-col">
        
        <div className="flex-shrink-0 flex items-center justify-between p-4 h-16 border-b border-[var(--color-border)]">
          <div className="w-8"></div> {/* 왼쪽 공간 확보용 */}
          <h2 className="font-semibold text-lg text-[var(--text-main)]">필터</h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center text-[var(--text-subtle)] hover:text-[var(--text-main)] rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors"
            aria-label="필터 닫기"
          >
            <i className="ri-close-line ri-xl"></i>
          </button>
        </div>

        <div className="overflow-y-auto overflow-x-hidden flex-grow p-4 mb-4">
          <section className="mb-6" aria-labelledby="date-filter-heading">
            <h3 id="date-filter-heading" className="text-sm font-semibold mb-2.5 text-[var(--text-main)]">날짜</h3>
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
              {dateRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setSelectedDateRange(range)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-colors focus:outline-none 
                  ${selectedDateRange === range 
                    ? 'bg-[var(--color-primary)] text-[var(--text-on-primary)] shadow-sm hover:opacity-90 border border-[var(--color-primary-dark)]'
                    : 'bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--color-border)] border border-transparent'
                  }`}
                  aria-pressed={selectedDateRange === range}
                >
                  {range}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-6" aria-labelledby="emotion-filter-heading">
            <h3 id="emotion-filter-heading" className="text-sm font-semibold mb-3 text-[var(--text-main)]">감정</h3>
            <div className="grid grid-cols-5 gap-x-2 gap-y-3">
              {emotions.map(emotion => (
                <button
                  key={emotion.key}
                  onClick={() => handleEmotionToggle(emotion.key)}
                  className="flex flex-col items-center justify-center text-center transition-transform duration-200 ease-out transform hover:scale-110 active:scale-95 focus:outline-none"
                  aria-pressed={selectedEmotions.includes(emotion.key)}
                >
                  <div
                    className="w-10 h-10 rounded-full cursor-pointer transition-all duration-200"
                    style={{ 
                      backgroundColor: emotion.color,
                      boxShadow: selectedEmotions.includes(emotion.key) ? `0 0 0 2px var(--color-component-bg), 0 0 0 4px ${emotion.color}` : '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                  >
                    {selectedEmotions.includes(emotion.key) && (
                        <div className="w-full h-full flex items-center justify-center">
                            <i className="ri-check-line text-white text-xl font-bold" style={{textShadow: '0px 1px 2px rgba(0,0,0,0.2)'}}></i>
                        </div>
                    )}
                  </div>
                  <span className={`mt-2 text-xs transition-colors ${selectedEmotions.includes(emotion.key) ? `font-semibold` : 'text-[var(--text-subtle)]'}`}
                        style={{color: selectedEmotions.includes(emotion.key) ? emotion.color : ''}}
                  >
                    {emotion.label}
                  </span>
                </button>
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
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-colors focus:outline-none 
                  ${selectedPrivacy === option 
                    ? 'bg-[var(--color-primary)] text-[var(--text-on-primary)] shadow-sm hover:opacity-90 border border-[var(--color-primary-dark)]'
                    : 'bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--color-border)] border border-transparent'
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
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs flex items-center transition-colors focus:outline-none 
                  ${selectedDiaryTypes.includes(type.name) 
                    ? 'bg-[var(--color-primary)] text-[var(--text-on-primary)] shadow-sm hover:opacity-90 border border-[var(--color-primary-dark)]'
                    : 'bg-[var(--color-subtle-bg)] text-[var(--text-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--color-border)] border border-transparent'
                  }`}
                  aria-pressed={selectedDiaryTypes.includes(type.name)}
                >
                  <i className={`${type.icon} mr-1.5 ri-sm`}></i>{type.name}
                </button>
              ))}
            </div>
          </section>
        </div>
        
        <div className="flex-shrink-0 flex space-x-3 p-4 border-t border-[var(--color-border)]">
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