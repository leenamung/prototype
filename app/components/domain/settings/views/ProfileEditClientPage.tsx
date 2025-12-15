"use client";
import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
// import { useRouter } from 'next/navigation'; // Header로 이동됨
import ProfileEditNavigationBar from '../layout/ProfileEditNavigationBar';

const validateNickname = (name: string) => {
  if (name.length < 2 || name.length > 10) {
    return "닉네임은 2자 이상 10자 이하로 입력해주세요.";
  }
  if (!/^[a-zA-Z0-9가-힣]+$/.test(name)) {
    return "닉네임은 한글, 영문, 숫자만 사용할 수 있어요.";
  }
  return null;
};

const ProfileEditClientPage = () => {
    // const router = useRouter(); // Header 컴포넌트 내부에서 사용
    
    // ✅ 초기 데이터 정의 (변경 사항 비교용)
    // 실제 구현 시에는 서버에서 받아온 props 데이터를 여기에 할당하면 됩니다.
    const initialData = {
        nickname: "김민지",
        bio: "매일 조금씩 성장하는 중입니다 🌱",
        profileImage: "https://i.pravatar.cc/150?img=11"
    };

    const [nickname, setNickname] = useState(initialData.nickname);
    const [bio, setBio] = useState(initialData.bio);
    const [profileImage, setProfileImage] = useState<string | null>(initialData.profileImage);
    const [nicknameError, setNicknameError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newNickname = e.target.value;
        setNickname(newNickname);
        setNicknameError(validateNickname(newNickname));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileSelect = () => fileInputRef.current?.click();

    const handleSave = () => {
        console.log("프로필 저장:", { nickname, bio, profileImage });
        alert("프로필이 수정되었습니다.");
        // router.back(); // 저장 후 이동 로직 추가 가능
    };

    // ✅ 변경 사항 여부 확인 (Dirty Check)
    // 닉네임, 자기소개, 프로필 이미지 중 하나라도 초기값과 다르면 true
    const isDirty = nickname !== initialData.nickname || 
                    bio !== initialData.bio || 
                    profileImage !== initialData.profileImage;

    // ✅ 저장 버튼 비활성화 조건 수정:
    // 1. 닉네임 유효성 에러가 있거나 (!!nicknameError)
    // 2. 변경 사항이 없을 때 (!isDirty)
    const isSaveDisabled = !!nicknameError || !isDirty;

    return (
        <div className="flex flex-col h-full">
            {/* 네비게이션 바에 isSaveDisabled 상태 전달 */}
            <ProfileEditNavigationBar onSave={handleSave} isSaveDisabled={isSaveDisabled} />

            <main className="flex-1 overflow-y-auto px-5 py-6">
                <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--color-border)] cursor-pointer group" onClick={triggerFileSelect}>
                            {profileImage && <Image src={profileImage} alt="프로필 사진" layout="fill" objectFit="cover" className="rounded-full" />}
                            <div className="absolute inset-0 bg-black/25 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <i className="ri-camera-fill ri-xl text-white"></i>
                            </div>
                        </div>
                        <button 
                            onClick={triggerFileSelect} 
                            className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--color-component-bg)] rounded-full shadow-md border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-subtle-bg)] transition-colors cursor-pointer"
                            aria-label="프로필 사진 변경"
                        >
                            <i className="ri-camera-fill text-[var(--color-primary-dark)]"></i>
                        </button>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-[var(--text-subtle)] block mb-1">닉네임</label>
                        <div className={`flex items-center bg-[var(--color-subtle-bg)] rounded-lg px-4 py-2.5 
                                      border ${nicknameError ? 'border-red-300 ring-2 ring-red-200/50' : 'border-transparent'}
                                      focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 transition-all`}>
                            <input
                                type="text"
                                value={nickname}
                                onChange={handleNicknameChange}
                                className="flex-1 w-full bg-transparent text-base text-[var(--text-main)] placeholder:text-[var(--text-subtle)]/80 
                                           outline-none border-none p-0 focus:ring-0 font-gowun-batang"
                            />
                        </div>
                        <div className="h-6 mt-1.5">
                            {nicknameError && <p className="text-xs text-[var(--color-warning)]">{nicknameError}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-[var(--text-subtle)] block mb-1">자기소개</label>
                        <div className="bg-[var(--color-subtle-bg)] rounded-lg p-3 border border-transparent
                                      focus-within:ring-2 focus-within:ring-[var(--color-primary)]/50 transition-all">
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full min-h-[100px] bg-transparent text-base text-[var(--text-main)] 
                                           outline-none border-none p-0 focus:ring-0 resize-none"
                                rows={4}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProfileEditClientPage;