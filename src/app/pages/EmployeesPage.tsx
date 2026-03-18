import { DashboardLayout } from '../components/DashboardLayout';
import { Users, Sparkles } from 'lucide-react';

export function EmployeesPage() {
  return (
    <DashboardLayout title="Employees">
      <div className="flex items-center justify-center h-full">
        <div className="text-center relative">
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#b0bf00] rounded-full blur-3xl opacity-10"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-6 relative group" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.1) 0%, rgba(176, 191, 0, 0.05) 100%)',
              border: '1px solid rgba(176, 191, 0, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <Users className="w-16 h-16 text-[#b0bf00]" />
              
              {/* Sparkle Effects */}
              <Sparkles className="w-6 h-6 text-[#b0bf00] absolute top-2 right-2 opacity-50 animate-pulse" />
              <Sparkles className="w-4 h-4 text-[#b0bf00] absolute bottom-3 left-3 opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">Employees Section</h2>
            <p className="text-gray-400 text-lg mb-2">Coming Soon</p>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              This employees management section will be available in the next update. 
              Stay tuned for powerful employee management features!
            </p>
            
            {/* Decorative Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}