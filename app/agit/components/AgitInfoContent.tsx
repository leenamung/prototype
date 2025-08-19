"use client";

import Image from 'next/image';
import React from 'react';

interface AgitInfoContentProps {
  description: string;
  rules: string[];
  admin: {
    name: string;
    profileImage: string;
    adminSince: string;
  };
  creationDate: string;
  meetingCycle: string;
}

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  // 카드 배경색 변경 (또는 var(--color-sub-beige) 등 사용)
  <div className="bg-[var(--color-component-bg)] rounded-lg shadow-sm p-5 mb-4 border border-[var(--color-border)]">
    {/* 섹션 제목 텍스트 색상 변경 */}
    <h3 className="text-base font-semibold text-[var(--text-main)] mb-3">{title}</h3>
    {children}
  </div>
);

const AgitInfoContent: React.FC<AgitInfoContentProps> = ({
  description,
  rules,
  admin,
  creationDate,
  meetingCycle,
}) => {
  return (
    <div className="p-4">
      <InfoSection title="아지트 소개">
        {/* 본문 텍스트 색상 변경 */}
        <p className="text-sm text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">{description}</p>
      </InfoSection>

      <InfoSection title="모임 규칙">
        {/* 리스트 아이템 텍스트 색상 변경 */}
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--text-main)]">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </InfoSection>

      <InfoSection title="관리자 정보">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-[var(--color-border)] overflow-hidden mr-4 flex-shrink-0">
            <Image src={admin.profileImage} alt={`${admin.name} 프로필`} className="w-full h-full object-cover" width={48} height={48} />
          </div>
          <div>
            {/* 관리자 이름 텍스트 색상 변경 */}
            <p className="font-medium text-sm text-[var(--text-main)]">{admin.name}</p>
            {/* 부가 정보 텍스트 색상 변경 */}
            <p className="text-xs text-[var(--text-subtle)]">{admin.adminSince}</p>
          </div>
        </div>
      </InfoSection>

      <InfoSection title="아지트 정보">
        <div className="space-y-2 text-sm">
          <p className="flex justify-between py-1.5 border-b border-[var(--color-border)]">
            <span className="text-[var(--text-subtle)]">생성일</span>
            <span className="text-[var(--text-main)]">{creationDate}</span>
          </p>
          <p className="flex justify-between py-1.5">
            <span className="text-[var(--text-subtle)]">모임 주기</span>
            <span className="text-[var(--text-main)]">{meetingCycle}</span>
          </p>
        </div>
      </InfoSection>
    </div>
  );
};

export default AgitInfoContent;
