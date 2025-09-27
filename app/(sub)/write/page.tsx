"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// 컴포넌트 임포트
import WeatherSelectionModal, { WeatherOption, weatherOptions } from "../../components/domain/write/WeatherSelectionModal";
import { Emotion } from "../../data/emotionData";
import SettingsSection from "@/app/components/domain/write/SettingsSection";
import ExchangeDiaryOptions from "@/app/components/domain/write/ExchangeDiaryOptions";
import DatePickerModal from "@/app/components/domain/write/DatePickerModal";
import ToggleSwitch from "@/app/components/domain/write/ToggleSwitch";
import LocationDisplay from "@/app/components/domain/write/LocationDisplay";
import DiaryTypeTabs, { DiaryType } from "@/app/components/domain/write/DiaryTypeTabs";
import WriteNavigationBar from "@/app/components/domain/write/WriteNavigationBar";
import TextEditorTab from "@/app/components/domain/write/TextEditorTab";
import PhotoUploadTab from "@/app/components/domain/write/PhotoUploadTab";
import VideoUploadTab from "@/app/components/domain/write/VideoUploadTab";
import VoiceRecordTab from "@/app/components/domain/write/VoiceRecordTab";
import EmotionSelector from "@/app/components/domain/write/EmotionSelector";

// --- 타입 정의 ---
type PrivacyOption = "private" | "friends" | "group" | "public" | "exchange";
const privacyOptionsMap: Record<PrivacyOption, { text: string; icon: string }> =
  {
    private: { text: "비공개", icon: "ri-lock-line" },
    friends: { text: "친구 공개", icon: "ri-user-shared-line" },
    group: { text: "아지트 선택", icon: "ri-home-4-line" },
    public: { text: "전체 공개", icon: "ri-earth-line" },
    exchange: { text: "교환일기", icon: "ri-book-open-line" },
  };

// --- 2단계: 설정을 위한 전체 화면 모달 컴포넌트 ---
interface PublishSettingsModalProps {
  onClose: () => void;
  onPublish: () => void;
  diaryTitle: string; // 제목 state
  onTitleChange: (title: string) => void; // 제목 변경 handler
  // 상태와 핸들러를 Props로 전달받음
  privacy: PrivacyOption;
  setPrivacy: (p: PrivacyOption) => void;
  diaryDate: Date;
  setDiaryDate: (d: Date) => void;
  useLocation: boolean;
  setUseLocation: (u: boolean) => void;
  currentLocation: string | null;
  // ⭐️ 날씨 관련 상태와 핸들러 추가
  selectedWeather: WeatherOption;
  setSelectedWeather: (w: WeatherOption) => void;
}

const PublishSettingsModal: React.FC<PublishSettingsModalProps> = ({
  onClose,
  onPublish,
  diaryTitle,
  onTitleChange,
  privacy,
  setPrivacy,
  diaryDate,
  setDiaryDate,
  useLocation,
  setUseLocation,
  currentLocation,
  selectedWeather,
  setSelectedWeather, // ⭐️ props 추가
}) => {
  const MAX_TITLE_LENGTH = 50;

  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false); // ⭐️ 날씨 모달 상태 추가

  const formatDateDisplay = (date: Date): string => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-[var(--color-component-bg)] z-50 flex flex-col bottom-16"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
    >
      {/* 모달 상단 네비게이션 */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[var(--color-border)] h-16">
        <button onClick={onClose} className="p-2 -ml-2 text-[var(--text-subtle)] hover:text-[var(--text-main)]">
          <i className="ri-arrow-left-s-line ri-xl"></i>
        </button>
        <h2 className="font-semibold text-lg text-[var(--text-main)]">게시물 설정</h2>
        <div className="w-8"></div> {/* 간격 맞추기용 빈 div */}
      </div>

      {/* 모달 콘텐츠 (스크롤 가능 영역) */}
      <div className="flex-grow overflow-y-auto p-5 space-y-5">
        {/* ✅ [추가] 제목 입력 섹션 */}
        <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm p-5 border border-[var(--color-border)]">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="ri-quill-pen-line ri-lg mr-3 text-[var(--text-subtle)] w-6 h-6 flex items-center justify-center"></i>
              <span className="text-[var(--text-main)] text-sm font-medium">제목</span>
            </div>
            {/* 글자 수 카운터 */}
            <span className="text-xs text-[var(--text-subtle)]">
              {diaryTitle.length} / {MAX_TITLE_LENGTH}
            </span>
          </div>
          <div className="mt-3">
            <input 
              type="text"
              value={diaryTitle}
              onChange={(e) => {
                if (e.target.value.length <= MAX_TITLE_LENGTH) {
                  onTitleChange(e.target.value);
                }
              }}
              placeholder="제목 (선택 사항)"
              className="w-full bg-[var(--color-subtle-bg)] text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/70 focus:outline-none p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary-dark)] transition-all"
            />
          </div>
        </div>
        {/* 1. 게시 공간 선택 */}
        <SettingsSection iconClass="ri-send-plane-line" title="게시 공간">
          <div className="relative">
            <button
              onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)}
              className="flex items-center bg-[var(--color-subtle-bg)] px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-[var(--color-border)]"
            >
              <i
                className={`${privacyOptionsMap[privacy].icon} ri-sm mr-1.5 text-[var(--text-subtle)]`}
              ></i>
              <span className="text-[var(--text-main)]">{privacyOptionsMap[privacy].text}</span>
              <i
                className={`ri-arrow-down-s-line ml-1 text-[var(--text-subtle)] transition-transform ${
                  isPrivacyDropdownOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {isPrivacyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[var(--color-component-bg)] rounded-lg z-20 border border-[var(--color-border)] py-1 shadow-[0_4px_12px_rgba(0,0,0,0.05),_inset_0_0_0_1px_var(--color-inset-border)]">
                <ul>
                  {(Object.keys(privacyOptionsMap) as PrivacyOption[]).map(
                    (key) => (
                      <li
                        key={key}
                        onClick={() => {
                          setPrivacy(key);
                          setIsPrivacyDropdownOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-[var(--color-subtle-bg)] cursor-pointer flex items-center text-sm"
                      >
                        <i
                          className={`${privacyOptionsMap[key].icon} ri-sm mr-2 text-[var(--text-subtle)]`}
                        ></i>
                        <span className="text-[var(--text-main)]">{privacyOptionsMap[key].text}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </SettingsSection>
        {privacy === "exchange" && <ExchangeDiaryOptions />}

        {/* 2. 날짜 및 날씨 선택 */}
        <SettingsSection iconClass="ri-calendar-line" title="날짜 및 날씨">
          <div className="flex items-center space-x-2">
            {/* ⭐️ 날씨 선택 버튼 UI 수정 */}
            <button 
              onClick={() => setIsWeatherModalOpen(true)}
              className="flex items-center bg-[var(--color-subtle-bg)] px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] transition-colors"
            >
                <i className={`${selectedWeather.icon} ri-sm mr-1.5 text-[var(--text-subtle)]`}></i>
                <span className="text-[var(--text-main)]">{selectedWeather.label}</span>
            </button>
            <button 
              onClick={() => setIsDatePickerOpen(true)} 
              className="flex items-center bg-[var(--color-subtle-bg)] px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-[var(--color-border)] active:bg-[var(--color-border-dark)] transition-colors"
            >
                <span className="text-[var(--text-main)]">{formatDateDisplay(diaryDate)}</span>
            </button>
          </div>
        </SettingsSection>
        {/* ⭐️ 날씨/날짜 모달 렌더링 */}
        <WeatherSelectionModal isOpen={isWeatherModalOpen} onClose={() => setIsWeatherModalOpen(false)} onWeatherSelect={setSelectedWeather} />
        <DatePickerModal
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          currentSelectedDate={diaryDate}
          onDateSelect={setDiaryDate}
        />

        {/* 3. 위치 정보 */}
        <SettingsSection iconClass="ri-map-pin-line" title="위치 정보">
          <ToggleSwitch
            id="location-toggle-modal"
            checked={useLocation}
            onChange={setUseLocation}
            ariaLabel="위치 정보 사용 여부"
          />
        </SettingsSection>
        {useLocation && <LocationDisplay currentLocation={currentLocation} />}
      </div>

      {/* 모달 하단 발행하기 버튼 */}
      <div className="flex-shrink-0 p-4 border-t border-[var(--color-border)]">
        <button
          onClick={onPublish}
          className="w-full bg-[var(--color-primary)] text-[var(--text-on-primary)] py-3 rounded-lg font-semibold hover:opacity-90 active:bg-[var(--color-primary-darker)] active:border-[var(--color-primary-darker)] transition-all border border-[var(--color-primary-dark)]"
        >
          발행하기
        </button>
      </div>
    </motion.div>
  );
};

// --- 1단계: 메인 작성 페이지 컴포넌트 ---
export default function WritePage() {
  // --- 상태(State) 정의 ---
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // 모달 표시 상태

  const [activeTab, setActiveTab] = useState<DiaryType>("text");
  const [diaryTitle, setDiaryTitle] = useState('');

  const [diaryContent, setDiaryContent] = useState("");

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [privacy, setPrivacy] = useState<PrivacyOption>("private");
  const [diaryDate, setDiaryDate] = useState(new Date());
  const [useLocation, setUseLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  // ⭐️ 날씨 상태 추가 (기본값: '맑음')
  const [selectedWeather, setSelectedWeather] = useState<WeatherOption>(weatherOptions[0]);
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);


  const handlePublish = () => {
    console.log("--- 최종 발행 데이터 ---", {
      type: activeTab,
      content: diaryContent,
      photoFile,
      videoFile,
      audioBlob,
      privacy,
      diaryDate,
      useLocation,
      currentLocation,
      selectedWeather: selectedWeather.name, // ⭐️ 날씨 데이터 추가
      selectedEmotions: selectedEmotions.map(e => e.label), // 이름만 추출하여 전송
    });
    alert("일기가 발행되었습니다! (콘솔 로그 확인)");
    setIsSettingsModalOpen(false); // 발행 후 모달 닫기
  };

  const isNextEnabled = (): boolean => {
    switch (activeTab) {
      case "text":
        return diaryContent.trim() !== "";
      case "photo":
        return photoFile !== null || diaryContent.trim() !== "";
      case "video":
        return videoFile !== null || diaryContent.trim() !== "";
      case "voice":
        return audioBlob !== null || diaryContent.trim() !== "";
      default:
        return false;
    }
  };

  useEffect(() => {
    if (useLocation && !currentLocation) {
      setTimeout(
        () => setCurrentLocation("서울특별시 강남구 테헤란로 (예시)"),
        500
      );
    } else if (!useLocation) {
      setCurrentLocation(null);
    }
  }, [useLocation, currentLocation]);

  return (
    <div className="pb-24">
      <WriteNavigationBar
        onPublish={() => setIsSettingsModalOpen(true)}
        isPublishDisabled={!isNextEnabled()}
      />

      <main className="pt-16 px-5">
        {/* 1. 콘텐츠 타입 선택 */}
        <DiaryTypeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 2. 콘텐츠 작성 영역 */}
        <div className="mb-6 min-h-[451px]">
          {activeTab === "text" && (
            <TextEditorTab
              content={diaryContent}
              onContentChange={setDiaryContent}
            />
          )}
          {activeTab === "photo" && (
            <PhotoUploadTab
              content={diaryContent}
              onContentChange={setDiaryContent}
              onPhotoChange={setPhotoFile}
            />
          )}
          {activeTab === "video" && (
            <VideoUploadTab
              content={diaryContent}
              onContentChange={setDiaryContent}
              onVideoChange={setVideoFile}
            />
          )}
          {activeTab === "voice" && (
            <VoiceRecordTab
              content={diaryContent}
              onContentChange={setDiaryContent}
              onAudioRecordingChange={setAudioBlob}
            />
          )}
        </div>

        {/* 3. 감정 선택 */}
        <EmotionSelector selectedEmotions={selectedEmotions} onEmotionChange={setSelectedEmotions} />
      </main>

      {/* 2단계 설정 모달 */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <PublishSettingsModal
            onClose={() => setIsSettingsModalOpen(false)}
            onPublish={() => handlePublish()}
            diaryTitle={diaryTitle}
            onTitleChange={setDiaryTitle}
            privacy={privacy}
            setPrivacy={setPrivacy}
            diaryDate={diaryDate}
            setDiaryDate={setDiaryDate}
            useLocation={useLocation}
            setUseLocation={setUseLocation}
            currentLocation={currentLocation}
            // ⭐️ 날씨 관련 상태와 핸들러 전달
            selectedWeather={selectedWeather}
            setSelectedWeather={setSelectedWeather}
          />
        )}
      </AnimatePresence>
    </div>
  );
}