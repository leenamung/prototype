// app/components/domain/diary/EmotionPaletteBar.tsx
import { DiaryEntry } from "@/app/data/diaryEntries";

const EmotionPaletteBar: React.FC<{
  selectedEmotions: DiaryEntry['selectedEmotions'];
}> = ({ selectedEmotions }) => {
  const getBarStyle = () => {
    const colors = selectedEmotions.map(e => e.color);
    if (colors.length === 0) return { display: 'none' };
    if (colors.length === 1) return { backgroundColor: colors[0] };
    return { backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` };
  };

  return (
    <div className="h-2 w-full" style={getBarStyle()}></div>
  );
};

export default EmotionPaletteBar;