// components/StoryItem.tsx
"use client";

import Image from "next/image";

interface StoryItemProps {
  userProfile: string;
  userName: string;
}

const StoryItem: React.FC<StoryItemProps> = ({ userProfile, userName }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // 이미지 로드 실패 시 대체 이미지 처리
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "https://placehold.co/60x60/E2E8F0/A0AEC0?text=U";
  };

  return (
    <div className="flex flex-col items-center flex-shrink-0 w-20">
      {/* 1. 바깥 Div: 그라데이션 테두리 역할 */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-accent-yellow)] to-[var(--color-primary)] p-0.5">
        <div className="w-full h-full bg-[var(--color-component-bg)] rounded-full p-[2px]">
          <div className="w-full h-full overflow-hidden rounded-full">
           <Image
              src={userProfile}
              alt={`${userName}의 스토리`}
              className="object-cover w-full h-full"
              onError={handleImageError}
              width={64}
              height={64}
            />
          </div>
        </div>
      </div>
      <p className="mt-1 text-xs text-center truncate w-full">{userName}</p>
    </div>
  );
};

export default StoryItem;