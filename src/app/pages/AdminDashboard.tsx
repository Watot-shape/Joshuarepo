import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useNavigate } from 'react-router';
import { 
  Users, 
  FileText, 
  AlertCircle, 
  Clock,
  ChevronDown,
  Eye,
  UserCheck
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // HR Assignment Matrix data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Employment Function',
      description: 'Immigration, Recruitment & Selection, Offboarding, Final Pay, Exit Clearance',
      assignedTo: '2',
      assignedToName: 'Sir Kent'
    },
    {
      id: '2',
      title: 'Personnel Function',
      description: 'Investigation, Conduct Request, COE Request, Employee Violations, Loan Requests',
      assignedTo: '3',
      assignedToName: 'Sir Kreisle'
    },
    {
      id: '3',
      title: 'Benefits & Compensation',
      description: 'Health Insurance, Retirement Plans, PTO Management, Salary Reviews',
      assignedTo: '4',
      assignedToName: 'Ms. Anderson'
    },
  ];

  // Calculate stats
  const staffTotal = 8; // Mock data
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const overdueTickets = 7; // Mock data
  const avgResolutionTime = '2.4 days';

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesCategory && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Staff Totals */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(2, 14, 39, 0.5) 100%)',
            border: '1px solid rgba(176, 191, 0, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#b0bf00] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Staff Totals</p>
                <p className="text-4xl font-bold text-white">{staffTotal}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.2) 0%, rgba(176, 191, 0, 0.1) 100%)',
                border: '1px solid rgba(176, 191, 0, 0.3)'
              }}>
                <Users className="w-6 h-6 text-[#b0bf00]" />
              </div>
            </div>
          </div>

          {/* Open Tickets */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Open</p>
                <p className="text-4xl font-bold text-white">{openTickets}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}>
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Overdue */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Overdue</p>
                <p className="text-4xl font-bold text-white">{overdueTickets}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          {/* Avg Resolution Time */}
          <div className="rounded-xl p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium">Avg. Resolution Time</p>
                <p className="text-3xl font-bold text-white">{avgResolutionTime}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* HR Assignment Matrix */}
        <div className="rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
          border: '1px solid rgba(176, 191, 0, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.2) 0%, rgba(176, 191, 0, 0.1) 100%)',
              border: '1px solid rgba(176, 191, 0, 0.3)'
            }}>
              <UserCheck className="w-5 h-5 text-[#b0bf00]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">HR Assignment Matrix</h3>
              <p className="text-xs text-gray-400">Manage HR function assignments</p>
            </div>
          </div>

          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer group"
                style={{
                  background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.08) 0%, rgba(2, 14, 39, 0.6) 100%)',
                  border: '1px solid rgba(176, 191, 0, 0.2)'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-bold mb-1">{assignment.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">{assignment.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs text-gray-500">Assigned to:</span>
                    <div className="px-3 py-1.5 rounded-lg flex items-center gap-2" style={{
                      background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.2) 0%, rgba(176, 191, 0, 0.1) 100%)',
                      border: '1px solid rgba(176, 191, 0, 0.3)'
                    }}>
                      <span className="text-sm font-semibold text-[#b0bf00]">{assignment.assignedToName}</span>
                      <ChevronDown className="w-4 h-4 text-[#b0bf00] group-hover:rotate-180 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl p-5 backdrop-blur-xl" style={{
          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
          border: '1px solid rgba(176, 191, 0, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-gray-900/50 border-[#b0bf00]/20 text-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Payroll">Payroll</SelectItem>
                  <SelectItem value="Benefits">Benefits</SelectItem>
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                  <SelectItem value="Leave Request">Leave Request</SelectItem>
                  <SelectItem value="IT Support">IT Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-gray-900/50 border-[#b0bf00]/20 text-white">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-gray-900/50 border-[#b0bf00]/20 text-white">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* All Tickets Table */}
        <div className="rounded-2xl backdrop-blur-xl overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.03) 0%, rgba(2, 14, 39, 0.5) 100%)',
          border: '1px solid rgba(176, 191, 0, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="px-6 py-4 border-b border-[#b0bf00]/10" style={{
            background: 'linear-gradient(to bottom, rgba(176, 191, 0, 0.05), transparent)'
          }}>
            <h3 className="text-lg font-bold text-white">All Tickets</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#b0bf00]/10">
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Ticket ID</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Employee Name</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Priority</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Assigned To</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b0bf00]/5">
                {filteredTickets.map((ticket, index) => (
                  <tr 
                    key={ticket.id} 
                    className="transition-all duration-300 hover:bg-[#b0bf00]/5 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-white text-sm">{ticket.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 font-medium">{ticket.createdByName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#b0bf00] rounded-full"></div>
                        <span className="text-gray-300 text-sm">{ticket.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getPriorityColor(ticket.priority)} border font-semibold capitalize`}>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`${getStatusColor(ticket.status)} border font-semibold capitalize`}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">{ticket.assignedToName || 'Unassigned'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => navigate(`/dashboard/admin/ticket/${ticket.id}`)}
                        variant="ghost"
                        size="sm"
                        className="text-[#b0bf00] hover:text-[#9aaa00] hover:bg-[#b0bf00]/10 font-medium"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTickets.length === 0 && (
            <div className="px-6 py-12 text-center">
              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">No tickets found matching the filters</p>
            </div>
          )}

          {/* Pagination */}
          {filteredTickets.length > 0 && (
            <div className="px-6 py-4 border-t border-[#b0bf00]/10 flex items-center justify-between" style={{
              background: 'linear-gradient(to top, rgba(176, 191, 0, 0.03), transparent)'
            }}>
              <p className="text-sm text-gray-400">
                Showing <span className="text-white font-semibold">{filteredTickets.length}</span> of <span className="text-white font-semibold">{tickets.length}</span> tickets
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-[#b0bf00]/20 bg-gray-900/50 text-gray-300 hover:bg-[#b0bf00]/10 hover:text-white">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-[#b0bf00]/20 bg-gray-900/50 text-gray-300 hover:bg-[#b0bf00]/10 hover:text-white">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}