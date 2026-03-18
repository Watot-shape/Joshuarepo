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
  FileText,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';

export function AdminTicketDetail() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets, updateTicket, addComment } = useTickets();
  const [comment, setComment] = useState('');

  const ticket = tickets.find(t => t.id === ticketId);

  if (!ticket) {
    return (
      <DashboardLayout title="Ticket Not Found">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Ticket Not Found</h2>
            <p className="text-gray-400 mb-6">The ticket you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/dashboard/admin')}>
              Back to Admin Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_progress':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
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

  const handleApprove = () => {
    updateTicket(ticket.id, { status: 'in_progress' });
    if (comment.trim()) {
      addComment(ticket.id, {
        ticketId: ticket.id,
        userId: user?.id || '0',
        userName: user?.name || 'Admin',
        userRole: user?.role || 'admin',
        comment: `APPROVED BY ADMIN: ${comment}`,
      });
    }
    setComment('');
  };

  const handleCancel = () => {
    updateTicket(ticket.id, { status: 'closed' });
    if (comment.trim()) {
      addComment(ticket.id, {
        ticketId: ticket.id,
        userId: user?.id || '0',
        userName: user?.name || 'Admin',
        userRole: user?.role || 'admin',
        comment: `CANCELLED BY ADMIN: ${comment}`,
      });
    }
    setComment('');
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment(ticket.id, {
        ticketId: ticket.id,
        userId: user?.id || '0',
        userName: user?.name || 'Admin',
        userRole: user?.role || 'admin',
        comment: comment.trim(),
      });
      setComment('');
    }
  };

  return (
    <DashboardLayout title="Ticket Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/dashboard/admin')}
            variant="outline"
            className="border-[#b0bf00]/20 bg-[#020e27]/50 text-gray-300 hover:bg-[#b0bf00]/10 hover:text-white hover:border-[#b0bf00]/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#b0bf00] to-[#8a9400]" style={{
              boxShadow: '0 4px 16px rgba(176, 191, 0, 0.3)'
            }}>
              <FileText className="w-6 h-6 text-[#020e27]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{ticket.id}</h2>
              <p className="text-sm text-gray-400">Administrative Ticket Management</p>
            </div>
          </div>

          {/* Admin Badge */}
          <div className="px-4 py-2 rounded-xl" style={{
            background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.2) 0%, rgba(176, 191, 0, 0.1) 100%)',
            border: '1px solid rgba(176, 191, 0, 0.3)'
          }}>
            <p className="text-xs text-gray-400">Viewing as</p>
            <p className="text-sm font-bold text-[#b0bf00]">Administrator</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Details - Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="rounded-2xl p-6 backdrop-blur-xl" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
              border: '1px solid rgba(176, 191, 0, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{ticket.title}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{ticket.createdByName}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(ticket.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(ticket.createdAt), 'h:mm a')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#020e27]/50">
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Category
                  </p>
                  <p className="text-white font-semibold">{ticket.category}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#020e27]/50">
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Priority
                  </p>
                  <Badge className={`${getPriorityColor(ticket.priority)} border font-semibold capitalize`}>
                    {ticket.priority}
                  </Badge>
                </div>
                <div className="p-4 rounded-xl bg-[#020e27]/50">
                  <p className="text-xs text-gray-500 mb-2">Status</p>
                  <Badge className={`${getStatusColor(ticket.status)} border font-semibold capitalize`}>
                    {ticket.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="p-4 rounded-xl bg-[#020e27]/50">
                  <p className="text-xs text-gray-500 mb-2">Department</p>
                  <p className="text-white font-semibold">{ticket.department}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-[#020e27]/50">
                <p className="text-xs text-gray-500 mb-2">Description</p>
                <p className="text-gray-300 leading-relaxed">{ticket.description}</p>
              </div>

              {/* Assignment Info */}
              {ticket.assignedToName && (
                <div className="mt-4 p-4 rounded-xl" style={{
                  background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(176, 191, 0, 0.05) 100%)',
                  border: '1px solid rgba(176, 191, 0, 0.2)'
                }}>
                  <p className="text-xs text-gray-500 mb-2">Assigned Office Head</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#b0bf00]/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-[#b0bf00]" />
                    </div>
                    <span className="text-white font-semibold">{ticket.assignedToName}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Comments History */}
            {ticket.comments && ticket.comments.length > 0 && (
              <div className="rounded-2xl p-6 backdrop-blur-xl" style={{
                background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
                border: '1px solid rgba(176, 191, 0, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#b0bf00]" />
                  Comments History ({ticket.comments.length})
                </h3>
                <div className="space-y-3">
                  {ticket.comments.map((c, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#020e27]/50 border border-[#b0bf00]/10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#b0bf00]/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-[#b0bf00]">{c.userName.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{c.userName}</p>
                            <p className="text-xs text-gray-500 capitalize">{c.userRole.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{format(new Date(c.createdAt), 'MMM dd, h:mm a')}</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{c.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Panel - Right Section */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-6 backdrop-blur-xl sticky top-6" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.05) 0%, rgba(2, 14, 39, 0.5) 100%)',
              border: '1px solid rgba(176, 191, 0, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 className="text-lg font-bold text-white mb-6">Admin Actions</h3>

              {/* Add Comment Section */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-white mb-3 block">Add Comment</label>
                <Textarea
                  placeholder="Write your administrative comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-[#020e27]/50 border-[#b0bf00]/20 text-white placeholder:text-gray-500 focus:border-[#b0bf00] focus:ring-[#b0bf00]/30 min-h-[120px] mb-3"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!comment.trim()}
                  className="w-full bg-[#020e27]/80 border border-[#b0bf00]/30 text-[#b0bf00] hover:bg-[#b0bf00]/10"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-[#b0bf00]/10">
                <p className="text-xs text-gray-400 mb-3">Ticket Management</p>
                <Button
                  onClick={handleApprove}
                  disabled={ticket.status === 'in_progress' || ticket.status === 'resolved' || ticket.status === 'closed'}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: ticket.status === 'open' ? '0 4px 16px rgba(34, 197, 94, 0.3)' : 'none'
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {ticket.status === 'in_progress' ? 'Already Approved' : 'Approve Ticket'}
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={ticket.status === 'closed'}
                  variant="outline"
                  className="w-full border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  {ticket.status === 'closed' ? 'Already Cancelled' : 'Cancel Ticket'}
                </Button>
              </div>

              {/* Admin Notice */}
              <div className="mt-6 p-4 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <p className="text-xs text-blue-400 leading-relaxed">
                  <strong>Admin Note:</strong> You have full access to view and manage all tickets across all categories. Changes made here will be visible to the assigned office heads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
