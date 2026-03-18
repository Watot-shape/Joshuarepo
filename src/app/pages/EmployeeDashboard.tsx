import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useTickets, Ticket } from '../contexts/TicketContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, LogOut, FolderOpen, Clock, CheckCircle2, Filter, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { TicketPriority } from '../contexts/TicketContext';

export function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { tickets, createTicket } = useTickets();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [department, setDepartment] = useState('');

  // Filter tickets created by current user
  const myTickets = tickets.filter(ticket => ticket.createdBy === user?.id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    createTicket({
      title,
      description,
      category,
      priority,
      status: 'open',
      createdBy: user.id,
      createdByName: user.name,
      department,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('medium');
    setDepartment('');
    setIsCreateDialogOpen(false);
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsViewDialogOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'in_progress':
        return 'bg-[#b0bf00]/20 text-[#b0bf00] border-[#b0bf00]';
      case 'resolved':
        return 'bg-green-500/20 text-green-300 border-green-400';
      case 'closed':
        return 'bg-gray-500/20 text-gray-300 border-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'In Progress';
      case 'open':
        return 'Open';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  // Generate ticket ID
  const generateTicketId = (index: number) => {
    const year = new Date().getFullYear();
    return `TKT-${year}-${String(index + 1).padStart(3, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a2342] relative overflow-hidden">
      {/* Hexagonal Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,51 12.3,43.7 12.3,29.2" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              <polygon points="50,0 62.5,7.2 62.5,21.7 50,29 37.5,21.7 37.5,7.2" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              <polygon points="0,0 12.5,7.2 12.5,21.7 0,29 -12.5,21.7 -12.5,7.2" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d4af37] rounded flex items-center justify-center">
                <span className="text-xl font-bold text-[#0a2342]">HR</span>
              </div>
              <span className="text-white font-semibold">HR Ticketing</span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-[#d4af37] text-xs uppercase">Employee</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-transparent border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a2342]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-gray-300">Welcome back, {user?.name}</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0d2d4f]/50 border-2 border-[#d4af37] rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Open Tickets</p>
                <p className="text-4xl font-bold text-white">{myTickets.filter(t => t.status === 'open').length}</p>
              </div>
              <FolderOpen className="w-10 h-10 text-[#d4af37]" />
            </div>
          </div>

          <div className="bg-[#0d2d4f]/50 border-2 border-[#d4af37] rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Waiting</p>
                <p className="text-4xl font-bold text-white">{myTickets.filter(t => t.status === 'in_progress').length}</p>
              </div>
              <Clock className="w-10 h-10 text-[#d4af37]" />
            </div>
          </div>

          <div className="bg-[#0d2d4f]/50 border-2 border-[#d4af37] rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Resolved</p>
                <p className="text-4xl font-bold text-white">{myTickets.filter(t => t.status === 'resolved').length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-[#d4af37]" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#d4af37] hover:bg-[#c9a532] text-[#0a2342] font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Create New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#0d2d4f] border-[#d4af37]">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Ticket</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Fill out the form below to submit a new support ticket
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">Subject</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Brief description of your request"
                    className="bg-white/10 border-[#d4af37]/30 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide detailed information about your request"
                    rows={4}
                    className="bg-white/10 border-[#d4af37]/30 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger className="bg-white/10 border-[#d4af37]/30 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Personal Function">Personal Function</SelectItem>
                        <SelectItem value="Leave Request">Leave Request</SelectItem>
                        <SelectItem value="IT Support">IT Support</SelectItem>
                        <SelectItem value="Payroll">Payroll</SelectItem>
                        <SelectItem value="Benefits">Benefits</SelectItem>
                        <SelectItem value="Training">Training</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-white">Priority</Label>
                    <Select value={priority} onValueChange={(val) => setPriority(val as TicketPriority)} required>
                      <SelectTrigger className="bg-white/10 border-[#d4af37]/30 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="department" className="text-white">Target Department</Label>
                  <Select value={department} onValueChange={setDepartment} required>
                    <SelectTrigger className="bg-white/10 border-[#d4af37]/30 text-white">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="IT">IT Department</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="bg-transparent border-gray-400 text-gray-300">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#d4af37] hover:bg-[#c9a532] text-[#0a2342]">
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="bg-transparent border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/20">
            <Filter className="w-4 h-4 mr-2" />
            Filter Tickets
          </Button>
        </div>

        {/* Tickets Table */}
        <div className="bg-[#0d2d4f]/50 border border-[#d4af37]/30 rounded-lg backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-[#d4af37]/20">
            <h2 className="text-xl font-semibold text-white mb-1">My Tickets</h2>
            <p className="text-gray-300 text-sm">View and track your submitted requests</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#d4af37]/20">
                  <th className="text-left px-6 py-4 text-[#d4af37] font-medium">Ticket ID</th>
                  <th className="text-left px-6 py-4 text-[#d4af37] font-medium">Category</th>
                  <th className="text-left px-6 py-4 text-[#d4af37] font-medium">Subject</th>
                  <th className="text-left px-6 py-4 text-[#d4af37] font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-[#d4af37] font-medium">Assigned To</th>
                  <th className="text-left px-6 py-4 text-[#d4af37] font-medium">Last Updated</th>
                  <th className="text-left px-6 py-4 text-[#d4af37] font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {myTickets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      No tickets found. Create your first ticket to get started.
                    </td>
                  </tr>
                ) : (
                  myTickets.map((ticket, index) => (
                    <tr key={ticket.id} className="border-b border-[#d4af37]/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-mono text-sm">{generateTicketId(index)}</td>
                      <td className="px-6 py-4 text-gray-300">{ticket.category}</td>
                      <td className="px-6 py-4 text-white max-w-xs truncate">{ticket.title}</td>
                      <td className="px-6 py-4">
                        <Badge className={`${getStatusBadgeColor(ticket.status)} border px-3 py-1`}>
                          {getStatusLabel(ticket.status)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{ticket.assignedToName || '-'}</td>
                      <td className="px-6 py-4 text-gray-300">{format(ticket.updatedAt, 'dd/MM/yyyy')}</td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewTicket(ticket)}
                          className="text-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/20"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* View Ticket Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl bg-[#0d2d4f] border-[#d4af37]">
          <DialogHeader>
            <DialogTitle className="text-white">Ticket Details</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Ticket ID</Label>
                  <p className="text-white font-mono">{generateTicketId(myTickets.findIndex(t => t.id === selectedTicket.id))}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Status</Label>
                  <div className="mt-1">
                    <Badge className={`${getStatusBadgeColor(selectedTicket.status)} border`}>
                      {getStatusLabel(selectedTicket.status)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Category</Label>
                  <p className="text-white">{selectedTicket.category}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Priority</Label>
                  <p className="text-white capitalize">{selectedTicket.priority}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-400">Subject</Label>
                <p className="text-white">{selectedTicket.title}</p>
              </div>
              <div>
                <Label className="text-gray-400">Description</Label>
                <p className="text-white bg-white/5 p-3 rounded">{selectedTicket.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Assigned To</Label>
                  <p className="text-white">{selectedTicket.assignedToName || 'Not assigned yet'}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Last Updated</Label>
                  <p className="text-white">{format(selectedTicket.updatedAt, 'dd/MM/yyyy HH:mm')}</p>
                </div>
              </div>
              {selectedTicket.comments.length > 0 && (
                <div>
                  <Label className="text-gray-400">Comments ({selectedTicket.comments.length})</Label>
                  <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                    {selectedTicket.comments.map((comment) => (
                      <div key={comment.id} className="bg-white/5 p-3 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[#d4af37] font-medium text-sm">{comment.userName}</span>
                          <span className="text-gray-400 text-xs">{format(comment.createdAt, 'MMM dd, HH:mm')}</span>
                        </div>
                        <p className="text-white text-sm">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}