import React from 'react';

const SkeletonDiaryDetailLoading = () => {
  return (
    <div className="bg-[var(--color-background)] min-h-screen animate-pulse">
      {/* Skeleton Navigation Bar */}
      <div className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] z-20">
        <div className="flex items-center justify-between px-4 py-3 h-14">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>

      <main className="pt-20 pb-10 px-4">
        {/* Skeleton Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
            <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>

        {/* Skeleton Interactions */}
        <div className="mt-6 px-2">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-7 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-7 w-16 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
        </div>
      </main>
    </div>
  );
};

export default SkeletonDiaryDetailLoading;