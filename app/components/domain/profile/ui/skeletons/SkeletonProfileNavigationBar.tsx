import React from 'react';

const SkeletonProfileNavigationBar = () => {
  return (
    <div className="flex-none w-full bg-white shadow-sm z-20 h-14 animate-pulse">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};
export default SkeletonProfileNavigationBar;