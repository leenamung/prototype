import React from 'react';

// 섹션별 스켈레톤 UI
const SkeletonSettingsSection = ({ type = 'input' as 'input' | 'textarea' | 'image' | 'radio', lines = 1 }) => (
  <div className="space-y-3">
    {/* Label */}
    <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
    
    {type === 'input' && <div className="h-12 w-full bg-gray-200 rounded-lg"></div>}
    
    {type === 'textarea' && (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`h-4 ${i === lines - 1 ? 'w-4/5' : 'w-full'} bg-gray-200 rounded-md`}></div>
        ))}
      </div>
    )}
    
    {type === 'image' && <div className="w-full aspect-[10/3] rounded-xl bg-gray-200"></div>}
    
    {type === 'radio' && (
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-gray-200 mr-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const SkeletonAgitSettingsClientPage = () => {
  return (
    <main className="pt-20 px-5 space-y-8 animate-pulse">
      {/* 1. 이미지 설정 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-xl bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-3 w-32 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <SkeletonSettingsSection type="image" />
      </section>

      {/* 2. 기본 정보 설정 */}
      <section className="space-y-6">
        <SkeletonSettingsSection type="input" /> {/* 이름 */}
        <SkeletonSettingsSection type="textarea" lines={3} /> {/* 설명 */}
        <SkeletonSettingsSection type="textarea" lines={4} /> {/* 규칙 */}
      </section>
      
      {/* 3. 정책 설정 */}
      <section className="space-y-6">
        <SkeletonSettingsSection type="radio" lines={2} /> {/* 공개 설정 */}
        <SkeletonSettingsSection type="radio" lines={2} /> {/* 가입 방식 */}
        <SkeletonSettingsSection type="radio" lines={3} /> {/* 아지트 규모 */}
      </section>

      {/* 4. 위험 구역 */}
      <section className="pt-6 border-t border-gray-200">
        <div className="h-12 w-full bg-gray-200 rounded-lg"></div> {/* 삭제 버튼 */}
      </section>
    </main>
  );
};

export default SkeletonAgitSettingsClientPage;