"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Components
import WeatherSelectionModal, { WeatherOption, weatherOptions } from "@/app/components/domain/write/features/Options/WeatherSelectionModal";
import { Emotion } from "@/app/data/emotionData";
import DatePickerModal from "@/app/components/domain/write/features/Options/DatePickerModal";
import DiaryTypeTabs, { DiaryType } from "@/app/components/domain/write/features/Options/DiaryTypeTabs";
import WriteNavigationBar from "@/app/components/domain/write/layout/WriteNavigationBar";
import TextEditorTab from "@/app/components/domain/write/features/Editor/TextEditorTab";
import PhotoUploadTab from "@/app/components/domain/write/features/Editor/PhotoUploadTab";
import VideoUploadTab from "@/app/components/domain/write/features/Editor/VideoUploadTab";
import VoiceRecordTab from "@/app/components/domain/write/features/Editor/VoiceRecordTab";
import EmotionSelector from "@/app/components/domain/write/features/Options/EmotionSelector";
import MixedEmotionIcon from "@/app/components/domain/write/components/MixedEmotionIcon";

// [NEW] 분리된 컴포넌트 임포트
import PublishSettingsSheet, { PrivacyOption } from "@/app/components/domain/write/features/Publish/PublishSettingsSheet";

export default function WriteClientPage() {
  // --- States ---
  const [activeTab, setActiveTab] = useState<DiaryType>("text");
  
  // Meta Data
  const [diaryDate, setDiaryDate] = useState(new Date());
  const [selectedWeather, setSelectedWeather] = useState<WeatherOption>(weatherOptions[0]);
  const [privacy, setPrivacy] = useState<PrivacyOption>("public");
  const [diaryTitle, setDiaryTitle] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  // Content Data
  const [diaryContent, setDiaryContent] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);

  // Modals
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);

  useEffect(() => {
    // 탭을 옮기면 기존에 선택/녹음했던 파일들은 날려줍니다.
    setPhotoFile(null);
    setVideoFile(null);
    setAudioBlob(null);
  }, [activeTab]);
  
  // --- Helpers ---
  const formatDateDisplay = (date: Date) => `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  
  // [수정] 배경색 계산 로직 개선
  const getGradientStyles = () => {
    if (!selectedEmotions || selectedEmotions.length === 0) {
      // [핵심 Fix] 'transparent' 대신 '#ffffff'(흰색)을 사용하여
      // 0개 -> 1개 선택 시 색상이 부드럽게 섞이도록 수정 (번쩍임 방지)
      return { borderBackground: 'var(--color-border)', textureBackground: '#ffffff' };
    }
    const borderColors = selectedEmotions.map(e => `var(--emotion-${e.key}-border, var(--color-border))`);
    const borderGradient = borderColors.length > 1 ? `linear-gradient(135deg, ${borderColors.join(', ')})` : borderColors[0];
    const textureColors = selectedEmotions.map(e => `var(--emotion-${e.key})`);
    const textureGradient = textureColors.length > 1 ? `linear-gradient(135deg, ${textureColors.join(', ')})` : textureColors[0];
    return { borderBackground: borderGradient, textureBackground: textureGradient };
  };
  
  const styles = getGradientStyles();

  const handleNextStep = () => setIsSettingsSheetOpen(true);
  
  const handlePublish = () => {
    setIsSettingsSheetOpen(false);
    console.log("최종 발행 데이터:", { diaryTitle, privacy, useLocation, diaryContent });
    alert("소중한 하루가 기록되었습니다.");
    
    // vercel 빌드를 위한 임시 선언 사용
    setCurrentLocation(null);
    console.log(photoFile?.size);
    console.log(videoFile?.size);
    console.log(audioBlob?.size);
  };

  const isContentReady = () => {
      switch (activeTab) {
      case "text":
        return diaryContent.trim().length > 0;
      case "photo":
        return photoFile !== null;
      case "video":
        return videoFile !== null;
      case "voice":
        return audioBlob !== null;
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-[var(--color-background)]">
      <div className="noise-background fixed inset-0 z-0 pointer-events-none opacity-60" />

      <WriteNavigationBar 
        actionText={isSettingsSheetOpen ? "간직하기" : "마무리하기"}
        onAction={isSettingsSheetOpen ? handlePublish : handleNextStep}
        isActionDisabled={!isContentReady()}
        onBack={isSettingsSheetOpen ? () => setIsSettingsSheetOpen(false) : undefined}
      />

      <main className="flex-1 overflow-y-auto px-4 py-6 relative z-10 scrollbar-hide">
        {/* === Diary Card (Write Mode) === */}
        {/* [수정] div -> motion.div 교체 & animate 속성 사용 */}
        <motion.div 
            className="relative w-full rounded-hand-drawn shadow-sm overflow-hidden min-h-[350px] flex flex-col mb-6"
            // [핵심 Fix] style 대신 animate를 사용하여 Framer Motion이 색상 보간을 처리하게 함
            animate={{ background: styles.borderBackground, padding: '2px' }}
            transition={{ duration: 0.5 }}
        >
           <div className="relative w-full h-full bg-white rounded-hand-drawn overflow-hidden flex flex-col flex-1 clip-radius-fix">
               {/* [수정] div -> motion.div 교체 & animate 속성 사용 */}
               <motion.div 
                  className="rubbed-pastel-layer absolute inset-0 z-0 opacity-70" 
                  // [핵심 Fix] 여기서도 animate 사용. 
                  // 0개일 때 '#ffffff' -> 1개일 때 'color'로 부드럽게 변함
                  animate={{ background: styles.textureBackground }}
                  transition={{ duration: 0.5 }}
               />
               
               <div className="relative z-20 flex flex-col flex-1">
                   {/* Card Header */}
                   <div className="px-6 pt-6 pb-2 border-b border-[var(--color-border)]/30 border-dashed flex items-start justify-between">
                        <div className="flex items-center gap-3 mt-1">
                            <button onClick={() => setIsDatePickerOpen(true)} className="font-maru-buri text-[15px] font-bold text-[var(--text-main)] hover:text-[var(--color-primary-dark)] transition-colors flex items-center gap-1 active:scale-95">
                                {formatDateDisplay(diaryDate)}
                            </button>
                            <span className="text-[var(--color-border)]/80">|</span>
                            <button onClick={() => setIsWeatherModalOpen(true)} className="text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1 active:scale-95">
                                <i className={`${selectedWeather.icon}`}></i>
                            </button>
                        </div>
                        <div className="w-10 h-10 -mt-1 -mr-2">
                             <AnimatePresence>
                                {selectedEmotions.length > 0 && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                        <MixedEmotionIcon colors={selectedEmotions.map(e => `var(--emotion-${e.key})`)} />
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </div>
                   </div>

                   {/* Card Body */}
                   <div className="px-5 py-4 flex-1 flex flex-col">
                        <div className="mb-2"><DiaryTypeTabs activeTab={activeTab} onTabChange={setActiveTab} /></div>
                        <div className="flex-1 min-h-[12rem]">
                            {activeTab === "text" && <TextEditorTab content={diaryContent} onContentChange={setDiaryContent} />}
                            {activeTab === "photo" && <PhotoUploadTab content={diaryContent} onContentChange={setDiaryContent} onPhotoChange={setPhotoFile} />}
                            {activeTab === "video" && <VideoUploadTab content={diaryContent} onContentChange={setDiaryContent} onVideoChange={setVideoFile} />}
                            {activeTab === "voice" && <VoiceRecordTab content={diaryContent} onContentChange={setDiaryContent} onAudioRecordingChange={setAudioBlob} />}
                        </div>
                   </div>
               </div>
           </div>
        </motion.div>
        
        {/* Emotion Palette */}
        <div className="mb-10 px-2">
          <EmotionSelector selectedEmotions={selectedEmotions} onEmotionChange={setSelectedEmotions} />
        </div>
      </main>

      {/* === [Separated Component] Publish Settings Sheet === */}
      <PublishSettingsSheet
        isOpen={isSettingsSheetOpen}
        onClose={() => setIsSettingsSheetOpen(false)} // Dim 클릭 시 닫힘
        // State Passing
        diaryTitle={diaryTitle}
        setDiaryTitle={setDiaryTitle}
        privacy={privacy}
        setPrivacy={setPrivacy}
        useLocation={useLocation}
        setUseLocation={setUseLocation}
        currentLocation={currentLocation}
        diaryDate={diaryDate}
        selectedWeather={selectedWeather}
        onDateClick={() => setIsDatePickerOpen(true)}
        onWeatherClick={() => setIsWeatherModalOpen(true)}
      />
      
      {/* Pickers */}
      <WeatherSelectionModal isOpen={isWeatherModalOpen} onClose={() => setIsWeatherModalOpen(false)} onWeatherSelect={setSelectedWeather} />
      <DatePickerModal isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} currentSelectedDate={diaryDate} onDateSelect={setDiaryDate} />

    </div>
  );
}