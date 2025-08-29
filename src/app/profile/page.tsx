'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Edit, MapPin, Phone, Mail, Calendar, Shield } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session } = useSession();

  const userData = {
    name: session?.user?.name || 'John Doe',
    email: session?.user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    joinDate: 'January 15, 2023',
    orders: 12,
    loyaltyPoints: 450
  };

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please sign in to view your profile
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access your profile information.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center px-6 py-3 bg-[#00CCCC] text-white rounded-lg hover:bg-[#00AAAA] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00CCCC] text-white rounded-lg hover:bg-[#00AAAA] transition-colors">
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#00CCCC] to-[#008888] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={20}
                    height={20}
                    alt="Profile"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-white/80">Premium Member</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Shield size={20} className="text-[#00CCCC]" />
                  Personal Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-800">{userData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-800">{userData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="text-gray-800">{userData.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin size={20} className="text-[#00CCCC]" />
                  Shipping Address
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Street Address</p>
                    <p className="text-gray-800">{userData.address.street}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">City</p>
                      <p className="text-gray-800">{userData.address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">State</p>
                      <p className="text-gray-800">{userData.address.state}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">ZIP Code</p>
                      <p className="text-gray-800">{userData.address.zipCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Country</p>
                      <p className="text-gray-800">{userData.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#00CCCC]">{userData.orders}</p>
                  <p className="text-gray-600">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#00CCCC]">{userData.loyaltyPoints}</p>
                  <p className="text-gray-600">Loyalty Points</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#00CCCC]">Gold</p>
                  <p className="text-gray-600">Member Tier</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/orders"
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="font-semibold text-gray-800">Order History</h3>
              <p className="text-sm text-gray-600 mt-1">View your past orders</p>
            </Link>
            <Link
              href="/wishlist"
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="font-semibold text-gray-800">Wishlist</h3>
              <p className="text-sm text-gray-600 mt-1">Your saved items</p>
            </Link>
            <Link
              href="/settings"
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="font-semibold text-gray-800">Settings</h3>
              <p className="text-sm text-gray-600 mt-1">Account preferences</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
