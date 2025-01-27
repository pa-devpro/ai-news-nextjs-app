import { ReactNode } from 'react';

import { DashboardLayout } from './_components/dashboard-layout';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
};

export default AppLayout;
