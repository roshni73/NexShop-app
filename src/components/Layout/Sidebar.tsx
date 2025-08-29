'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';

import {
  ShoppingCart,
  CreditCard,
  User,
  Menu,
  X,
  LogOut,
  LogIn,
  Package,
  MoreVertical,
  ShoppingBag,
} from 'lucide-react';
import { RootState } from '@/lib/store';
import Image from 'next/image';

const navigationItems = [
  { href: '/', label: 'Products', icon: Package },
  { href: '/cart', label: 'My Cart', icon: ShoppingCart },
  { href: '/checkout', label: 'Checkout', icon: CreditCard, protected: true },
  { href: '/profile', label: 'Profile', icon: User }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    closeSidebar();
    setIsDropdownOpen(false);
  };

  if (status === 'loading') {
    return (
      <div className="fixed left-0 top-0 h-screen bg-white border-r border-gray-100 w-64">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-[#00CCCC]">NexShop</h1>
        </div>
        <div className="p-4">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="flex items-center gap-2" onClick={() => setIsDropdownOpen(false)}>
            <ShoppingBag className="text-[#00CCCC]" size={24} />
            <span className="text-xl font-bold text-[#00CCCC]">NexShop</span>
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="User menu"
            >
              <MoreVertical size={20} />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                  aria-hidden="true"
                />

                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 py-2">
                  {session ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {session.user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user?.email || ''}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#00CCCC]/10 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={16} />
                        <span className="text-sm">Profile</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <LogOut size={16} />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#00CCCC]/10 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LogIn size={16} />
                      <span className="text-sm">Sign In</span>
                    </Link>
                  )}
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <Link
                      href="/cart"
                      className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-[#00CCCC]/10 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <ShoppingCart size={16} />
                        <span className="text-sm">My Cart</span>
                      </div>
                      {totalItems > 0 && (
                        <span className="bg-[#00CCCC] text-white text-xs rounded-full px-2 py-1 min-w-6 h-6 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 shadow-sm z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none w-64 lg:mt-0 mt-16`}
      >
        <div className="flex flex-col h-full pt-16 lg:pt-0">
          <div className="hidden lg:block p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-[#00CCCC]">NexShop</h1>
            <p className="text-xs text-gray-500 mt-1">Premium E-Commerce</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const canAccess = !item.protected || session;

              return (
                <Link
                  key={item.href}
                  href={canAccess ? item.href : '/auth/login'}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive(item.href)
                      ? 'bg-[#00CCCC] text-white shadow-md'
                      : 'text-gray-600 hover:bg-[#00CCCC]/10 hover:text-[#008888]'
                  } ${!canAccess ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={closeSidebar}
                >
                  <Icon
                    size={20}
                    className={isActive(item.href) ? 'text-white' : 'text-current'}
                  />
                  <span className="font-medium">{item.label}</span>
                  {item.href === '/cart' && totalItems > 0 && (
                    <span className={`ml-auto text-xs rounded-full p-1 min-w-6 h-6 flex items-center justify-center ${
                      isActive(item.href)
                        ? 'bg-white text-[#00CCCC]'
                        : 'bg-[#00CCCC] text-white'
                    }`}>
                      {totalItems}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block p-4 border-t border-gray-100">
            {session ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-[#00CCCC] rounded-full flex items-center justify-center flex-shrink-0">
                    {session.user?.image ? (
                      <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    ) : (
                      <User size={16} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user?.email || ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600 rounded-lg transition-colors duration-200 group"
                >
                  <LogOut size={16} className="group-hover:text-red-600" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#00CCCC]/10 hover:text-[#008888] rounded-xl transition-all duration-200 group"
                onClick={closeSidebar}
              >
                <LogIn size={20} />
                <span className="font-medium">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}