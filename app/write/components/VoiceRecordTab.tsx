// app/write/components/VoiceRecordTab.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

interface VoiceRecordTabProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onAudioRecordingChange: (audioBlob: Blob | null) => void; // For actual recording
}

const VoiceRecordTab: React.FC<VoiceRecordTabProps> = ({ description, onDescriptionChange, onAudioRecordingChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);


  // Simulate recording time for UI
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0'); // 'seconds'로 정의됨
    return `${minutes}:${seconds}`; // ✨ 수정된 부분: 'secs' -> 'seconds'
  };

  const startRecording = async () => {
    // Actual recording logic (requires browser permissions)
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' }); // Specify MIME type
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudioUrl(audioUrl);
            onAudioRecordingChange(audioBlob);
            stream.getTracks().forEach(track => track.stop()); // Stop mic access after recording stops
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setRecordingTime(0);
        setRecordedAudioUrl(null); // Clear previous recording
    } catch (err) {
        console.error("Error starting recording:", err);
        // Provide user feedback if permission is denied or another error occurs
        if (err instanceof DOMException && err.name === "NotAllowedError") {
            alert("마이크 접근 권한이 필요합니다. 브라우저 설정에서 마이크 권한을 허용해주세요.");
        } else {
            alert("녹음을 시작하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
    }
    setIsRecording(false); // This will also clear the interval via useEffect
  };

  const handleDeleteRecording = () => {
    if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl); // Clean up object URL
    }
    setRecordedAudioUrl(null);
    setRecordingTime(0);
    onAudioRecordingChange(null);
    // Ensure recording state is also reset if needed
    if (isRecording) {
        stopRecording(); // If somehow delete is pressed while recording (though UI prevents this)
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Show record button if not recording and no recording exists */}
      {!isRecording && !recordedAudioUrl && (
        <div
          onClick={startRecording}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer mb-4 hover:border-[var(--color-primary)] transition-colors"
          role="button" // Accessibility
          tabIndex={0} // Accessibility
          onKeyDown={(e) => e.key === 'Enter' && startRecording()} // Accessibility
        >
          <i className="ri-mic-line ri-2x text-gray-400 mb-2 w-12 h-12 flex items-center justify-center"></i>
          <p className="text-gray-500 text-sm text-center">클릭하여 녹음 시작</p>
        </div>
      )}

      {/* Show recording UI if currently recording */}
      {isRecording && (
        <div className="mb-4">
          <div className="bg-[#FFFAF0] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-mono" aria-live="polite">{formatTime(recordingTime)}</span>
              <button
                onClick={stopRecording}
                className="bg-red-500 text-white rounded-full p-2 cursor-pointer hover:bg-red-600 transition-colors"
                aria-label="녹음 중지"
              >
                <i className="ri-stop-fill ri-lg w-5 h-5 flex items-center justify-center"></i>
              </button>
            </div>
            {/* Animated waveform (visual only) */}
            <div className="h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden" aria-hidden="true">
              <div className="flex items-end h-8 space-x-1 animate-pulse">
                {/* Generating a few bars for visual effect */}
                {[3,5,8,4,6,2,7,4,3,5,8,4,6,2,7,4,3,5,8,4,6,2,7,4,3,5,8,4,6,2,7,4].map((h, i) => (
                  <div key={i} className={`w-1 bg-[var(--color-primary)] rounded-full`} style={{ height: `${h*3}px`, animationDelay: `${i*50}ms`}}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show audio player if a recording exists and not currently recording */}
      {recordedAudioUrl && !isRecording && (
        <div className="mb-4">
          <div className="bg-[#FFFAF0] rounded-lg p-4">
            <audio controls src={recordedAudioUrl} className="w-full mb-2">
                Your browser does not support the audio element.
            </audio>
            <div className="flex justify-end">
                <button
                    onClick={handleDeleteRecording}
                    className="bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300 transition-colors"
                    aria-label="녹음 삭제"
                >
                    <i className="ri-delete-bin-line ri-lg w-5 h-5 flex items-center justify-center"></i>
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Textarea for description */}
      <textarea
        className="w-full bg-[#FFFAF0] p-3 rounded-lg border-none focus:ring-1 focus:ring-[var(--color-primary)] outline-none text-gray-800 text-sm h-24 resize-none"
        placeholder="음성 메모에 대한 설명을 입력하세요"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
    </div>
  );
};

export default VoiceRecordTab;
