'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarNavItem } from '@/types';
import { Icons } from '@/components/icons';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = Icons[item?.icon ?? 'arrowRight'];
        return (
          item.href && (
            <Link key={item.title} href={item.disabled ? '/' : item.href}>
              <span
                data-active={path === item.href}
                data-disabled={item.disabled}
                className="group flex items-center rounded-md bg-transparent px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground data-[disabled=true]:cursor-not-allowed data-[active=true]:bg-accent data-[disabled=true]:opacity-80"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};
