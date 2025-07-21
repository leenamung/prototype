// app/write/page.tsx
"use client";

import React, { useState, ChangeEvent, useEffect } from 'react';
import WriteNavigationBar from './components/WriteNavigationBar';
import DiaryTypeTabs, { DiaryType } from './components/DiaryTypeTabs';
import TextEditorTab from './components/TextEditorTab';
import PhotoUploadTab from './components/PhotoUploadTab';
import VideoUploadTab from './components/VideoUploadTab';
import VoiceRecordTab from './components/VoiceRecordTab';
import EmotionSelector from './components/EmotionSelector';
import SettingsSection from './components/SettingsSection';
import ToggleSwitch from './components/ToggleSwitch';
import DatePickerModal from './components/DatePickerModal';
import ExchangeDiaryOptions from './components/ExchangeDiaryOptions'; // 추가
import LocationDisplay from './components/LocationDisplay'; // 추가

// 공개 범위 옵션 타입 및 맵
type PrivacyOption = 'private' | 'friends' | 'group' | 'public';
const privacyOptionsMap: Record<PrivacyOption, { text: string; icon: string }> = {
  private: { text: '비공개', icon: 'ri-lock-line' },
  friends: { text: '친구 공개', icon: 'ri-user-shared-line' },
  group: { text: '아지트 선택', icon: 'ri-home-4-line' },
  public: { text: '전체 공개', icon: 'ri-earth-line' },
};

export default function WritePage() {
  const [activeTab, setActiveTab] = useState<DiaryType>('text');
  
  const [textContent, setTextContent] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [voiceDescription, setVoiceDescription] = useState('');
  
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<PrivacyOption>('private');
  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  
  const [diaryDate, setDiaryDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [isExchangeDiary, setIsExchangeDiary] = useState(false);
  // ExchangeDiaryOptions 내부 상태로 관리하거나, 필요시 page 레벨로 올릴 수 있음
  // const [showExchangeSettings, setShowExchangeSettings] = useState(false); 

  const [useLocation, setUseLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const handlePublish = () => {
    console.log({
      type: activeTab, textContent, photoFile, photoDescription,
      videoFile, videoDescription, audioBlob, voiceDescription,
      selectedEmotion, privacy, diaryDate, isExchangeDiary,
      useLocation, currentLocation,
    });
    alert("일기가 발행되었습니다! (콘솔 로그 확인)");
  };

  const formatDateDisplay = (date: Date): string => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  
  useEffect(() => {
    if (useLocation && !currentLocation) {
      setTimeout(() => setCurrentLocation("서울특별시 강남구 테헤란로 (예시)"), 500);
    } else if (!useLocation) {
      setCurrentLocation(null);
    }
  }, [useLocation, currentLocation]); // currentLocation 의존성 추가

  // Check if any content exists to enable publish button
  const isPublishable = (): boolean => {
    switch(activeTab) {
        case 'text': return textContent.trim() !== '';
        case 'photo': return photoFile !== null || photoDescription.trim() !== '';
        case 'video': return videoFile !== null || videoDescription.trim() !== '';
        case 'voice': return audioBlob !== null || voiceDescription.trim() !== '';
        default: return false;
    }
  };

  return (
    <div className="pb-24">
      <WriteNavigationBar onPublish={handlePublish} isPublishDisabled={!isPublishable()} />

      <main className="pt-16 px-4">
        <DiaryTypeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mb-6">
          {activeTab === 'text' && <TextEditorTab content={textContent} onContentChange={setTextContent} />}
          {activeTab === 'photo' && <PhotoUploadTab description={photoDescription} onDescriptionChange={setPhotoDescription} onPhotoChange={setPhotoFile} />}
          {activeTab === 'video' && <VideoUploadTab description={videoDescription} onDescriptionChange={setVideoDescription} onVideoChange={setVideoFile} />}
          {activeTab === 'voice' && <VoiceRecordTab description={voiceDescription} onDescriptionChange={setVoiceDescription} onAudioRecordingChange={setAudioBlob} />}
        </div>

        <EmotionSelector selectedEmotion={selectedEmotion} onEmotionSelect={setSelectedEmotion} />

        <div className="space-y-4">
          <SettingsSection iconClass="ri-lock-line" title="공개 설정">
            <div className="relative">
              <button
                onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)}
                className="flex items-center bg-[var(--color-sub-beige)] px-3 py-1.5 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-opacity-80 transition-colors"
                aria-haspopup="true"
                aria-expanded={isPrivacyDropdownOpen}
              >
                <i className={`${privacyOptionsMap[privacy].icon} ri-sm mr-1.5 text-[var(--text-subtle)]`}></i>
                <span className="text-[var(--text-main)]">{privacyOptionsMap[privacy].text}</span>
                <i className={`ri-arrow-down-s-line ml-1 text-[var(--text-subtle)] transition-transform ${isPrivacyDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              {isPrivacyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-20 border border-[var(--color-sub-light-gray)]/50 py-1">
                  <ul>
                    {(Object.keys(privacyOptionsMap) as PrivacyOption[]).map((key) => (
                      <li
                        key={key}
                        onClick={() => { setPrivacy(key); setIsPrivacyDropdownOpen(false); }}
                        className="px-3 py-2 hover:bg-[var(--color-sub-beige)]/50 cursor-pointer flex items-center text-xs sm:text-sm text-[var(--text-main)]"
                        role="menuitem"
                      >
                        <i className={`${privacyOptionsMap[key].icon} ri-sm mr-2 text-[var(--text-subtle)]`}></i>
                        <span>{privacyOptionsMap[key].text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </SettingsSection>

          <SettingsSection iconClass="ri-calendar-line" title="날짜">
            <button
              onClick={() => setIsDatePickerOpen(true)}
              className="flex items-center bg-[var(--color-sub-beige)] px-3 py-1.5 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-opacity-80 transition-colors"
            >
              <span className="text-[var(--text-main)]">{formatDateDisplay(diaryDate)}</span>
              <i className="ri-arrow-down-s-line ml-1 text-[var(--text-subtle)]"></i>
            </button>
          </SettingsSection>
          <DatePickerModal 
            isOpen={isDatePickerOpen}
            onClose={() => setIsDatePickerOpen(false)}
            currentSelectedDate={diaryDate}
            onDateSelect={setDiaryDate}
          />

          <SettingsSection iconClass="ri-book-open-line" title="교환일기">
            <ToggleSwitch id="exchange-diary-toggle" checked={isExchangeDiary} onChange={setIsExchangeDiary} ariaLabel="교환일기 사용 여부" />
          </SettingsSection>
          {isExchangeDiary && ( // isExchangeDiary 상태에 따라 ExchangeDiaryOptions 렌더링
            <ExchangeDiaryOptions />
          )}

          <SettingsSection iconClass="ri-map-pin-line" title="위치 정보">
            <ToggleSwitch id="location-toggle" checked={useLocation} onChange={setUseLocation} ariaLabel="위치 정보 사용 여부" />
          </SettingsSection>
          {useLocation && (
            <LocationDisplay currentLocation={currentLocation} />
          )}
        </div>
      </main>
    </div>
  );
}
