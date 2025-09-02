// app/profile/components/SkeletonProfileHeader.tsx (생성 또는 유지)

import React from 'react';

const SkeletonProfileHeader = () => {
  return (
    <div className="pt-14 pb-4 px-4 bg-white animate-pulse">
      <div className="flex flex-col items-center mt-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-4/5 bg-gray-200 rounded mb-1"></div>
        <div className="h-4 w-3/5 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-1/5 bg-gray-200 rounded mb-4"></div>
        <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};
export default SkeletonProfileHeader;