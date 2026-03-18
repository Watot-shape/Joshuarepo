import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../../assets/logo.png";
import "../../../styles/login.css";

const mockUsers = [
  { id: "HR-001", name: "HR Admin", email: "hr@company.com", role: "hr" as const },
  { id: "SYS-001", name: "System Admin", email: "admin@company.com", role: "admin" as const }
];

const HoneycombPattern = ({ className }: { className?: string }) => (
  <svg 
    className={`absolute pointer-events-none ${className}`} 
    width="500" 
    height="500" 
    viewBox="0 0 450 450" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <polygon id="hex" points="0,-100 86.6,-50 86.6,50 0,100 -86.6,50 -86.6,-50" />
    </defs>
    <g opacity="0.15" stroke="#C9D866" strokeWidth="4" fill="none" strokeLinejoin="round">
      <use href="#hex" x="173.2" y="150" />
      <use href="#hex" x="86.6" y="0" />
      <use href="#hex" x="259.8" y="0" />
      <use href="#hex" x="0" y="150" />
      <use href="#hex" x="346.4" y="150" />
      <use href="#hex" x="86.6" y="300" />
      <use href="#hex" x="259.8" y="300" />
    </g>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("employee");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let mockUser;
    if (selectedRole === "employee") {
      mockUser = { id: "EMP-1234", name: "Sarah Johnson", email: "sarah@company.com", role: "employee" };
    } else {
      mockUser = mockUsers.find(u => u.role === selectedRole);
    }
    setUser(mockUser);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="login-page-container">
      {/* Background patterns exactly like the photo */}
      <HoneycombPattern className="top-[-5%] left-[-5%] scale-125" />
      <HoneycombPattern className="bottom-[-10%] right-[-5%] scale-110" />
      
      {/* Decorative Line Art (Top Right from photo) */}
      <div className="absolute top-10 right-20 opacity-20 hidden lg:block">
        <div className="border-t border-r border-[#C9D866] w-40 h-40 rounded-tr-3xl"></div>
        <div className="border-t border-r border-[#C9D866] w-32 h-32 rounded-tr-2xl mt-[-150px] ml-4"></div>
      </div>

      <div className="login-card-cyber z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="logo-wrapper">
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            </div>
          </div>
          <h1 className="cyber-title">
            HUMAN RESOURCE<br/>TICKETING
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="cyber-label">Employee ID / Email</label>
            <input
              type="text"
              placeholder="Enter your Employee ID or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cyber-input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="cyber-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cyber-input"
              required
            />
          </div>

          <button type="submit" className="cyber-button-primary">
            Sign In
          </button>

          <div className="pt-6 border-t border-white/10">
            <p className="demo-mode-text">DEMO MODE - SELECT ROLE</p>
            <div className="grid grid-cols-3 gap-2">
              {['employee', 'hr', 'admin'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`role-btn-cyber ${selectedRole === role ? 'active' : ''}`}
                >
                  {role.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}