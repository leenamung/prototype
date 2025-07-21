"use client";

import StoryList from "./StoryList";

interface StoryCarouselProps {}

const StoryCarousel: React.FC<StoryCarouselProps> = () => {
  const placeholderImage = "https://placehold.co/40x40/E2E8F0/A0AEC0?text=U";
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = placeholderImage;
  };

  return (
    <div>
      <StoryList />
    </div>
  );
};

export default StoryCarousel;
