import React from 'react';
import LegalNavigationBar from './LegalNavigationBar';

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, effectiveDate, children }) => {
  return (
    <>
      <LegalNavigationBar title={title} />
      <main className="pt-14 bg-[var(--color-component-bg)] min-h-screen">
        <div className="px-5 py-6">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">{title}</h2>
          <p className="text-sm text-[var(--text-subtle)] mb-8">
            시행일자: {effectiveDate}
          </p>
          <div className="space-y-6 text-[var(--text-main)] leading-relaxed">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default LegalPageLayout;