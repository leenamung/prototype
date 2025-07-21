"use client";

import React from 'react';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange, ariaLabel }) => {
  return (
    <label htmlFor={id} className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="sr-only peer" // Hide default checkbox but keep it accessible
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel}
      />
      {/* Custom styled toggle switch */}
      <div 
        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary)]/50 
                   rounded-full peer dark:bg-gray-700 
                   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                   peer-checked:after:border-white after:content-[''] 
                   after:absolute after:top-[2px] after:start-[2px] 
                   after:bg-white after:border-gray-300 after:border after:rounded-full 
                   after:h-5 after:w-5 after:transition-all 
                   dark:border-gray-600 peer-checked:bg-[var(--color-primary)]"
      ></div>
    </label>
  );
};

export default ToggleSwitch;
