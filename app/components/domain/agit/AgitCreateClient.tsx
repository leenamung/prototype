// app/components/domain/agit/AgitCreateClient.tsx

"use client";

import { useState, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AgitCreateClient() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [agitName, setAgitName] = useState('');
  const [agitDescription, setAgitDescription] = useState('');
  const [agitImage, setAgitImage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true); // true: 공개, false: 비공개
  const [joinType, setJoinType] = useState('free'); // 'free': 자유 가입, 'approval': 가입 신청
  const [maxMembers, setMaxMembers] = useState('30'); // '30', '100', 'unlimited'

  const isFormValid = agitName.trim().length >= 2; // 아지트 이름은 2자 이상 필수

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAgitImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleSubmit = () => {
    if (!isFormValid) {
      alert('아지트 이름을 2자 이상 입력해주세요.');
      return;
    }
    console.log("아지트 생성 정보:", {
      agitName,
      agitDescription,
      agitImage: !!agitImage,
      isPublic,
      joinType,
      maxMembers,
    });
    // 실제 아지트 생성 API 호출 로직
    alert(`'${agitName}' 아지트가 생성되었습니다!`);
    router.push('/main/agit');
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-[var(--color-component-bg)]/80 backdrop-blur-sm z-20 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-2 h-14">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">
            <i className="ri-arrow-left-s-line ri-xl text-[var(--text-subtle)]"></i>
          </button>
          <h1 className="font-pretendard font-semibold text-lg text-[var(--text-main)]">아지트 만들기</h1>
          <div className="w-10 h-10"></div> {/* 우측 정렬 맞춤용 */}
        </div>
      </header>

      <main className="flex-grow pt-14 pb-20 px-5 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-6"
        >
          <p className="font-maru-buri text-xl font-semibold text-[var(--text-main)] text-center">
            새로운 아지트를 만들어보세요!
          </p>
          <p className="font-pretendard text-sm text-[var(--text-subtle)] text-center mt-1">
            나와 같은 관심사를 가진 사람들과 이야기를 나눌 수 있어요.
          </p>

          {/* ✅ 아지트 대표 이미지 - 디자인 개선 */}
          <div className="mt-8 mb-8 text-center">
            <p className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">
              아지트 대표 이미지 <span className="text-[var(--text-subtle)]/70">(선택)</span>
            </p>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            <button
              onClick={triggerFileSelect}
              className="w-40 h-40 rounded-xl border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center bg-white/50 hover:border-[var(--color-primary)] transition-colors relative overflow-hidden group mx-auto"
              aria-label="아지트 대표 사진 변경"
            >
              {agitImage ? (
                <Image src={agitImage} alt="아지트 대표 이미지 미리보기" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--color-subtle-bg)]">
                  <i className="ri-image-line ri-4x text-[var(--color-border)]"></i>
                </div>
              )}
              {agitImage && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    <i className="ri-camera-line text-3xl text-white"></i>
                 </div>
              )}
            </button>
            <p className="font-pretendard text-xs text-[var(--text-subtle)] mt-2">
              아지트의 정체성을 보여주는 이미지를 등록해주세요.
            </p>
          </div>

          {/* 아지트 이름 */}
          <div className="mb-6">
            <label htmlFor="agitName" className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">
              아지트 이름 <span className="text-[var(--color-warning)]">(필수)</span>
            </label>
            <input
              id="agitName"
              type="text"
              value={agitName}
              onChange={(e) => setAgitName(e.target.value)}
              placeholder="예: 우리 동네 독서 모임"
              className="w-full bg-white text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/70 focus:outline-none p-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all font-pretendard"
            />
             {!isFormValid && agitName.length > 0 && (
                <p className="font-pretendard text-xs text-[var(--color-warning)] mt-1">
                    아지트 이름은 2자 이상 입력해주세요.
                </p>
             )}
          </div>

          {/* 아지트 설명 */}
          <div className="mb-6">
            <label htmlFor="agitDescription" className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">
              아지트 설명 <span className="text-[var(--text-subtle)]/70">(선택)</span>
            </label>
            <textarea
              id="agitDescription"
              value={agitDescription}
              onChange={(e) => setAgitDescription(e.target.value)}
              placeholder="아지트의 목표, 활동 방식 등을 자유롭게 설명해주세요."
              rows={4}
              className="w-full bg-white text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/70 focus:outline-none p-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all resize-none font-pretendard"
            />
          </div>

          {/* 공개 설정 */}
          <div className="mb-6">
            <p className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">
              공개 설정
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center font-pretendard text-[var(--text-main)]">
                <input
                  type="radio"
                  name="isPublic"
                  checked={isPublic === true}
                  onChange={() => setIsPublic(true)}
                  className="form-radio h-4 w-4 text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] mr-2"
                />
                공개
              </label>
              <label className="flex items-center font-pretendard text-[var(--text-main)]">
                <input
                  type="radio"
                  name="isPublic"
                  checked={isPublic === false}
                  onChange={() => setIsPublic(false)}
                  className="form-radio h-4 w-4 text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] mr-2"
                />
                비공개
              </label>
            </div>
            <p className="font-pretendard text-xs text-[var(--text-subtle)] mt-1 ml-6">
              {isPublic ? '누구나 검색하고 가입할 수 있어요.' : '초대되거나 승인된 멤버만 가입할 수 있어요.'}
            </p>
          </div>

          {/* 가입 방식 */}
          <div className="mb-6">
            <p className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">
              가입 방식
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center font-pretendard text-[var(--text-main)]">
                <input
                  type="radio"
                  name="joinType"
                  value="free"
                  checked={joinType === 'free'}
                  onChange={() => setJoinType('free')}
                  className="form-radio h-4 w-4 text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] mr-2"
                />
                자유 가입
              </label>
              <label className="flex items-center font-pretendard text-[var(--text-main)]">
                <input
                  type="radio"
                  name="joinType"
                  value="approval"
                  checked={joinType === 'approval'}
                  onChange={() => setJoinType('approval')}
                  className="form-radio h-4 w-4 text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] mr-2"
                />
                가입 신청
              </label>
            </div>
            <p className="font-pretendard text-xs text-[var(--text-subtle)] mt-1 ml-6">
              {joinType === 'free' ? '승인 없이 아지트에 즉시 가입할 수 있어요.' : '리더의 승인을 받아야 아지트에 가입할 수 있어요.'}
            </p>
          </div>

          {/* ✅ 최대 인원 설정 -> 아지트 규모로 변경 및 설명 추가 */}
          <div className="mb-6">
            <p className="font-pretendard text-sm text-left block text-[var(--text-subtle)] mb-2">
              아지트 규모
            </p>
            <div className="flex flex-col space-y-3"> {/* ✅ space-y-3으로 간격 조절 */}
              <div>
                <label className="flex items-center font-pretendard text-[var(--text-main)]">
                  <input
                    type="radio"
                    name="maxMembers"
                    value="30"
                    checked={maxMembers === '30'}
                    onChange={() => setMaxMembers('30')}
                    className="form-radio h-4 w-4 text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] mr-2"
                  />
                  소소하게 (최대 30명)
                </label>
                <p className="font-pretendard text-xs text-[var(--text-subtle)] mt-1 ml-6">
                  깊은 이야기를 나누는 스터디, 독서 모임에 적합해요.
                </p>
              </div>

              <div>
                <label className="flex items-center font-pretendard text-[var(--text-main)]">
                  <input
                    type="radio"
                    name="maxMembers"
                    value="100"
                    checked={maxMembers === '100'}
                    onChange={() => setMaxMembers('100')}
                    className="form-radio h-4 w-4 text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] mr-2"
                  />
                  적당하게 (최대 100명)
                </label>
                <p className="font-pretendard text-xs text-[var(--text-subtle)] mt-1 ml-6">
                  취미를 공유하고 정기적인 만남을 갖기에 좋아요.
                </p>
              </div>

              <div>
                <label className="flex items-center font-pretendard text-[var(--text-main)]">
                  <input
                    type="radio"
                    name="maxMembers"
                    value="unlimited"
                    checked={maxMembers === 'unlimited'}
                    onChange={() => setMaxMembers('unlimited')}
                    className="form-radio h-4 w-4 text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] mr-2"
                  />
                  자유롭게 (제한 없음)
                </label>
                <p className="font-pretendard text-xs text-[var(--text-subtle)] mt-1 ml-6">
                  같은 관심사를 가진 누구나 환영하는 열린 공간이에요.
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </main>

      <footer className="fixed bottom-0 w-full bg-[var(--color-component-bg)] border-t border-[var(--color-border)] p-4 z-10">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full py-3 bg-[var(--color-primary)] text-[var(--text-on-primary)] rounded-[var(--rounded-button)] font-semibold transition-opacity hover:opacity-90 active:bg-[var(--color-primary-darker)] disabled:opacity-50 disabled:cursor-not-allowed font-pretendard"
        >
          아지트 만들기
        </button>
      </footer>
    </div>
  );
}