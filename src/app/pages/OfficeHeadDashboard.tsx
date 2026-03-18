import { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTickets, Ticket } from '../contexts/TicketContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { MessageSquare, Send, Clock, CheckCircle, Inbox } from 'lucide-react';
import { format } from 'date-fns';

export function OfficeHeadDashboard() {
  const { user } = useAuth();
  const { tickets, addComment, updateTicket, assignTicket } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [commentText, setCommentText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [assignTo, setAssignTo] = useState('');

  // Filter tickets for this office head's department or assigned to them
  const myTickets = tickets.filter(
    ticket => ticket.department === user?.department || ticket.assignedTo === user?.id
  );

  const handleAddComment = () => {
    if (!selectedTicket || !user || !commentText.trim()) return;

    addComment(selectedTicket.id, {
      ticketId: selectedTicket.id,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      comment: commentText,
    });

    setCommentText('');
    // Refresh the selected ticket
    const updatedTicket = tickets.find(t => t.id === selectedTicket.id);
    if (updatedTicket) {
      setSelectedTicket(updatedTicket);
    }
  };

  const handleUpdateStatus = () => {
    if (!selectedTicket || !newStatus) return;
    updateTicket(selectedTicket.id, { status: newStatus as any });
    setNewStatus('');
  };

  const handleForwardTicket = () => {
    if (!selectedTicket || !assignTo) return;
    
    // Mock office heads - in real app, fetch from database
    const officeHeads = [
      { id: '5', name: 'Alex Brown', department: 'IT' },
      { id: '6', name: 'Lisa Davis', department: 'Finance' },
      { id: '7', name: 'Tom Wilson', department: 'Administration' },
    ];

    const selectedHead = officeHeads.find(h => h.id === assignTo);
    if (selectedHead) {
      assignTicket(selectedTicket.id, selectedHead.id, selectedHead.name);
    }
    
    setAssignTo('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'resolved':
        return 'bg-green-500';
      case 'closed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Office Head Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage tickets for {user?.department} department</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myTickets.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Open</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {myTickets.filter(t => t.status === 'open').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {myTickets.filter(t => t.status === 'in_progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {myTickets.filter(t => t.status === 'resolved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Tickets</CardTitle>
              <CardDescription>Review and manage tickets in your department</CardDescription>
            </CardHeader>
            <CardContent>
              {myTickets.length === 0 ? (
                <div className="text-center py-12">
                  <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No tickets assigned to your department</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {myTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedTicket?.id === ticket.id
                          ? 'bg-blue-50 border-blue-300'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                        <Badge className={`${getStatusColor(ticket.status)} text-white text-xs`}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{ticket.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getPriorityColor(ticket.priority)} text-white text-xs`}>
                          {ticket.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{ticket.category}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>From: {ticket.createdByName}</span>
                        <span>•</span>
                        <span>{format(ticket.createdAt, 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ticket Details */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
              <CardDescription>
                {selectedTicket ? 'Add comments and manage ticket status' : 'Select a ticket to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTicket ? (
                <div className="space-y-4">
                  {/* Ticket Info */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{selectedTicket.title}</h3>
                    <div className="flex gap-2 mb-3">
                      <Badge className={`${getStatusColor(selectedTicket.status)} text-white`}>
                        {selectedTicket.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={`${getPriorityColor(selectedTicket.priority)} text-white`}>
                        {selectedTicket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{selectedTicket.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Category:</span> {selectedTicket.category}
                      </div>
                      <div>
                        <span className="font-medium">Department:</span> {selectedTicket.department}
                      </div>
                      <div>
                        <span className="font-medium">Created by:</span> {selectedTicket.createdByName}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {format(selectedTicket.createdAt, 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <h4 className="font-medium mb-2">Comments ({selectedTicket.comments.length})</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                      {selectedTicket.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{comment.userName}</span>
                            <span className="text-xs text-gray-500">
                              {format(comment.createdAt, 'MMM dd, HH:mm')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={3}
                      />
                      <Button
                        onClick={handleAddComment}
                        className="w-full bg-[#d4af37] hover:bg-[#c9a532] text-[#0a2342]"
                        disabled={!commentText.trim()}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Add Comment
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-3 border-t">
                    <div>
                      <Label>Update Status</Label>
                      <div className="flex gap-2">
                        <Select value={newStatus} onValueChange={setNewStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={handleUpdateStatus} disabled={!newStatus}>
                          Update
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Forward to Office Head</Label>
                      <div className="flex gap-2">
                        <Select value={assignTo} onValueChange={setAssignTo}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select office head" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">Alex Brown (IT)</SelectItem>
                            <SelectItem value="6">Lisa Davis (Finance)</SelectItem>
                            <SelectItem value="7">Tom Wilson (Administration)</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button onClick={handleForwardTicket} disabled={!assignTo}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a ticket from the list to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
