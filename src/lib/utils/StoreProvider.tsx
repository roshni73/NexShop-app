'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="flex items-center justify-center min-h-screen">Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}