import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Calendar, MessageSquare, Clock, ChevronRight, FileText, TrendingUp, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

export function DashboardOverview() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();

  // Calculate stats
  const userTickets = tickets.filter(t => t.employeeId === user?.id);
  const pendingTickets = userTickets.filter(t => t.status === 'pending').length;
  const avgResponseTime = '4.2h'; // Mock data

  // Get categories count
  const categoryCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = [
    { name: 'Payroll', count: categoryCounts['Payroll'] || 0, icon: '💰', color: 'from-yellow-500 to-orange-500' },
    { name: 'Benefits', count: categoryCounts['Benefits'] || 0, icon: '🎁', color: 'from-blue-500 to-cyan-500' },
    { name: 'Onboarding', count: categoryCounts['Onboarding'] || 0, icon: '👋', color: 'from-purple-500 to-pink-500' },
  ];

  // Get recent activity
  const recentTickets = [...userTickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout title="Dashboard Overview">
      <div className="space-y-6">
        {/* Welcome Banner with Elegant Design */}
        <div className="rounded-2xl p-8 relative overflow-hidden group" style={{
          background: 'linear-gradient(135deg, #b0bf00 0%, #9aaa00 50%, #7a8a00 100%)',
          boxShadow: '0 8px 32px rgba(176, 191, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="w-24 h-24 text-white" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {user?.name.split(' ')[0]}!
                </h2>
                <p className="text-gray-300 text-lg">
                  You have <span className="font-bold">{pendingTickets}</span> pending ticket{pendingTickets !== 1 ? 's' : ''} waiting for your attention.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">+12% this week</span>
              </div>
            </div>
            <Button 
              className="bg-white hover:bg-gray-100 text-gray-950 font-semibold px-6 py-3 h-auto transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)'
              }}
              onClick={() => navigate('/tickets')}
            >
              View My Tickets
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Stats Cards with Glass-morphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Tickets */}
          <div className="rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div>
                <p className="text-sm text-gray-400 mb-2 font-medium">Pending Tickets</p>
                <p className="text-5xl font-bold text-white mb-1">{pendingTickets}</p>
                <p className="text-xs text-blue-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+3 from last week</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center relative" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <Calendar className="w-7 h-7 text-blue-400" />
              </div>
            </div>
          </div>

          {/* All Tickets */}
          <div className="rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div>
                <p className="text-sm text-gray-400 mb-2 font-medium">All Tickets</p>
                <p className="text-5xl font-bold text-white mb-1">{userTickets.length}</p>
                <p className="text-xs text-orange-400 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>Total submissions</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center relative" style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}>
                <MessageSquare className="w-7 h-7 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div>
                <p className="text-sm text-gray-400 mb-2 font-medium">Avg. Response Time</p>
                <p className="text-5xl font-bold text-white mb-1">{avgResponseTime}</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>15% faster</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center relative" style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                <Clock className="w-7 h-7 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories */}
          <div className="lg:col-span-2 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
            border: '1px solid rgba(176, 191, 0, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Your Categories</h3>
                <p className="text-sm text-gray-400">Manage your assigned categories</p>
              </div>
              <button className="text-sm text-[#b0bf00] hover:text-[#9aaa00] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-[#b0bf00]/10">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div
                  key={category.name}
                  onClick={() => navigate(`/dashboard/category/${category.name}`)}
                  className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(176, 191, 0, 0.05) 100%)',
                    border: '1px solid rgba(176, 191, 0, 0.2)',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${category.color} relative`} style={{
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                    }}>
                      {category.icon}
                      <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">{category.name}</p>
                      <p className="text-sm text-gray-400">{category.count} ticket{category.count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-lg bg-[#b0bf00]/20">
                      <span className="text-sm font-bold text-[#b0bf00]">{category.count}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#b0bf00] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
            border: '1px solid rgba(176, 191, 0, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Recent Activity</h3>
              <p className="text-sm text-gray-400">Latest ticket updates</p>
            </div>
            <div className="space-y-4">
              {recentTickets.length > 0 ? (
                recentTickets.map((ticket, index) => (
                  <div 
                    key={ticket.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#b0bf00]/5 transition-all duration-300 cursor-pointer group"
                    style={{
                      border: '1px solid transparent',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="w-2 h-2 bg-[#b0bf00] rounded-full mt-2 group-hover:scale-150 transition-transform" style={{
                      boxShadow: '0 0 8px rgba(176, 191, 0, 0.6)'
                    }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{ticket.id}</p>
                      <p className="text-xs text-gray-400 mb-1">{ticket.category}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(ticket.createdAt), 'MMM d, h:mm a')}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#b0bf00] transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                    background: 'rgba(176, 191, 0, 0.1)',
                    border: '1px solid rgba(176, 191, 0, 0.2)'
                  }}>
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">No recent activity</p>
                  <p className="text-xs text-gray-600 mt-1">Your activity will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}