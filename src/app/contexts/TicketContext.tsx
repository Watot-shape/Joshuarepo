import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from './AuthContext';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  comment: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdBy: string;
  createdByName: string;
  assignedTo?: string;
  assignedToName?: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  comments: TicketComment[];
}

interface TicketContextType {
  tickets: Ticket[];
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  addComment: (ticketId: string, comment: Omit<TicketComment, 'id' | 'createdAt'>) => void;
  assignTicket: (ticketId: string, assignedTo: string, assignedToName: string) => void;
  deleteTicket: (id: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Mock initial tickets
const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Salary Adjustment Request',
    description: 'I would like to request a salary review based on my performance over the past year and increased responsibilities.',
    category: 'Payroll',
    priority: 'medium',
    status: 'open',
    createdBy: '1',
    createdByName: 'John Doe',
    assignedTo: '2',
    assignedToName: 'Jane Smith',
    department: 'HR',
    createdAt: new Date('2026-03-15'),
    updatedAt: new Date('2026-03-15'),
    comments: [],
  },
  {
    id: 'TKT-002',
    title: 'Payroll Discrepancy',
    description: 'There seems to be a discrepancy in my last paycheck. The overtime hours were not calculated correctly.',
    category: 'Payroll',
    priority: 'high',
    status: 'in_progress',
    createdBy: '1',
    createdByName: 'Sarah Johnson',
    assignedTo: '3',
    assignedToName: 'Mike Johnson',
    department: 'HR',
    createdAt: new Date('2026-03-14'),
    updatedAt: new Date('2026-03-16'),
    comments: [
      {
        id: '1',
        ticketId: 'TKT-002',
        userId: '3',
        userName: 'Mike Johnson',
        userRole: 'admin',
        comment: 'Reviewing the payroll records. Will update you shortly.',
        createdAt: new Date('2026-03-16'),
      },
    ],
  },
  {
    id: 'TKT-003',
    title: 'Health Insurance Enrollment',
    description: 'I would like to enroll in the company health insurance plan. Please provide information about available options.',
    category: 'Benefits',
    priority: 'medium',
    status: 'open',
    createdBy: '2',
    createdByName: 'Emily Chen',
    assignedTo: '2',
    assignedToName: 'Jane Smith',
    department: 'HR',
    createdAt: new Date('2026-03-13'),
    updatedAt: new Date('2026-03-13'),
    comments: [],
  },
  {
    id: 'TKT-004',
    title: 'Retirement Plan Question',
    description: 'Can you explain the company 401k matching policy and how I can increase my contribution?',
    category: 'Benefits',
    priority: 'low',
    status: 'open',
    createdBy: '3',
    createdByName: 'Robert Martinez',
    assignedTo: '2',
    assignedToName: 'Jane Smith',
    department: 'HR',
    createdAt: new Date('2026-03-12'),
    updatedAt: new Date('2026-03-12'),
    comments: [],
  },
  {
    id: 'TKT-005',
    title: 'New Employee Orientation',
    description: 'I am starting next Monday and need information about the onboarding process and first day schedule.',
    category: 'Onboarding',
    priority: 'high',
    status: 'in_progress',
    createdBy: '4',
    createdByName: 'Lisa Anderson',
    assignedTo: '2',
    assignedToName: 'Jane Smith',
    department: 'HR',
    createdAt: new Date('2026-03-11'),
    updatedAt: new Date('2026-03-14'),
    comments: [
      {
        id: '2',
        ticketId: 'TKT-005',
        userId: '2',
        userName: 'Jane Smith',
        userRole: 'office_head',
        comment: 'Welcome! I will send you the onboarding schedule by email today.',
        createdAt: new Date('2026-03-14'),
      },
    ],
  },
  {
    id: 'TKT-006',
    title: 'Equipment Setup Request',
    description: 'Need laptop, monitor, and desk phone setup before my start date on Monday.',
    category: 'Onboarding',
    priority: 'urgent',
    status: 'open',
    createdBy: '5',
    createdByName: 'David Kim',
    assignedTo: '3',
    assignedToName: 'Mike Johnson',
    department: 'IT',
    createdAt: new Date('2026-03-16'),
    updatedAt: new Date('2026-03-16'),
    comments: [],
  },
  {
    id: 'TKT-007',
    title: 'Tax Form Correction',
    description: 'I need to update my W-4 tax form. There was an error in my initial submission.',
    category: 'Payroll',
    priority: 'medium',
    status: 'open',
    createdBy: '6',
    createdByName: 'Maria Garcia',
    assignedTo: '2',
    assignedToName: 'Jane Smith',
    department: 'HR',
    createdAt: new Date('2026-03-17'),
    updatedAt: new Date('2026-03-17'),
    comments: [],
  },
  {
    id: 'TKT-008',
    title: 'PTO Balance Inquiry',
    description: 'Can you confirm my current PTO balance? The employee portal shows inconsistent data.',
    category: 'Benefits',
    priority: 'low',
    status: 'resolved',
    createdBy: '7',
    createdByName: 'James Wilson',
    assignedTo: '2',
    assignedToName: 'Jane Smith',
    department: 'HR',
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-03-15'),
    comments: [
      {
        id: '3',
        ticketId: 'TKT-008',
        userId: '2',
        userName: 'Jane Smith',
        userRole: 'office_head',
        comment: 'Your current PTO balance is 15 days. The portal has been updated.',
        createdAt: new Date('2026-03-15'),
      },
    ],
  },
];

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    };
    setTickets([newTicket, ...tickets]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(tickets.map(ticket =>
      ticket.id === id
        ? { ...ticket, ...updates, updatedAt: new Date() }
        : ticket
    ));
  };

  const addComment = (ticketId: string, commentData: Omit<TicketComment, 'id' | 'createdAt'>) => {
    const newComment: TicketComment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setTickets(tickets.map(ticket =>
      ticket.id === ticketId
        ? {
            ...ticket,
            comments: [...ticket.comments, newComment],
            updatedAt: new Date(),
          }
        : ticket
    ));
  };

  const assignTicket = (ticketId: string, assignedTo: string, assignedToName: string) => {
    updateTicket(ticketId, { assignedTo, assignedToName, status: 'in_progress' });
  };

  const deleteTicket = (id: string) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      createTicket,
      updateTicket,
      addComment,
      assignTicket,
      deleteTicket,
    }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}