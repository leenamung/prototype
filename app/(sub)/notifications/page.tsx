import React from 'react';
import { sampleNotifications, groupNotificationsByTime } from '../../data/notificationSampleData';
import NotificationNavigationBar from '@/app/components/domain/notifications/NotificationNavigationBar';
import NotificationDisplay from '@/app/components/domain/notifications/NotificationDisplay';

// 데이터를 일부러 2초 뒤에 가져오는 것처럼 시뮬레이션합니다.
async function getNotifications() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
  return groupNotificationsByTime(sampleNotifications);
}

// page.tsx는 이제 Server Component이며, async 함수가 될 수 있습니다.
export default async function NotificationsPage() {
  // 샘플 데이터를 시간대별로 그룹화
  const notificationGroups = await getNotifications();

  return (
    <div className="pt-14"> {/* 상단 네비게이션 바 높이만큼 패딩 */}
      <NotificationNavigationBar />
      {/* 데이터를 모두 불러온 후, 클라이언트 컴포넌트에 props로 전달하여 렌더링합니다. */}
      <NotificationDisplay groupedNotifications={notificationGroups} />
    </div>
  );
}