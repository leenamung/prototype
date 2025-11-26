
"use client";
import React from 'react';
import LegalContent from './LegalContent';

const PrivacyClientPage = () => {
  return (
    <LegalContent title="개인정보 처리방침" effectiveDate="2025년 9월 25일">
      <section>
        <h3 className="text-base font-bold mb-2">1. 총칙</h3>
        <p>
          &apos;하루의 조각&apos;(이하 &apos;회사&apos;)은 이용자의 개인정보를 중요시하며, &quot정보통신망 이용촉진 및 정보보호&quot에 관한 법률을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
        </p>
      </section>
      <section>
        <h3 className="text-base font-bold mb-2">2. 수집하는 개인정보 항목</h3>
        <p>
          회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
          <br/>- 필수항목 : 이메일, 비밀번호, 닉네임
          <br/>- 선택항목 : 프로필 사진, 자기소개
        </p>
      </section>
      <section>
        <h3 className="text-base font-bold mb-2">3. 개인정보의 보유 및 이용기간</h3>
        <p>
          원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
        </p>
      </section>
    </LegalContent>
  );
};

export default PrivacyClientPage;