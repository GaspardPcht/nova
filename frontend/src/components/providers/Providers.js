'use client';

import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <Layout>
        {children}
      </Layout>
    </AuthProvider>
  );
} 