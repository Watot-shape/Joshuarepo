import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, User, Menu } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'employee':
        return 'Employee';
      case 'office_head':
        return 'Office Head';
      case 'admin':
        return 'Admin';
      case 'super_admin':
        return 'Super Admin';
      default:
        return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0a2342] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d4af37] rounded flex items-center justify-center">
                <span className="text-xl font-bold text-[#0a2342]">HR</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#d4af37]">HR Ticketing System</h1>
                <p className="text-xs text-gray-300">{getRoleLabel()} Dashboard</p>
              </div>
            </div>

            {/* User Info and Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-2 rounded">
                <User className="w-4 h-4" />
                <div className="text-sm">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-300">{user?.department}</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-transparent border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a2342]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
