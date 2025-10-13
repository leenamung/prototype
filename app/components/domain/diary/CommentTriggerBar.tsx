// app/components/domain/diary/CommentTriggerBar.tsx
import { DiaryEntry } from "@/app/data/diaryEntries";
import Image from "next/image";
import Link from "next/link";

interface CommentTriggerBarProps {
    author: DiaryEntry['author'];
    commentCount: number;
    onTriggerClick: () => void;
}

const CommentTriggerBar: React.FC<CommentTriggerBarProps> = ({ author, commentCount, onTriggerClick }) => {
    return (
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
            <div className="flex justify-between items-center">
                <Link href={`/profile/${author.name}`} className="flex items-center group">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                        <Image src={author.profileImage} alt={author.name} width={32} height={32} />
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-main)] group-hover:underline">{author.name}</span>
                </Link>
                <button 
                    onClick={onTriggerClick} 
                    className="text-sm text-[var(--text-subtle)] font-medium px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 transition-colors"
                >
                    댓글 {commentCount}개 모두 보기
                </button>
            </div>
        </div>
    );
}

export default CommentTriggerBar;