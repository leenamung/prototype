// app/components/StoryCarousel/StoryCarousel.tsx
"use client";

import StoryList from "./StoryList";

// props가 필요 없는 컴포넌트이므로 타입을 제거합니다.
const StoryCarousel: React.FC = () => {
  return (
    <div>
      <StoryList />
    </div>
  );
};

export default StoryCarousel;