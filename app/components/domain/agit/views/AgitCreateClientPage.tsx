"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import CreateSelection from '../features/Create/CreateSelection';
import CreateClubForm from '../features/Create/CreateClubForm';
import CreateDiaryForm from '../features/Create/CreateDiaryForm';

export default function AgitCreateClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 쿼리로 단계(Step) 제어
  const typeParam = searchParams.get('type');
  const step = (typeParam === 'diary' || typeParam === 'club') ? typeParam : 'select';

  const handleTypeSelect = (selectedType: 'diary' | 'club') => {
    // URL을 변경하여 브라우저 히스토리에 쌓음 -> 뒤로가기 시 선택 화면으로 복귀 가능
    router.push(`/agit/create?type=${selectedType}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 메인 컨텐츠 전환 영역 */}
      <AnimatePresence mode="wait">
        {step === 'select' && <CreateSelection onSelect={handleTypeSelect} />}
        {step === 'club' && <CreateClubForm />}
        {step === 'diary' && <CreateDiaryForm />}
      </AnimatePresence>
    </div>
  );
}