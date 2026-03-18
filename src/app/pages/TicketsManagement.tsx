import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Search, Filter, Plus, Eye } from 'lucide-react';
import { format } from 'date-fns';

export function TicketsManagement() {
  const { user } = useAuth();
  const { tickets } = useTickets();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_progress':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEmployeeName = (employeeId: string) => {
    // In a real app, you'd look this up from a users list
    const names = ['John Doe', 'Sarah Hall', 'Mike Ren', 'Emma Wood'];
    return names[Math.floor(Math.random() * names.length)];
  };

  return (
    <DashboardLayout title="Tickets">
      <div className="space-y-6">
        {/* Header Section with Elegant Design */}
        <div className="rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
          border: '1px solid rgba(176, 191, 0, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Ticket Management</h2>
              <p className="text-sm text-gray-400">Track and manage all your HR tickets</p>
            </div>
            <Button className="bg-gradient-to-r from-[#b0bf00] to-[#9aaa00] hover:from-[#9aaa00] hover:to-[#7a8a00] text-[#020e27] font-semibold transition-all duration-300 hover:scale-105" style={{
              boxShadow: '0 4px 16px rgba(176, 191, 0, 0.3)'
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-11 bg-[#020e27]/50 border-[#b0bf00]/20 text-white placeholder:text-gray-500 focus:border-[#b0bf00] focus:ring-[#b0bf00]/30 rounded-xl"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] h-11 bg-[#020e27]/50 border-[#b0bf00]/20 text-white rounded-xl">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Payroll">Payroll</SelectItem>
                <SelectItem value="Benefits">Benefits</SelectItem>
                <SelectItem value="Onboarding">Onboarding</SelectItem>
                <SelectItem value="Leave">Leave</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-11 bg-[#020e27]/50 border-[#b0bf00]/20 text-white rounded-xl">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            {/* Filters Button */}
            <Button variant="outline" className="h-11 border-[#b0bf00]/20 bg-[#020e27]/50 text-gray-300 hover:bg-[#b0bf00]/10 hover:text-white hover:border-[#b0bf00]/40 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Tickets Table with Elegant Glass Design */}
        <div className="rounded-2xl backdrop-blur-xl overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.03) 0%, rgba(2, 14, 39, 0.5) 100%)',
          border: '1px solid rgba(176, 191, 0, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#b0bf00]/10" style={{
                  background: 'linear-gradient(to bottom, rgba(176, 191, 0, 0.05), transparent)'
                }}>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#b0bf00] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b0bf00]/5">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, index) => (
                    <tr key={ticket.id} className="transition-all duration-300 hover:bg-[#b0bf00]/5 group" style={{
                      animationDelay: `${index * 50}ms`
                    }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-8 bg-[#b0bf00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="font-mono font-bold text-white text-sm">{ticket.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center relative" style={{
                            background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.2) 0%, rgba(176, 191, 0, 0.1) 100%)',
                            border: '1px solid rgba(176, 191, 0, 0.3)'
                          }}>
                            <span className="text-sm font-bold text-[#b0bf00]">
                              {getEmployeeName(ticket.employeeId).charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{getEmployeeName(ticket.employeeId)}</p>
                            <p className="text-xs text-gray-500">ID: {ticket.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#b0bf00] rounded-full"></div>
                          <span className="text-gray-300 font-medium">{ticket.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">
                          {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`${getStatusColor(ticket.status)} border font-semibold px-3 py-1`}
                        >
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#b0bf00] hover:text-[#9aaa00] hover:bg-[#b0bf00]/10 font-medium"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{
                          background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(176, 191, 0, 0.05) 100%)',
                          border: '1px solid rgba(176, 191, 0, 0.2)'
                        }}>
                          <Search className="w-10 h-10 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-gray-300 font-semibold text-lg mb-1">No tickets found</p>
                          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination */}
          {filteredTickets.length > 0 && (
            <div className="px-6 py-4 border-t border-[#b0bf00]/10 flex items-center justify-between" style={{
              background: 'linear-gradient(to top, rgba(176, 191, 0, 0.03), transparent)'
            }}>
              <p className="text-sm text-gray-400">
                Showing <span className="text-white font-semibold">{filteredTickets.length}</span> of <span className="text-white font-semibold">{tickets.length}</span> tickets
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-[#b0bf00]/20 bg-[#020e27]/50 text-gray-300 hover:bg-[#b0bf00]/10 hover:text-white hover:border-[#b0bf00]/40">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-[#b0bf00]/20 bg-[#020e27]/50 text-gray-300 hover:bg-[#b0bf00]/10 hover:text-white hover:border-[#b0bf00]/40">
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