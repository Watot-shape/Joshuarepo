import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router';
import { 
  Shield,
  Users, 
  FileText, 
  Settings,
  UserPlus,
  Key,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export function SuperAdminDashboard() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'permissions'>('overview');

  // Mock system users
  const systemUsers: SystemUser[] = [
    { id: '1', name: 'John Employee', email: 'john@company.com', role: 'Employee', department: 'Engineering', status: 'active', lastLogin: '2 hours ago' },
    { id: '2', name: 'Sir Kent', email: 'kent@company.com', role: 'Office Head', department: 'HR - Employment', status: 'active', lastLogin: '1 hour ago' },
    { id: '3', name: 'Sir Kreisle', email: 'kreisle@company.com', role: 'Office Head', department: 'HR - Personnel', status: 'active', lastLogin: '30 min ago' },
    { id: '4', name: 'Ms. Anderson', email: 'anderson@company.com', role: 'Office Head', department: 'HR - Benefits', status: 'active', lastLogin: '15 min ago' },
    { id: '5', name: 'Admin User', email: 'admin@company.com', role: 'Admin', department: 'HR Operations', status: 'active', lastLogin: '5 min ago' },
    { id: '6', name: 'Jane Smith', email: 'jane@company.com', role: 'Employee', department: 'Marketing', status: 'inactive', lastLogin: '2 days ago' },
  ];

  // Calculate statistics
  const stats = {
    totalUsers: systemUsers.length,
    activeUsers: systemUsers.filter(u => u.status === 'active').length,
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    systemUptime: '99.9%',
    avgResponseTime: '1.2 hours',
  };

  return (
    <DashboardLayout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(2, 14, 39, 0.5) 100%)',
          border: '1px solid rgba(176, 191, 0, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#b0bf00] rounded-full blur-3xl opacity-10"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#b0bf00] to-[#8a9400]" style={{
              boxShadow: '0 8px 24px rgba(176, 191, 0, 0.4)'
            }}>
              <Shield className="w-8 h-8 text-[#020e27]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Super Admin Control Center</h1>
              <p className="text-gray-400">Full system authority • User management • Permission control</p>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Users */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Total Users</p>
                <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
                <p className="text-xs text-green-400 mt-1">{stats.activeUsers} active</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Tickets */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Total Tickets</p>
                <p className="text-4xl font-bold text-white">{stats.totalTickets}</p>
                <p className="text-xs text-orange-400 mt-1">{stats.openTickets} open</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}>
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          {/* System Uptime */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">System Uptime</p>
                <p className="text-4xl font-bold text-white">{stats.systemUptime}</p>
                <p className="text-xs text-green-400 mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Avg Response</p>
                <p className="text-3xl font-bold text-white">{stats.avgResponseTime}</p>
                <p className="text-xs text-green-400 mt-1">↓ 15% vs last week</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}>
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="rounded-xl p-2 backdrop-blur-xl flex gap-2" style={{
          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
          border: '1px solid rgba(176, 191, 0, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          {[
            { id: 'overview', label: 'System Overview', icon: TrendingUp },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'permissions', label: 'Permissions', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedTab === tab.id
                    ? 'text-[#020e27]'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  background: selectedTab === tab.id ? '#b0bf00' : 'transparent',
                  boxShadow: selectedTab === tab.id ? '0 4px 16px rgba(176, 191, 0, 0.3)' : 'none'
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* System Health */}
            <div className="rounded-2xl p-6 backdrop-blur-xl" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
              border: '1px solid rgba(176, 191, 0, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">System Health</h3>
                  <p className="text-xs text-gray-400">Real-time system monitoring</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#020e27]/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">Database Status</p>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">Healthy</p>
                  <p className="text-xs text-green-400 mt-1">All connections active</p>
                </div>

                <div className="p-4 rounded-xl bg-[#020e27]/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">API Performance</p>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">Optimal</p>
                  <p className="text-xs text-green-400 mt-1">Avg response: 45ms</p>
                </div>

                <div className="p-4 rounded-xl bg-[#020e27]/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">Storage Usage</p>
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">68%</p>
                  <p className="text-xs text-yellow-400 mt-1">32% remaining</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl p-6 backdrop-blur-xl" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
              border: '1px solid rgba(176, 191, 0, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={() => navigate('/authority-management')}
                  className="h-auto py-4 bg-gradient-to-r from-[#b0bf00] to-[#8a9400] hover:from-[#9aaa00] hover:to-[#7a8400] text-[#020e27] font-semibold justify-start"
                  style={{ boxShadow: '0 4px 16px rgba(176, 191, 0, 0.3)' }}
                >
                  <Award className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-bold">Authority Management</div>
                    <div className="text-xs opacity-80">Grant super admin privileges</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setSelectedTab('users')}
                  variant="outline"
                  className="h-auto py-4 border-[#b0bf00]/30 bg-[#020e27]/50 text-white hover:bg-[#b0bf00]/10 justify-start"
                >
                  <UserPlus className="w-5 h-5 mr-3 text-[#b0bf00]" />
                  <div className="text-left">
                    <div className="font-bold">Manage Users</div>
                    <div className="text-xs text-gray-400">Add, edit, or remove users</div>
                  </div>
                </Button>

                <Button
                  onClick={() => navigate('/dashboard/admin')}
                  variant="outline"
                  className="h-auto py-4 border-[#b0bf00]/30 bg-[#020e27]/50 text-white hover:bg-[#b0bf00]/10 justify-start"
                >
                  <FileText className="w-5 h-5 mr-3 text-[#b0bf00]" />
                  <div className="text-left">
                    <div className="font-bold">View All Tickets</div>
                    <div className="text-xs text-gray-400">Access admin ticket dashboard</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 border-[#b0bf00]/30 bg-[#020e27]/50 text-white hover:bg-[#b0bf00]/10 justify-start"
                >
                  <Settings className="w-5 h-5 mr-3 text-[#b0bf00]" />
                  <div className="text-left">
                    <div className="font-bold">System Settings</div>
                    <div className="text-xs text-gray-400">Configure system parameters</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'users' && (
          <div className="rounded-2xl backdrop-blur-xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.03) 0%, rgba(2, 14, 39, 0.5) 100%)',
            border: '1px solid rgba(176, 191, 0, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="px-6 py-4 border-b border-[#b0bf00]/10 flex items-center justify-between" style={{
              background: 'linear-gradient(to bottom, rgba(176, 191, 0, 0.05), transparent)'
            }}>
              <h3 className="text-lg font-bold text-white">System Users</h3>
              <Button className="bg-[#b0bf00] hover:bg-[#9aaa00] text-[#020e27] font-semibold">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#b0bf00]/10">
                    <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Role</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Department</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Last Login</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#b0bf00]/5">
                  {systemUsers.map((user) => (
                    <tr key={user.id} className="transition-all duration-300 hover:bg-[#b0bf00]/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#b0bf00]/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#b0bf00]">{user.name.charAt(0)}</span>
                          </div>
                          <span className="text-white font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">{user.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 border font-semibold">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{user.department}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={user.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30 border font-semibold'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30 border font-semibold'
                        }>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">{user.lastLogin}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-[#b0bf00] hover:text-[#9aaa00] hover:bg-[#b0bf00]/10">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'permissions' && (
          <div className="rounded-2xl p-6 backdrop-blur-xl" style={{
            background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
            border: '1px solid rgba(176, 191, 0, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.2) 0%, rgba(176, 191, 0, 0.1) 100%)',
                border: '1px solid rgba(176, 191, 0, 0.3)'
              }}>
                <Key className="w-5 h-5 text-[#b0bf00]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Permission Management</h3>
                <p className="text-xs text-gray-400">Control access levels and privileges</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { role: 'Employee', permissions: ['View own tickets', 'Create tickets', 'Add comments'] },
                { role: 'Office Head', permissions: ['View category tickets', 'Approve/Cancel tickets', 'Manage comments', 'View reports'] },
                { role: 'Admin', permissions: ['View all tickets', 'Manage all tickets', 'View analytics', 'System oversight'] },
                { role: 'Super Admin', permissions: ['Full system access', 'User management', 'Grant permissions', 'System configuration'] },
              ].map((item) => (
                <div key={item.role} className="p-5 rounded-xl bg-[#020e27]/50 border border-[#b0bf00]/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">{item.role}</h4>
                    <Button variant="ghost" size="sm" className="text-[#b0bf00] hover:bg-[#b0bf00]/10">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {item.permissions.map((perm, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {perm}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
