import AgitCreateClient from "@/app/components/domain/agit/AgitCreateClient";
import AgitCreateNavigationBar from "@/app/components/domain/agit/AgitCreateNavigationBar";

export default function AgitCreatePage() {
  return (
    <>
      {/* 1. 네비게이션 바 */}
      <AgitCreateNavigationBar />

      {/* 2. 콘텐츠 영역 (헤더 높이만큼 상단 여백 추가) */}
      <div className="pt-14">
        <AgitCreateClient />
      </div>
    </>
  );
}