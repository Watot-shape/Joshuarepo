import { RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { TicketProvider } from './contexts/TicketContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <RouterProvider router={router} />
      </TicketProvider>
    </AuthProvider>
  );
}