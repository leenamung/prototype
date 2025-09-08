"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  iconClass: string;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, iconClass, label, isActive }) => {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center justify-center h-full 
                  ${isActive 
                    ? 'text-[var(--color-primary)]' 
                    // 비활성 시 --text-subtle 적용
                    : 'text-[var(--text-subtle)] hover:text-[var(--color-primary)]'} 
                  transition-colors duration-150 ease-in-out`}
    >
      <i className={`${iconClass} ri-lg`}></i>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

const BottomTabBar: React.FC = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/", iconClass: "ri-home-5-line", label: "홈" }, // Assuming '/' is the feed page
    { href: "/explore", iconClass: "ri-compass-3-line", label: "탐색" }, // Example explore path
    { href: "/agit", iconClass: "ri-group-line", label: "아지트" }, // Example explore path
    { href: "/write", iconClass: "ri-add-box-line", label: "작성" }, // Example write path
    { href: "/direct", iconClass: "ri-discuss-line", label: "메시지" }, // Example notifications path
  ];


  return (
    <nav className="fixed bottom-0 w-full bg-[var(--color-component-bg)] 
                   border-t border-[var(--color-border)]
                   shadow-sm z-20 h-16">
      <div className="grid grid-cols-5 h-full">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            iconClass={item.iconClass}
            label={item.label}
            isActive={pathname === item.href || (item.href === "/" && !pathname.startsWith('/agit') && !pathname.startsWith('/myspace') && !pathname.startsWith('/explore') && !pathname.startsWith('/write') && !pathname.startsWith('/notifications'))}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomTabBar;
