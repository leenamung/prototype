// app/write/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 컴포넌트 임포트
import WriteNavigationBar from "./components/WriteNavigationBar";
import DiaryTypeTabs, { DiaryType } from "./components/DiaryTypeTabs";
import TextEditorTab from "./components/TextEditorTab";
import PhotoUploadTab from "./components/PhotoUploadTab";
import VideoUploadTab from "./components/VideoUploadTab";
import VoiceRecordTab from "./components/VoiceRecordTab";
import EmotionSelector, { EmotionOption } from './components/EmotionSelector'; 
import SettingsSection from "./components/SettingsSection";
import DatePickerModal from "./components/DatePickerModal";
import ExchangeDiaryOptions from "./components/ExchangeDiaryOptions";
import LocationDisplay from "./components/LocationDisplay";
import ToggleSwitch from "./components/ToggleSwitch";
import WeatherSelectionModal, { WeatherOption, weatherOptions } from "./components/WeatherSelectionModal";

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
      className="fixed inset-0 bg-white z-50 flex flex-col"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
    >
      {/* 모달 상단 네비게이션 */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 h-16">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <i className="ri-arrow-left-s-line ri-xl"></i>
        </button>
        <h2 className="font-semibold text-lg text-gray-800">게시물 설정</h2>
        <div className="w-8"></div> {/* 간격 맞추기용 빈 div */}
      </div>

      {/* 모달 콘텐츠 (스크롤 가능 영역) */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* 1. 게시 공간 선택 */}
        <SettingsSection iconClass="ri-send-plane-line" title="게시 공간">
          <div className="relative">
            <button
              onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)}
              className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-gray-200"
            >
              <i
                className={`${privacyOptionsMap[privacy].icon} ri-sm mr-1.5 text-gray-500`}
              ></i>
              <span>{privacyOptionsMap[privacy].text}</span>
              <i
                className={`ri-arrow-down-s-line ml-1 text-gray-500 transition-transform ${
                  isPrivacyDropdownOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {isPrivacyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-20 border border-gray-100 py-1">
                <ul>
                  {(Object.keys(privacyOptionsMap) as PrivacyOption[]).map(
                    (key) => (
                      <li
                        key={key}
                        onClick={() => {
                          setPrivacy(key);
                          setIsPrivacyDropdownOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-sm"
                      >
                        <i
                          className={`${privacyOptionsMap[key].icon} ri-sm mr-2 text-gray-500`}
                        ></i>
                        <span>{privacyOptionsMap[key].text}</span>
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
              className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-gray-200"
            >
                <i className={`${selectedWeather.icon} ri-sm mr-1.5 text-gray-500`}></i>
                <span>{selectedWeather.label}</span>
            </button>
            <button onClick={() => setIsDatePickerOpen(true)} className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                <span>{formatDateDisplay(diaryDate)}</span>
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
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <button
          onClick={onPublish}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
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

  const [textContent, setTextContent] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [voiceDescription, setVoiceDescription] = useState("");

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [privacy, setPrivacy] = useState<PrivacyOption>("private");
  const [diaryDate, setDiaryDate] = useState(new Date());
  const [useLocation, setUseLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  // ⭐️ 날씨 상태 추가 (기본값: '맑음')
  const [selectedWeather, setSelectedWeather] = useState<WeatherOption>(weatherOptions[0]);
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionOption[]>([]);


  const handlePublish = () => {
    console.log("--- 최종 발행 데이터 ---", {
      type: activeTab,
      textContent,
      photoFile,
      photoDescription,
      videoFile,
      videoDescription,
      audioBlob,
      voiceDescription,
      privacy,
      diaryDate,
      useLocation,
      currentLocation,
      selectedWeather: selectedWeather.name, // ⭐️ 날씨 데이터 추가
      selectedEmotions: selectedEmotions.map(e => e.name), // 이름만 추출하여 전송
    });
    alert("일기가 발행되었습니다! (콘솔 로그 확인)");
    setIsSettingsModalOpen(false); // 발행 후 모달 닫기
  };

  const isNextEnabled = (): boolean => {
    switch (activeTab) {
      case "text":
        return textContent.trim() !== "";
      case "photo":
        return photoFile !== null || photoDescription.trim() !== "";
      case "video":
        return videoFile !== null || videoDescription.trim() !== "";
      case "voice":
        return audioBlob !== null || voiceDescription.trim() !== "";
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

      <main className="pt-16 px-4">
        {/* 1. 콘텐츠 타입 선택 */}
        <DiaryTypeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 2. 콘텐츠 작성 영역 */}
        <div className="mb-6">
          {activeTab === "text" && (
            <TextEditorTab
              content={textContent}
              onContentChange={setTextContent}
            />
          )}
          {activeTab === "photo" && (
            <PhotoUploadTab
              description={photoDescription}
              onDescriptionChange={setPhotoDescription}
              onPhotoChange={setPhotoFile}
            />
          )}
          {activeTab === "video" && (
            <VideoUploadTab
              description={videoDescription}
              onDescriptionChange={setVideoDescription}
              onVideoChange={setVideoFile}
            />
          )}
          {activeTab === "voice" && (
            <VoiceRecordTab
              description={voiceDescription}
              onDescriptionChange={setVoiceDescription}
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
            onPublish={handlePublish}
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
