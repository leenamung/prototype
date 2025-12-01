import React from 'react';

interface LegalContentProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

const LegalContent: React.FC<LegalContentProps> = ({ title, effectiveDate, children }) => {
  return (
    <main className="bg-[var(--color-component-bg)] min-h-full px-5 py-6">
      <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">{title}</h2>
      <p className="text-sm text-[var(--text-subtle)] mb-8">
        시행일자: {effectiveDate}
      </p>
      <div className="space-y-6 text-[var(--text-main)] leading-relaxed">
        {children}
      </div>
    </main>
  );
};

export default LegalContent;