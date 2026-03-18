import { createBrowserRouter } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { DashboardRouter } from './pages/DashboardRouter';
import { AuthorityManagement } from './pages/AuthorityManagement';
import { DashboardOverview } from './pages/DashboardOverview';
import { TicketsManagement } from './pages/TicketsManagement';
import { EmployeesPage } from './pages/EmployeesPage';
import { CategoryPage } from './pages/CategoryPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminTicketDetail } from './pages/AdminTicketDetail';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardRouter />,
  },
  {
    path: '/dashboard/overview',
    element: <DashboardOverview />,
  },
  {
    path: '/dashboard/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/dashboard/admin/ticket/:ticketId',
    element: <AdminTicketDetail />,
  },
  {
    path: '/dashboard/super-admin',
    element: <SuperAdminDashboard />,
  },
  {
    path: '/dashboard/tickets',
    element: <TicketsManagement />,
  },
  {
    path: '/dashboard/employees',
    element: <EmployeesPage />,
  },
  {
    path: '/dashboard/category/:category',
    element: <CategoryPage />,
  },
  {
    path: '/super-admin',
    element: <DashboardRouter />,
  },
  {
    path: '/authority-management',
    element: <AuthorityManagement />,
  },
]);