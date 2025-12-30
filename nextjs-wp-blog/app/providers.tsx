'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/store/store';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
}
