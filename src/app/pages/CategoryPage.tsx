import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  User, 
  Calendar,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets, updateTicket, addComment } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  // Get tickets for this category
  const categoryTickets = tickets.filter(t => t.category === category);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Payroll': return '💰';
      case 'Benefits': return '🎁';
      case 'Onboarding': return '👋';
      case 'Leave': return '🏖️';
      default: return '📋';
    }
  };

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
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleApprove = (ticketId: string) => {
    updateTicket(ticketId, { status: 'in_progress' });
    if (comment.trim()) {
      addComment(ticketId, {
        ticketId,
        userId: user?.id || '0',
        userName: user?.name || 'HR',
        userRole: user?.role || 'admin',
        comment: `APPROVED: ${comment}`,
      });
    }
    setComment('');
    setSelectedTicket(null);
  };

  const handleCancel = (ticketId: string) => {
    updateTicket(ticketId, { status: 'closed' });
    if (comment.trim()) {
      addComment(ticketId, {
        ticketId,
        userId: user?.id || '0',
        userName: user?.name || 'HR',
        userRole: user?.role || 'admin',
        comment: `CANCELLED: ${comment}`,
      });
    }
    setComment('');
    setSelectedTicket(null);
  };

  const handleAddComment = (ticketId: string) => {
    if (comment.trim()) {
      addComment(ticketId, {
        ticketId,
        userId: user?.id || '0',
        userName: user?.name || 'HR',
        userRole: user?.role || 'admin',
        comment: comment.trim(),
      });
      setComment('');
    }
  };

  const selectedTicketData = categoryTickets.find(t => t.id === selectedTicket);

  return (
    <DashboardLayout title={`${category} Management`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/dashboard/overview')}
            variant="outline"
            className="border-[#b0bf00]/20 bg-[#020e27]/50 text-gray-300 hover:bg-[#b0bf00]/10 hover:text-white hover:border-[#b0bf00]/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[#b0bf00] to-[#8a9400]" style={{
              boxShadow: '0 4px 16px rgba(176, 191, 0, 0.3)'
            }}>
              {getCategoryIcon(category || '')}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{category}</h2>
              <p className="text-sm text-gray-400">{categoryTickets.length} ticket{categoryTickets.length !== 1 ? 's' : ''} in this category</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="lg:col-span-2 space-y-4">
            {categoryTickets.length > 0 ? (
              categoryTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`rounded-2xl p-6 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    selectedTicket === ticket.id ? 'ring-2 ring-[#b0bf00]' : ''
                  }`}
                  style={{
                    background: selectedTicket === ticket.id 
                      ? 'linear-gradient(135deg, rgba(176, 191, 0, 0.15) 0%, rgba(2, 14, 39, 0.5) 100%)'
                      : 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
                    border: selectedTicket === ticket.id 
                      ? '1px solid rgba(176, 191, 0, 0.4)' 
                      : '1px solid rgba(176, 191, 0, 0.15)',
                    boxShadow: selectedTicket === ticket.id
                      ? '0 8px 32px rgba(176, 191, 0, 0.2)'
                      : '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Ticket Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.2) 0%, rgba(176, 191, 0, 0.1) 100%)',
                        border: '1px solid rgba(176, 191, 0, 0.3)'
                      }}>
                        <User className="w-5 h-5 text-[#b0bf00]" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-white">{ticket.id}</p>
                        <p className="text-xs text-gray-400">{ticket.createdByName}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(ticket.status)} border font-semibold`}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Ticket Description */}
                  <p className="text-gray-300 mb-4 line-clamp-2">{ticket.description}</p>

                  {/* Ticket Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(ticket.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{format(new Date(ticket.createdAt), 'h:mm a')}</span>
                    </div>
                    {ticket.comments && ticket.comments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{ticket.comments.length} comment{ticket.comments.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  {/* Selected Indicator */}
                  {selectedTicket === ticket.id && (
                    <div className="mt-4 pt-4 border-t border-[#b0bf00]/20">
                      <p className="text-xs text-[#b0bf00] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Selected - View details on the right panel
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-2xl p-12 backdrop-blur-xl text-center" style={{
                background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
                border: '1px solid rgba(176, 191, 0, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                  background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(176, 191, 0, 0.05) 100%)',
                  border: '1px solid rgba(176, 191, 0, 0.2)'
                }}>
                  <MessageSquare className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-300 font-semibold text-lg mb-1">No tickets in this category</p>
                <p className="text-sm text-gray-500">Tickets will appear here when submitted</p>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-6 backdrop-blur-xl sticky top-6" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
              border: '1px solid rgba(176, 191, 0, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              {selectedTicketData ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Ticket Details</h3>
                    
                    {/* Ticket Info */}
                    <div className="space-y-3 mb-6">
                      <div className="p-3 rounded-lg bg-[#020e27]/50">
                        <p className="text-xs text-gray-500 mb-1">Ticket ID</p>
                        <p className="font-mono font-bold text-white">{selectedTicketData.id}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#020e27]/50">
                        <p className="text-xs text-gray-500 mb-1">Employee Name</p>
                        <p className="text-white">{selectedTicketData.createdByName}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#020e27]/50">
                        <p className="text-xs text-gray-500 mb-1">Title</p>
                        <p className="text-white font-semibold">{selectedTicketData.title}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#020e27]/50">
                        <p className="text-xs text-gray-500 mb-1">Description</p>
                        <p className="text-gray-300 text-sm">{selectedTicketData.description}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#020e27]/50">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <Badge className={`${getStatusColor(selectedTicketData.status)} border font-semibold`}>
                          {selectedTicketData.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-white mb-3">Add Comment</p>
                      <Textarea
                        placeholder="Write your comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="bg-[#020e27]/50 border-[#b0bf00]/20 text-white placeholder:text-gray-500 focus:border-[#b0bf00] focus:ring-[#b0bf00]/30 min-h-[100px]"
                      />
                      <Button
                        onClick={() => handleAddComment(selectedTicketData.id)}
                        disabled={!comment.trim()}
                        className="w-full mt-3 bg-[#020e27]/80 border border-[#b0bf00]/30 text-[#b0bf00] hover:bg-[#b0bf00]/10"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Add Comment
                      </Button>
                    </div>

                    {/* Previous Comments */}
                    {selectedTicketData.comments && selectedTicketData.comments.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-white mb-3">Previous Comments</p>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {selectedTicketData.comments.map((c, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-[#020e27]/50 border border-[#b0bf00]/10">
                              <p className="text-xs text-gray-500 mb-1">{c.userName} - {format(new Date(c.createdAt), 'MMM dd, h:mm a')}</p>
                              <p className="text-sm text-gray-300">{c.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t border-[#b0bf00]/10">
                      <Button
                        onClick={() => handleApprove(selectedTicketData.id)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                        style={{
                          boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve & Pass to Office Head
                      </Button>
                      <Button
                        onClick={() => handleCancel(selectedTicketData.id)}
                        variant="outline"
                        className="w-full border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                    background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(176, 191, 0, 0.05) 100%)',
                    border: '1px solid rgba(176, 191, 0, 0.2)'
                  }}>
                    <MessageSquare className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-sm">Select a ticket to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}