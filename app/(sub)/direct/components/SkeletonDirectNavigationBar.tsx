// app/direct/components/SkeletonDirectNavigationBar.tsx (새 파일)

import React from 'react';

const SkeletonDirectNavigationBar = () => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20 animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SkeletonDirectNavigationBar;