"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToggleSwitch from "@/app/components/domain/common/ToggleSwitch";
import LocationDisplay from "@/app/components/domain/write/features/Options/LocationDisplay";
import ExchangeDiaryOptions from "@/app/components/domain/write/features/Options/ExchangeDiaryOptions";
import AgitOptions from "@/app/components/domain/write/features/Options/AgitOptions";
import { WeatherOption } from "@/app/components/domain/write/features/Options/WeatherSelectionModal";

export type PrivacyOption = "private" | "friends" | "group" | "public" | "exchange";

const privacyOptionsMap: Record<PrivacyOption, { text: string; icon: string; description: string }> = {
  public: { text: "모두에게 공개", icon: "ri-earth-line", description: "누구나 이 기록을 볼 수 있어요" },
  friends: { text: "친구들과 공유", icon: "ri-user-smile-line", description: "서로 친구인 사람들에게만 보여요" },
  group: { text: "아지트 멤버만", icon: "ri-home-heart-line", description: "우리 아지트 멤버들끼리만 공유해요" },
  exchange: { text: "교환일기 쓰기", icon: "ri-book-read-line", description: "일기장을 함께 쓰는 친구들만 봐요" },
  private: { text: "나만 보기", icon: "ri-lock-line", description: "나만 볼 수 있는 비밀 기록이에요" },
};

interface PublishSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  diaryTitle: string;
  setDiaryTitle: (title: string) => void;
  privacy: PrivacyOption;
  setPrivacy: (privacy: PrivacyOption) => void;
  useLocation: boolean;
  setUseLocation: (use: boolean) => void;
  currentLocation: string | null;
  diaryDate: Date;
  selectedWeather: WeatherOption;
  onDateClick: () => void;
  onWeatherClick: () => void;
}

const PublishSettingsSheet: React.FC<PublishSettingsSheetProps> = ({
  isOpen,
  onClose,
  diaryTitle,
  setDiaryTitle,
  privacy,
  setPrivacy,
  useLocation,
  setUseLocation,
  currentLocation,
  diaryDate,
  selectedWeather,
  onDateClick,
  onWeatherClick,
}) => {
  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  const formatDate = (date: Date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dim Background (Optional: 네비게이션바 아래쪽만 어둡게 처리) */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
            style={{ top: '57px' }} // 네비바 아래부터 시작
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Settings Sheet */}
          <motion.div
            className="fixed inset-x-0 z-40 bg-[#FDFBF7] flex flex-col shadow-inner"
            // [위치 조정] 네비게이션 바(57px) 바로 아래에 붙음
            style={{ top: '57px', height: 'calc(100vh - 57px)' }}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Texture */}
            <div className="rubbed-pastel-layer absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply" />

            {/* Header Title (핸들바 삭제됨) */}
            <div className="relative z-10 px-6 pt-8 pb-4 flex-shrink-0">
              <h2 className="font-maru-buri font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                <i className="ri-settings-5-line opacity-50 text-lg"></i>
                기록 보관 설정
              </h2>
            </div>

            {/* Content Body */}
            <div className="flex-grow overflow-y-auto px-6 pb-24 space-y-8 relative z-10 scrollbar-hide">
              
              {/* 1. Date & Weather */}
              <div className="space-y-2">
                 <label className="block text-xs font-gowun-dodum text-[var(--text-subtle)] ml-0.5">
                    기록의 순간
                 </label>
                 <div className="flex gap-3">
                    <button onClick={onDateClick} className="flex-1 flex items-center justify-between p-4 bg-white/60 border border-[var(--color-border)] rounded-[20px] backdrop-blur-sm shadow-sm hover:bg-white active:scale-[0.98] transition-all text-left">
                        <div className="flex flex-col">
                             <span className="text-[10px] text-[var(--text-subtle)] font-gowun-dodum mb-0.5">날짜</span>
                             <span className="font-maru-buri font-bold text-[var(--text-main)] text-sm">{formatDate(diaryDate)}</span>
                        </div>
                        <i className="ri-calendar-check-line text-[var(--color-primary)] text-xl opacity-80"></i>
                    </button>

                    <button onClick={onWeatherClick} className="flex-1 flex items-center justify-between p-4 bg-white/60 border border-[var(--color-border)] rounded-[20px] backdrop-blur-sm shadow-sm hover:bg-white active:scale-[0.98] transition-all text-left">
                        <div className="flex flex-col">
                             <span className="text-[10px] text-[var(--text-subtle)] font-gowun-dodum mb-0.5">날씨</span>
                             <span className="font-gowun-dodum font-bold text-[var(--text-main)] text-sm truncate pr-2">{selectedWeather.label}</span>
                        </div>
                        <i className={`${selectedWeather.icon} text-[var(--text-subtle)] text-xl`}></i>
                    </button>
                 </div>
              </div>

              {/* 2. Title Input */}
              <div className="group space-y-2">
                <label 
                  htmlFor="diary-title-input" // [수정] 라벨 클릭 시 인풋 포커스 연결
                  className="block text-xs font-gowun-dodum text-[var(--color-primary)] ml-0.5 transition-colors group-focus-within:text-[var(--color-primary-dark)] cursor-pointer"
                >
                  제목 붙이기
                </label>
                <div className="relative">
                    <input
                      id="diary-title-input" // [수정] 라벨과 연결되는 ID 부여
                      type="text"
                      value={diaryTitle}
                      onChange={(e) => setDiaryTitle(e.target.value)}
                      // [수정] 감성적인 한 줄 요약 권유
                      placeholder="오늘의 마음에 이름을 붙여주세요 (비워둬도 좋아요)"
                      className="w-full bg-transparent border-b-2 border-[var(--color-border)] py-2 
                                  font-maru-buri text-xl font-bold text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/40
                                  focus:outline-none focus:border-[var(--color-primary)] transition-all rounded-none"
                    />
                </div>
              </div>

              {/* 3. Privacy Dropdown */}
              <div className="relative z-30 space-y-2">
                <label className="block text-xs font-gowun-dodum text-[var(--text-subtle)] ml-0.5">
                  공개 설정
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)}
                    className={`
                        w-full flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-[20px] 
                        border shadow-sm transition-all active:scale-[0.99]
                        ${isPrivacyDropdownOpen ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]" : "border-[var(--color-border)]"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-subtle-bg)] flex items-center justify-center text-[var(--text-subtle)]">
                        <i className={`${privacyOptionsMap[privacy].icon} ri-lg`}></i>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-pretendard text-sm font-medium text-[var(--text-main)]">{privacyOptionsMap[privacy].text}</span>
                        <span className="text-[10px] text-[var(--text-subtle)] opacity-70">{privacyOptionsMap[privacy].description}</span>
                      </div>
                    </div>
                    <i className={`ri-arrow-down-s-line text-[var(--text-subtle)] transition-transform ${isPrivacyDropdownOpen ? "rotate-180" : ""}`}></i>
                  </button>

                  <AnimatePresence>
                    {isPrivacyDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.98 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border)] rounded-[20px] shadow-xl overflow-hidden z-50"
                      >
                        {(Object.keys(privacyOptionsMap) as PrivacyOption[]).map((key) => (
                          <div
                            key={key}
                            onClick={() => { setPrivacy(key); setIsPrivacyDropdownOpen(false); }}
                            className={`p-4 text-sm cursor-pointer flex items-center gap-3 transition-colors border-b border-[var(--color-border)]/10 last:border-none hover:bg-[var(--color-subtle-bg)]`}
                          >
                            <i className={privacyOptionsMap[key].icon}></i>
                            <div className="flex flex-col">
                                <span>{privacyOptionsMap[key].text}</span>
                                <span className="text-[10px] text-[var(--text-subtle)] opacity-70 font-normal">{privacyOptionsMap[key].description}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <AnimatePresence>
                    {privacy === "exchange" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="mt-3 p-1"><ExchangeDiaryOptions /></div>
                    </motion.div>
                    )}
                    {privacy === "group" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="mt-3 p-1"><AgitOptions /></div>
                    </motion.div>
                    )}
                </AnimatePresence>
              </div>

              {/* 4. Location Toggle */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between p-4 bg-white/60 border border-[var(--color-border)] rounded-[20px] backdrop-blur-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-subtle-bg)] flex items-center justify-center text-[var(--text-subtle)]">
                        <i className="ri-map-pin-2-fill"></i>
                    </div>
                    <span className="text-sm font-gowun-dodum text-[var(--text-main)]">위치 남기기</span>
                  </div>
                  <ToggleSwitch id="location-toggle-modal" checked={useLocation} onChange={setUseLocation} ariaLabel="위치 정보 사용" />
                </div>
                
                <AnimatePresence>
                    {useLocation && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <LocationDisplay currentLocation={currentLocation || "위치 정보를 불러오는 중..."} />
                    </motion.div>
                    )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PublishSettingsSheet;