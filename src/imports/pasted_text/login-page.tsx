import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import logo from "../../assets/logo.png";

// --- Custom Components ---

const HoneycombPattern = ({ className }: { className?: string }) => (
  <svg 
    className={`absolute pointer-events-none opacity-20 ${className}`} 
    width="400" 
    height="400" 
    viewBox="0 0 450 450" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <polygon id="hex" points="0,-100 86.6,-50 86.6,50 0,100 -86.6,50 -86.6,-50" />
    </defs>
    <g stroke="#C9D866" strokeWidth="2" fill="none" strokeLinejoin="round">
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
    // Logic remains same...
    const mockUser = { id: "EMP-1", name: "User", role: selectedRole };
    setUser(mockUser);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-[#020c1b] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <HoneycombPattern className="top-[-10%] left-[-5%]" />
      <HoneycombPattern className="bottom-[-10%] right-[-5%]" />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020c1b]/50 to-[#020c1b]"></div>

      <Card className="w-full max-w-md bg-[#051124]/90 border border-[#c9d866]/30 shadow-[0_0_40px_rgba(0,0,0,0.7)] z-10 rounded-xl overflow-hidden backdrop-blur-md">
        <CardHeader className="space-y-4 text-center pt-10">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-[#1a2a44] to-[#020c1b] rounded-xl border border-[#c9d866]/50 shadow-lg">
              <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-[0.1em] text-[#c9d866] uppercase">
            Human Resource<br/>Ticketing
          </h1>
        </CardHeader>

        <CardContent className="px-8 pb-10">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Fields */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#c9d866] uppercase tracking-wider ml-1">
                Employee ID / Email
              </label>
              <input
                type="text"
                placeholder="Enter your Employee ID or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 bg-[#0a192f] border border-[#1e2d45] rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9d866] transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#c9d866] uppercase tracking-wider ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-[#0a192f] border border-[#1e2d45] rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9d866] transition-colors"
                required
              />
            </div>

            {/* Main Sign In Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-[#c9d866] hover:bg-[#d9e876] text-[#020c1b] font-bold text-base rounded-lg transition-transform active:scale-[0.98] shadow-[0_4px_20px_rgba(201,216,102,0.2)]"
            >
              Sign In
            </Button>

            {/* Demo Role Selector */}
            <div className="pt-6 mt-4 border-t border-[#1e2d45]">
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mb-4">
                Demo Mode - Select Role
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["Employee", "HR", "Admin"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role.toLowerCase())}
                    className={`py-2 text-[11px] font-bold uppercase rounded border transition-all ${
                      selectedRole === role.toLowerCase()
                        ? "bg-transparent border-[#c9d866] text-[#c9d866] shadow-[0_0_10px_rgba(201,216,102,0.3)]"
                        : "bg-[#0a192f] border-[#1e2d45] text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}