import React from 'react';

export default function AgitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-14">
      {children}
    </div>
  );
}