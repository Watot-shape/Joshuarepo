import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, UserRole } from '../contexts/AuthContext';
import logoImage from 'figma:asset/e48cc0cb98fd592ad9e208a128194c25b1510164.png';

// Enhanced Honeycomb Pattern Component
const HoneycombPattern = ({ className }: { className?: string }) => (
  <svg 
    className={`absolute pointer-events-none ${className} animate-pulse`} 
    width="600" 
    height="600" 
    viewBox="0 0 450 450" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ animationDuration: '4s' }}
  >
    <defs>
      <polygon id="hex" points="0,-100 86.6,-50 86.6,50 0,100 -86.6,50 -86.6,-50" />
      <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b0bf00" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#b0bf00" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <g stroke="url(#hexGradient)" strokeWidth="3" fill="none" strokeLinejoin="round">
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

// Floating Particles Component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-[#b0bf00] rounded-full opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('employee');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password, selectedRole);
    setIsLoading(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans"
      style={{ 
        background: 'radial-gradient(ellipse at top, #0a1a35 0%, #020e27 50%, #000 100%)'
      }}
    >
      {/* Animated Background patterns */}
      <HoneycombPattern className="top-[-8%] left-[-8%] scale-110" />
      <HoneycombPattern className="bottom-[-12%] right-[-8%] scale-125" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-10 right-20 opacity-20 hidden lg:block">
        <div className="relative">
          <div className="absolute w-60 h-60 bg-[#b0bf00] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="border-t-2 border-r-2 border-[#b0bf00] w-40 h-40 rounded-tr-[3rem]"></div>
          <div className="border-t-2 border-r-2 border-[#b0bf00]/60 w-32 h-32 rounded-tr-[2rem] mt-[-150px] ml-4"></div>
          <div className="border-t border-r border-[#b0bf00]/30 w-24 h-24 rounded-tr-[1.5rem] mt-[-120px] ml-8"></div>
        </div>
      </div>

      {/* Bottom Left Decorative */}
      <div className="absolute bottom-10 left-20 opacity-15 hidden lg:block">
        <div className="relative">
          <div className="absolute w-40 h-40 bg-[#b0bf00] rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="border-b-2 border-l-2 border-[#b0bf00] w-32 h-32 rounded-bl-[2.5rem]"></div>
        </div>
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#b0bf00 1px, transparent 1px), linear-gradient(90deg, #b0bf00 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Login Card */}
      <div 
        className="w-full max-w-[440px] p-12 rounded-3xl relative backdrop-blur-[15px] transform transition-all duration-300 hover:scale-[1.01]"
        style={{
          background: 'linear-gradient(135deg, rgba(5, 22, 43, 0.95) 0%, rgba(2, 14, 39, 0.98) 100%)',
          border: '2px solid rgba(176, 191, 0, 0.3)',
          boxShadow: '0 0 60px rgba(176, 191, 0, 0.15), inset 0 0 30px rgba(176, 191, 0, 0.03), 0 20px 60px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Card Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b0bf00] to-transparent opacity-60"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#b0bf00]/40 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#b0bf00]/40 rounded-br-3xl"></div>

        <div className="text-center mb-10 relative">
          {/* Logo Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#b0bf00] rounded-full blur-[80px] opacity-20"></div>
          
          <div className="flex justify-center mb-6 relative">
            <div 
              className="p-4 rounded-2xl relative group transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '2px solid rgba(176, 191, 0, 0.5)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(176, 191, 0, 0.1) inset'
              }}
            >
              {/* Logo Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#b0bf00]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 flex items-center justify-center relative z-10">
                <img src={logoImage} alt="HR Logo" className="w-full h-full" />
              </div>
              
              {/* Animated Corner Dots */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
          
          <h1 className="text-[1.6rem] font-extrabold tracking-[0.08em] text-[#b0bf00] uppercase leading-[1.3] relative">
            <span className="relative inline-block">
              HUMAN TRAFFICKING
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b0bf00] to-transparent opacity-50"></div>
            </span>
            <br/>
            <span className="text-[1.3rem] tracking-[0.15em] relative inline-block mt-1">
              for JEFRREY EPSTEIN
            </span>
          </h1>
          <p className="text-[#b0bf00]/60 text-xs mt-3 tracking-wider">Secure Access Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#b0bf00] uppercase tracking-[0.05em] block flex items-center gap-2">
              <div className="w-1 h-1 bg-[#b0bf00] rounded-full"></div>
              Employee ID
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter your Employee ID or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 pr-10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(2, 14, 39, 0.7)',
                  border: '1px solid rgba(176, 191, 0, 0.2)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#b0bf00';
                  e.target.style.background = 'rgba(2, 14, 39, 0.95)';
                  e.target.style.boxShadow = '0 0 20px rgba(176, 191, 0, 0.15), inset 0 0 20px rgba(176, 191, 0, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(176, 191, 0, 0.2)';
                  e.target.style.background = 'rgba(2, 14, 39, 0.7)';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#b0bf00]/10 flex items-center justify-center opacity-0 group-focus-within:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-[#b0bf00] animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#b0bf00] uppercase tracking-[0.05em] block flex items-center gap-2">
              <div className="w-1 h-1 bg-[#b0bf00] rounded-full"></div>
              Password
            </label>
            <div className="relative group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(2, 14, 39, 0.7)',
                  border: '1px solid rgba(176, 191, 0, 0.2)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#b0bf00';
                  e.target.style.background = 'rgba(2, 14, 39, 0.95)';
                  e.target.style.boxShadow = '0 0 20px rgba(176, 191, 0, 0.15), inset 0 0 20px rgba(176, 191, 0, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(176, 191, 0, 0.2)';
                  e.target.style.background = 'rgba(2, 14, 39, 0.7)';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#b0bf00]/10 flex items-center justify-center opacity-0 group-focus-within:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-[#b0bf00] animate-pulse"></div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-13 bg-[#b0bf00] hover:bg-[#c5d420] text-[#020e27] border-none rounded-lg font-bold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(176,191,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            style={{
              boxShadow: '0 4px 20px rgba(176, 191, 0, 0.3)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#020e27] border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          </button>

          <div className="pt-6 border-t border-[#b0bf00]/10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#020e27]">
              <div className="w-2 h-2 bg-[#b0bf00]/30 rounded-full"></div>
            </div>
            
            <p className="text-center text-[10px] font-bold text-[#b0bf00]/50 tracking-[0.15em] mb-4">
              DEMO MODE - SELECT ROLE
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'EMPLOYEE', value: 'employee' as UserRole },
                { label: 'HR', value: 'office_head' as UserRole },
                { label: 'ADMIN', value: 'admin' as UserRole }
              ].map((role) => (
                <button
                  key={role.value}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleRoleSelect(role.value)}
                  className={`py-2.5 text-[10px] font-bold rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    selectedRole === role.value
                      ? "text-[#020e27]"
                      : "text-[#b0bf00]/70 hover:text-[#b0bf00]"
                  }`}
                  style={{
                    background: selectedRole === role.value 
                      ? '#b0bf00' 
                      : 'rgba(2, 14, 39, 0.7)',
                    border: selectedRole === role.value 
                      ? '2px solid #b0bf00' 
                      : '1px solid rgba(176, 191, 0, 0.2)',
                    boxShadow: selectedRole === role.value 
                      ? '0 4px 15px rgba(176, 191, 0, 0.3)' 
                      : 'none'
                  }}
                >
                  {selectedRole === role.value && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  )}
                  <span className="relative z-10">{role.label}</span>
                </button>
              ))}
            </div>
            
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleRoleSelect('super_admin')}
              className={`w-full mt-2 py-2.5 text-[10px] font-bold rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                selectedRole === 'super_admin'
                  ? "text-[#020e27]"
                  : "text-[#b0bf00]/70 hover:text-[#b0bf00]"
              }`}
              style={{
                background: selectedRole === 'super_admin' 
                  ? '#b0bf00' 
                  : 'rgba(2, 14, 39, 0.7)',
                border: selectedRole === 'super_admin' 
                  ? '2px solid #b0bf00' 
                  : '1px solid rgba(176, 191, 0, 0.2)',
                boxShadow: selectedRole === 'super_admin' 
                  ? '0 4px 15px rgba(176, 191, 0, 0.3)' 
                  : 'none'
              }}
            >
              {selectedRole === 'super_admin' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              )}
              <span className="relative z-10">SUPER ADMIN</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}