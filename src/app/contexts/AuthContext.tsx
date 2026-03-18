import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'employee' | 'office_head' | 'admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  isSuperAdminGranted?: boolean; // For admins granted super admin privileges
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, demoRole?: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  { id: '1', name: 'John Doe', email: 'employee@demo.com', role: 'employee', department: 'IT' },
  { id: '2', name: 'Jane Smith', email: 'hr@demo.com', role: 'office_head', department: 'HR' },
  { id: '3', name: 'Mike Johnson', email: 'admin@demo.com', role: 'admin', department: 'Administration' },
  { id: '4', name: 'Sarah Wilson', email: 'superadmin@demo.com', role: 'super_admin', department: 'Executive' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, demoRole?: UserRole): Promise<boolean> => {
    // Demo mode: if demoRole is provided, use it
    if (demoRole) {
      const demoUser = MOCK_USERS.find(u => u.role === demoRole);
      if (demoUser) {
        setUser(demoUser);
        return true;
      }
    }

    // Normal login: find user by email
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
