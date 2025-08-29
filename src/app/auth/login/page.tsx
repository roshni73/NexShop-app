'use client';

import {
  ClientSafeProvider,
  getProviders,
  signIn,
  useSession
  } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ShoppingBag, Sparkles, Shield, Clock } from 'lucide-react';

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    getAuthProviders();
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true);
    await signIn(providerId, { callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00CCCC]/10 to-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00CCCC] border-t-transparent mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00CCCC]/10 via-white to-[#00CCCC]/5 px-6 py-12">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-[#00CCCC] to-[#008888] text-white p-12 hidden md:flex flex-col justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-white" />
              <span className="ml-3 text-4xl font-bold">NexShop</span>
            </div>
            <p className="text-xl font-light mb-12 opacity-90">
              Welcome to your premium shopping experience
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Premium Products</h3>
                <p className="text-white/80 text-sm">Curated collection of quality items</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Checkout</h3>
                <p className="text-white/80 text-sm">Your data is always protected</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fast Delivery</h3>
                <p className="text-white/80 text-sm">Quick shipping to your doorstep</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-12 flex flex-col justify-center">
          <div className="text-center mb-8 md:hidden">
            <div className="flex items-center justify-center mb-4">
              <ShoppingBag size={40} className="text-[#00CCCC]" />
              <span className="ml-2 text-3xl font-bold text-[#00CCCC]">NexShop</span>
            </div>
            <p className="text-gray-600">Welcome back to your account</p>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back 👋</h2>
            <p className="text-gray-600">Sign in to access your shopping cart and preferences</p>
          </div>
          <div className="space-y-4">
            {providers &&
              Object.values(providers).map((provider: ClientSafeProvider) => (
                <div key={provider.name}>
                  <button
                    onClick={() => handleSignIn(provider.id)}
                    disabled={isLoading}
                    className={`group relative w-full flex items-center justify-center gap-3 py-4 px-6 text-base font-medium rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] ${
                      provider.name === 'Google'
                        ? 'bg-white text-gray-800 border-2 border-gray-200 hover:border-[#00CCCC]/30 hover:bg-[#00CCCC]/5'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {provider.name === 'Google' && (
                      <FcGoogle size={24} className="flex-shrink-0" />
                    )}
                    <span className="flex-1 text-center">
                      {isLoading ? 'Signing in...' : `Continue with ${provider.name}`}
                    </span>
                    {isLoading && (
                      <div className="w-5 h-5 border-2 border-[#00CCCC] border-t-transparent rounded-full animate-spin ml-2"></div>
                    )}
                  </button>
                </div>
              ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-[#00CCCC] hover:text-[#008888] font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#00CCCC] hover:text-[#008888] font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="mt-6 p-4 bg-[#00CCCC]/10 rounded-lg">
            <p className="text-sm text-[#008888] text-center">
              <strong>Demo:</strong> This is a demonstration login. Your data is secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}