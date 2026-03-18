import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Home, FileText, Users, LogOut, Search, Bell, Shield } from 'lucide-react';
import logoImage from 'figma:asset/e48cc0cb98fd592ad9e208a128194c25b1510164.png';
import { Input } from './ui/input';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Overview', path: '/dashboard/overview' },
    { icon: FileText, label: 'Tickets', path: '/dashboard/tickets' },
    { icon: Users, label: 'Employees', path: '/dashboard/employees' },
  ];

  // Add Super Admin menu item for super_admin role
  if (user?.role === 'super_admin') {
    menuItems.splice(1, 0, { icon: Shield, label: 'Super Admin', path: '/dashboard/super-admin' });
  }
  // Add Admin menu item for admin role (but not super_admin since they have their own)
  else if (user?.role === 'admin') {
    menuItems.splice(1, 0, { icon: Shield, label: 'Admin', path: '/dashboard/admin' });
  }

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#020e27] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#b0bf00] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#b0bf00] rounded-full blur-[120px] opacity-10"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(#b0bf00 1px, transparent 1px), linear-gradient(90deg, #b0bf00 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-72 relative z-10 flex flex-col" style={{
        background: 'linear-gradient(180deg, rgba(2, 14, 39, 0.95) 0%, rgba(2, 14, 39, 0.98) 100%)',
        borderRight: '1px solid rgba(176, 191, 0, 0.15)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3), inset -1px 0 0 rgba(176, 191, 0, 0.1)'
      }}>
        {/* Logo Section with Elegant Design */}
        <div className="p-6 border-b border-[#b0bf00]/10 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#b0bf00]/5 to-transparent"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#b0bf00] to-[#8a9400] rounded-xl flex items-center justify-center p-2.5 relative group transition-all duration-300 hover:scale-105" style={{
              boxShadow: '0 8px 24px rgba(176, 191, 0, 0.3), inset 0 0 0 1px rgba(176, 191, 0, 0.3)'
            }}>
              <img src={logoImage} alt="Vantage Logo" className="w-full h-full object-contain drop-shadow-lg" />
              
              {/* Subtle Corner Glow */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#b0bf00] rounded-full opacity-60 blur-sm"></div>
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-wide">Vantage</span>
              <p className="text-xs text-gray-400 mt-0.5">HR Management</p>
            </div>
          </div>
        </div>

        {/* Navigation with Elegant Styling */}
        <nav className="flex-1 px-5 pt-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium relative overflow-hidden group ${
                    isActive
                      ? 'text-[#020e27]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #b0bf00 0%, #9aaa00 100%)',
                    boxShadow: '0 4px 20px rgba(176, 191, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  } : {}}
                >
                  {/* Hover Effect Background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#b0bf00]/0 via-[#b0bf00]/10 to-[#b0bf00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#020e27] rounded-r-full"></div>
                  )}
                  
                  <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'drop-shadow-sm' : ''}`} />
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active Glow Effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="px-5 py-6 border-t border-[#b0bf00]/10" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(176, 191, 0, 0.03))'
        }}>
          <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{
            background: 'rgba(176, 191, 0, 0.1)',
            border: '1px solid rgba(176, 191, 0, 0.2)'
          }}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#b0bf00] to-[#8a9400] rounded-lg flex items-center justify-center relative" style={{
              boxShadow: '0 4px 12px rgba(176, 191, 0, 0.3)'
            }}>
              <span className="text-sm font-bold text-[#020e27]">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize truncate">{user?.role.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <LogOut className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header with Glass Effect */}
        <header className="px-8 py-5 backdrop-blur-xl relative" style={{
          background: 'linear-gradient(135deg, rgba(2, 14, 39, 0.8) 0%, rgba(2, 14, 39, 0.9) 100%)',
          borderBottom: '1px solid rgba(176, 191, 0, 0.15)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
              <p className="text-sm text-gray-400">Manage your HR operations efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search with Elegant Design */}
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search anything..."
                  className="pl-11 pr-4 w-72 h-11 text-sm text-white placeholder:text-gray-500 rounded-xl border-[#b0bf00]/20 focus:border-[#b0bf00] focus:ring-[#b0bf00]/30"
                  style={{
                    background: 'rgba(176, 191, 0, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>

              {/* Notifications with Glow */}
              <button className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 relative group hover:scale-105" style={{
                background: 'rgba(176, 191, 0, 0.1)',
                border: '1px solid rgba(176, 191, 0, 0.2)'
              }}>
                <Bell className="w-5 h-5 text-[#b0bf00]" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#020e27]" style={{
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                }}></div>
                <div className="absolute inset-0 bg-[#b0bf00] rounded-xl opacity-0 group-hover:opacity-1 transition-opacity duration-300"></div>
              </button>

              {/* User Avatar Badge */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(135deg, #b0bf00 0%, #9aaa00 100%)',
                boxShadow: '0 4px 16px rgba(176, 191, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#020e27] leading-tight">{user?.name.split(' ')[0]} {user?.name.split(' ')[1]?.charAt(0)}.</p>
                  <p className="text-xs text-[#020e27]/70 capitalize leading-tight font-medium">{user?.role.replace('_', ' ')}</p>
                </div>
                <div className="w-9 h-9 bg-[#020e27] rounded-lg flex items-center justify-center" style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}>
                  <span className="text-sm font-bold text-[#b0bf00]">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}