// app/myspace/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
// Import components from the local components directory
import MySpaceNavigationBar from './components/MySpaceNavigationBar';
import FilterPanel, { ActiveFilters } from './components/FilterPanel'; // Import type for filters
import DiaryListView from './components/DiaryListView';
import DiaryGridView from './components/DiaryGridView';
import DiaryCalendarView from './components/DiaryCalendarView';
// Import data and helper functions from the local data directory
import { sampleMySpaceDiaries, MyDiaryEntry, mapPrivacyStringToType, mapDiaryTypeStringToType } from './data/mySpaceSampleData';

// Define the possible view modes
type ViewMode = 'list' | 'grid' | 'calendar';

// The main page component for "My Space"
export default function MySpacePage() {
  // State for the current view mode (list, grid, or calendar)
  const [currentView, setCurrentView] = useState<ViewMode>('list');
  // State to control the visibility of the filter panel
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  // State to hold the currently active filters
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  // Handler to change the current view mode
  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
  };

  // Handler to toggle the filter panel's visibility
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // Memoized calculation for filtered diaries based on active filters
  const filteredDiaries = useMemo(() => {
    let diariesToFilter = sampleMySpaceDiaries; // Start with all diaries

    // --- Apply Date Range Filter ---
    if (activeFilters.dateRange && activeFilters.dateRange !== '전체') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today at 00:00:00
      let startDate: Date | null = null;

      switch (activeFilters.dateRange) {
        case '최근 일주일':
          // Calculate date 7 days ago (including today)
          startDate = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000); 
          break;
        case '최근 한 달':
          // Calculate date 1 month ago
          startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
          break;
        case '올해':
          // First day of the current year
          startDate = new Date(today.getFullYear(), 0, 1);
          break;
        case '작년':
          // First day of the previous year
          startDate = new Date(today.getFullYear() - 1, 0, 1);
          // Last day of the previous year (end of day)
          const endDate = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59, 999); 
          // Filter specifically for last year range
          diariesToFilter = diariesToFilter.filter(d => d.dateObject >= startDate! && d.dateObject <= endDate);
          startDate = null; // Prevent applying the general start date filter below
          break;
      }
      // Apply the start date filter if applicable
      if (startDate) {
        diariesToFilter = diariesToFilter.filter(d => d.dateObject >= startDate!);
      }
    }

    // --- Apply Emotion Filter ---
    if (activeFilters.emotions && activeFilters.emotions.length > 0) {
      diariesToFilter = diariesToFilter.filter(d => activeFilters.emotions?.includes(d.emotion));
    }

    // --- Apply Privacy Filter ---
    if (activeFilters.privacy && activeFilters.privacy !== '전체') {
      // Map the filter string (e.g., '비공개') to the privacy type (e.g., 'private')
      const targetPrivacy = mapPrivacyStringToType(activeFilters.privacy);
      if (targetPrivacy) {
        diariesToFilter = diariesToFilter.filter(d => d.privacy === targetPrivacy);
      }
    }

    // --- Apply Diary Type Filter ---
    // Check if specific types are selected (not all 4)
    if (activeFilters.diaryTypes && activeFilters.diaryTypes.length > 0 && activeFilters.diaryTypes.length < 4) { 
      // Map filter strings (e.g., '텍스트') to type types (e.g., 'text')
      const targetTypes = activeFilters.diaryTypes.map(mapDiaryTypeStringToType).filter((t): t is MyDiaryEntry['type'] => t !== undefined); // Use type guard
      if (targetTypes.length > 0) {
        diariesToFilter = diariesToFilter.filter(d => targetTypes.includes(d.type));
      }
    }

    return diariesToFilter; // Return the final filtered array
  }, [activeFilters]); // Rerun memoization only when activeFilters changes

  // Handler to apply filters selected in the FilterPanel
  const handleApplyFilters = (filters: ActiveFilters) => {
    setActiveFilters(filters); // Update the active filters state
    setIsFilterPanelOpen(false); // Close the filter panel
  };

  // Effect to toggle body scroll based on filter panel visibility
  useEffect(() => {
    if (isFilterPanelOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when panel is open
    } else {
      document.body.style.overflow = ''; // Restore scrolling when panel is closed
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterPanelOpen]); // Rerun effect when isFilterPanelOpen changes

  // Calculate navigation bar height (adjust if necessary based on actual rendered height)
  // h-12 (48px) + h-11 (44px) + border (1px) = 93px
  const navBarHeight = "93px"; 

  return (
    // Main container with padding-top to offset the fixed navigation bar
    <div style={{ paddingTop: navBarHeight }}>
      {/* Render the navigation bar */}
      <MySpaceNavigationBar
        currentView={currentView}
        onViewChange={handleViewChange}
        onFilterToggle={toggleFilterPanel}
        // Determine if any filter (other than '전체' or empty arrays) is active
        hasActiveFilters={Object.entries(activeFilters).some(([key, value]) => {
          if (key === 'dateRange' || key === 'privacy') return value && value !== '전체';
          if (key === 'emotions' || key === 'diaryTypes') return Array.isArray(value) && value.length > 0 && (key !== 'diaryTypes' || value.length < 4); // Check if not all types are selected
          return false;
        })}
        onNewDiaryClick={() => console.log("새 일기 작성 클릭")} // Placeholder for new diary action
      />

      {/* Render the filter panel (conditionally visible) */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={toggleFilterPanel}
        onApplyFilters={handleApplyFilters}
      />

      {/* Main content area */}
      <main className="px-4 pb-4"> {/* Add horizontal and bottom padding */}
        {/* Conditionally render the appropriate view based on currentView state */}
        {currentView === 'list' && <DiaryListView diaries={filteredDiaries} />}
        {currentView === 'grid' && <DiaryGridView diaries={filteredDiaries} />}
        {currentView === 'calendar' && <DiaryCalendarView diaries={filteredDiaries} />}
      </main>
    </div>
  );
}
