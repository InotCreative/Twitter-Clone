'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Home, User, Users, LogOut, LogIn } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Profile', href: `/profile/${session?.user?.id}`, icon: User, auth: true },
    { name: 'People', href: '/people', icon: Users, auth: true },
  ];

  return (
    <aside className="flex w-[275px] flex-col gap-4 p-4">
      <div className="text-xl font-bold">🐦 Twitter Clone</div>
      <nav className="flex flex-col gap-2">
        {navigation.map((item) => {
          if (item.auth && !session) return null;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-4 rounded-full p-4 transition-colors hover:bg-gray-100',
                pathname === item.href && 'font-bold'
              )}
            >
              <item.icon className="h-6 w-6" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto">
        {session ? (
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-4 rounded-full p-4 transition-colors hover:bg-gray-100"
          >
            <LogOut className="h-6 w-6" />
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="flex w-full items-center gap-4 rounded-full p-4 transition-colors hover:bg-gray-100"
          >
            <LogIn className="h-6 w-6" />
            Sign in
          </button>
        )}
      </div>
    </aside>
  );
} 