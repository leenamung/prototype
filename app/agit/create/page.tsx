import AgitCreateClient from "@/app/components/domain/agit/views/AgitCreateClientPage";
import AgitCreateNavigationBar from "@/app/components/domain/agit/layout/AgitCreateNavigationBar";

export default function AgitCreatePage() {
  return (
    <div className="flex flex-col h-full">
      <AgitCreateNavigationBar />

      {/* ✅ [수정] pt-14 제거, flex-1 overflow-hidden (내부 AgitCreateClient가 스크롤 처리하도록) */}
      <div className="flex-1 overflow-hidden relative">
        <AgitCreateClient />
      </div>
    </div>
  );
}