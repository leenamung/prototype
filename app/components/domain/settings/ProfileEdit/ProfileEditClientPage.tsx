"use client";
import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();
    
    const [nickname, setNickname] = useState("김민지");
    const [bio, setBio] = useState("매일 조금씩 성장하는 중입니다 🌱");
    const [profileImage, setProfileImage] = useState<string | null>("https://i.pravatar.cc/150?img=11");
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

    const isSaveDisabled = !!nicknameError;

    return (
        <>
            <nav className="fixed top-0 w-full bg-[var(--color-component-bg)] border-b border-[var(--color-border)] shadow-sm z-20">
                <div className="flex items-center justify-between px-4 py-3 h-14">
                    <button onClick={() => router.back()} className="text-sm text-[var(--text-subtle)] hover:text-[var(--text-main)] px-2 py-1 rounded-md hover:bg-[var(--color-subtle-bg)] active:bg-[var(--color-border)] transition-colors">취소</button>
                    <h1 className="text-lg font-semibold text-[var(--text-main)]">프로필 편집</h1>
                    <button 
                        disabled={isSaveDisabled}
                         className={`text-sm font-bold transition-all px-2 py-1 rounded-md ${isSaveDisabled ? 'text-[var(--color-border)]' : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/20'}`}
                    >
                        완료
                    </button>
                </div>
            </nav>
            <main className="pt-20 px-5 pb-10">
                <div className="flex flex-col items-center">
                    
                    {/* ⭐️ 수정: '프로필 사진' h3 타이틀을 제거했습니다. */}
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
        </>
    )
}

export default ProfileEditClientPage;