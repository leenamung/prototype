import React from 'react';

const SkeletonProfileTabs = () => {
  return (
    <div className="bg-white sticky top-14 z-10 border-b border-gray-200 shadow-sm animate-pulse">
      <div className="flex px-4 h-12">
        <div className="py-3 px-2 mr-6 flex items-center"><div className="h-4 w-20 bg-gray-200 rounded"></div></div>
        <div className="py-3 px-2 mr-6 flex items-center"><div className="h-4 w-12 bg-gray-200 rounded"></div></div>
        <div className="py-3 px-2 mr-6 flex items-center"><div className="h-4 w-20 bg-gray-200 rounded"></div></div>
      </div>
    </div>
  );
};
export default SkeletonProfileTabs;