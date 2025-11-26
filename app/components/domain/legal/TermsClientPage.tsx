"use client";
import React from 'react';
import LegalContent from './LegalContent';

const TermsClientPage = () => {
  return (
    <LegalContent title="이용약관" effectiveDate="2025년 9월 25일">
      <section>
        <h3 className="text-base font-bold mb-2">제 1조 (목적)</h3>
        <p>
          본 약관은 &apos하루의 조각&apos(이하 &apos서비스&apos)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
      </section>
      <section>
        <h3 className="text-base font-bold mb-2">제 2조 (정의)</h3>
        <p>
          1. &quot서비스&quot란 구현되는 단말기와 상관없이 회원이 이용할 수 있는 하루의 조각 및 관련 제반 서비스를 의미합니다.<br/>
          2. &quot회원&quot이란 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
        </p>
      </section>
      <section>
        <h3 className="text-base font-bold mb-2">제 3조 (회원의 의무)</h3>
        <p>
          회원은 다음 행위를 하여서는 안 됩니다. 타인의 정보를 도용하는 행위, 다른 회원의 개인정보를 무단으로 수집하는 행위, 서비스의 안정적 운영을 방해하는 행위 등.
        </p>
      </section>
    </LegalContent>
  );
};

export default TermsClientPage;