"use client";
import React, { useState, useRef, useEffect } from 'react';

interface VoiceRecordTabProps {
  content: string;
  onContentChange: (content: string) => void;
  onAudioRecordingChange: (blob: Blob | null) => void;
}

const VoiceRecordTab: React.FC<VoiceRecordTabProps> = ({ content, onContentChange, onAudioRecordingChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // 실제 구현 시에는 MediaRecorder API 사용 필요. 여기서는 UI 시뮬레이션만 진행.
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleRecording = () => {
    if (isRecording) {
      // Stop Recording
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Mockup Audio Blob
      const mockBlob = new Blob(["mock"], { type: "audio/webm" });
      onAudioRecordingChange(mockBlob);
      setAudioUrl("mock_audio_url"); // 실제론 URL.createObjectURL(blob)
    } else {
      // Start Recording
      setIsRecording(true);
      setRecordingTime(0);
      setAudioUrl(null);
      onAudioRecordingChange(null);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* 1. 녹음 플레이어/레코더 영역 (컴팩트 디자인) */}
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--color-subtle-bg)]/50 border border-[var(--color-border)]/50 backdrop-blur-sm">
        
        {/* 녹음 버튼 */}
        <button
          onClick={toggleRecording}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
            ${isRecording ? 'bg-red-500 scale-110' : 'bg-[var(--color-primary)] text-white hover:opacity-90'}
          `}
        >
          {isRecording ? <i className="ri-stop-fill ri-xl text-white"></i> : <i className="ri-mic-fill ri-xl"></i>}
        </button>

        {/* 상태 표시 */}
        <div className="flex-1 flex flex-col justify-center">
            {isRecording ? (
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-maru-buri text-red-500 font-bold">녹음 중... {formatTime(recordingTime)}</span>
                </div>
            ) : audioUrl ? (
                <div className="flex items-center gap-2">
                    <i className="ri-check-double-line text-[var(--color-primary)]"></i>
                    <span className="text-sm font-gowun-dodum text-[var(--text-main)]">목소리가 담겼어요 ({formatTime(recordingTime)})</span>
                </div>
            ) : (
                <span className="text-xs font-gowun-dodum text-[var(--text-subtle)]">오늘의 목소리를 남겨보세요</span>
            )}
            
            {/* 파형 시각화 (Mockup) */}
            <div className="flex items-center gap-0.5 h-4 mt-1 opacity-50">
                {[...Array(20)].map((_, i) => (
                    <div key={i} 
                         className={`w-1 rounded-full bg-[var(--text-subtle)] transition-all duration-300 ${isRecording ? 'animate-pulse' : ''}`}
                         style={{ height: isRecording ? `${Math.random() * 100}%` : '20%' }} 
                    />
                ))}
            </div>
        </div>

        {/* 다시하기 버튼 */}
        {audioUrl && (
            <button 
                onClick={() => { setAudioUrl(null); onAudioRecordingChange(null); setRecordingTime(0); }}
                className="p-2 text-[var(--text-subtle)] hover:text-red-500 transition-colors"
            >
                <i className="ri-delete-bin-line"></i>
            </button>
        )}
      </div>

      {/* 2. 텍스트 에디터 */}
      <textarea
        className="w-full flex-1 bg-transparent text-[var(--text-main)] text-[16px] 
                   resize-none outline-none border-none p-0 focus:ring-0
                   font-pretendard font-light
                   ruled-paper-input placeholder:text-[var(--text-subtle)]/40"
        style={{ 
            minHeight: '8rem', 
            lineHeight: '2.4rem',
            backgroundSize: '100% 2.4rem',
            paddingTop: '0.1rem' 
        }}
        placeholder="목소리와 함께 남길 메모가 있나요?"
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default VoiceRecordTab;