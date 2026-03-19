import { useState, useEffect } from 'react';
import { User, UserRole } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, User as UserIcon, Mail, Building2, Shield, Save, X, Sparkles } from 'lucide-react';
import logoImage from 'figma:asset/e48cc0cb98fd592ad9e208a128194c25b1510164.png';

interface EditUserModalProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

export function EditUserModal({ user, onSave, onCancel }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department || '',
  });

  const generateUserId = (role: string, id: string) => {
    const prefix = role === 'admin' || role === 'super_admin' ? 'ADM' : 'EMP';
    return `${prefix}-${id.slice(0, 3).padStart(3, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...user,
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: 'linear-gradient(135deg, #111827 0%, #0a1a35 50%, #111827 100%)' }}>
      {/* Enhanced Sidebar */}
      <aside className="w-72 text-white flex flex-col relative border-r border-[#b0bf00]/20" style={{
        background: 'linear-gradient(180deg, rgba(2, 14, 39, 0.95) 0%, rgba(10, 26, 53, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '4px 0 30px rgba(176, 191, 0, 0.1)'
      }}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#b0bf00] rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#b0bf00] rounded-full blur-[100px] opacity-10"></div>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-[#b0bf00]/20 relative">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#b0bf00] to-[#8a9400] rounded-lg flex items-center justify-center p-1.5 relative group transition-all duration-300 hover:scale-110" style={{
              boxShadow: '0 4px 20px rgba(176, 191, 0, 0.3), inset 0 0 0 1px rgba(176, 191, 0, 0.2)'
            }}>
              <img src={logoImage} alt="HR Logo" className="w-full h-full" />
              
              {/* Animated Corner Accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#b0bf00] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
            <div>
              <span className="text-lg font-bold text-[#b0bf00] tracking-wide">HR SYSTEM</span>
              <p className="text-xs text-gray-400">User Management</p>
            </div>
          </div>
        </div>

        {/* User Being Edited Info */}
        <div className="p-6 border-b border-[#b0bf00]/20 relative">
          <div className="p-4 rounded-xl transition-all duration-300" style={{
            background: 'rgba(176, 191, 0, 0.1)',
            border: '1px solid rgba(176, 191, 0, 0.2)',
            boxShadow: '0 4px 15px rgba(176, 191, 0, 0.05)'
          }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#b0bf00]/30 to-[#8a9400]/30 rounded-full flex items-center justify-center border-2 border-[#b0bf00]/40">
                <UserIcon className="w-6 h-6 text-[#b0bf00]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Editing User</p>
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Mail className="w-3 h-3" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide" style={{
                background: 'rgba(176, 191, 0, 0.2)',
                color: '#b0bf00'
              }}>
                {user.role.replace('_', ' ')}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 relative z-10">
          <div className="space-y-2">
            <button className="w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-all duration-300 group relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(176, 191, 0, 0.15), rgba(176, 191, 0, 0.05))',
              border: '1px solid rgba(176, 191, 0, 0.3)',
              boxShadow: '0 4px 15px rgba(176, 191, 0, 0.1)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b0bf00]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              <Sparkles className="w-5 h-5 text-[#b0bf00] relative z-10" />
              <span className="font-medium text-[#b0bf00] relative z-10">Edit Mode Active</span>
            </button>
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="p-6 border-t border-[#b0bf00]/20 relative z-10">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Quick Info</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">User ID</span>
              <span className="text-[#b0bf00] font-mono font-semibold">{generateUserId(formData.role, user.id)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Department</span>
              <span className="text-white font-medium truncate ml-2">{formData.department || 'None'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative overflow-y-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(176, 191, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 191, 0, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#b0bf00] rounded-full blur-[150px] opacity-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#b0bf00] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDuration: '5s' }}></div>

        {/* Content */}
        <div className="relative z-10 p-8 max-w-5xl min-h-full">
          {/* Enhanced Back Button */}
          <button 
            onClick={onCancel}
            className="group flex items-center gap-2 text-gray-400 hover:text-[#b0bf00] mb-8 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#b0bf00]/10"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to User Management</span>
          </button>

          {/* Enhanced Header */}
          <div className="mb-10 relative">
            {/* Glow Effect */}
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-[#b0bf00] rounded-full blur-[100px] opacity-15"></div>
            
            <h1 className="text-5xl font-extrabold text-white mb-3 relative z-10 tracking-tight">
              Edit User Profile
              <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-[#b0bf00] to-transparent rounded-full"></div>
            </h1>
            <p className="text-gray-400 text-lg relative z-10 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#b0bf00]" />
              Update user information, role, and permissions
            </p>
          </div>

          {/* Enhanced Form Card */}
          <div className="relative group">
            {/* Card Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#b0bf00]/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative bg-white/5 backdrop-blur-md rounded-3xl border border-[#b0bf00]/30 overflow-hidden transition-all duration-300 group-hover:border-[#b0bf00]/50" style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              {/* Top Accent Line */}
              <div className="h-1 bg-gradient-to-r from-transparent via-[#b0bf00] to-transparent opacity-60"></div>
              
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#b0bf00]/30 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#b0bf00]/30 rounded-br-3xl"></div>

              <div className="p-10">
                {/* Section Header */}
                <div className="mb-8 pb-6 border-b border-[#b0bf00]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#b0bf00]/20 to-[#8a9400]/20 rounded-lg flex items-center justify-center border border-[#b0bf00]/30">
                      <UserIcon className="w-5 h-5 text-[#b0bf00]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Account Information</h2>
                  </div>
                  <p className="text-sm text-gray-400 ml-13">Manage user account details and access level</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* User ID & Role Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User ID */}
                    <div className="space-y-2">
                      <Label htmlFor="userId" className="text-gray-300 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                        <div className="w-1 h-1 bg-[#b0bf00] rounded-full"></div>
                        User ID
                      </Label>
                      <div className="relative group/input">
                        <Input
                          id="userId"
                          value={generateUserId(formData.role, user.id)}
                          disabled
                          className="bg-white/5 border-[#b0bf00]/20 text-gray-500 cursor-not-allowed h-12 font-mono transition-all duration-300"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="px-2 py-1 bg-gray-600/30 rounded text-xs text-gray-400 font-semibold">READ ONLY</div>
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-gray-300 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                        <div className="w-1 h-1 bg-[#b0bf00] rounded-full"></div>
                        Role
                      </Label>
                      <div className="relative group/input">
                        <Select
                          value={formData.role}
                          onValueChange={(val) => setFormData({ ...formData, role: val as UserRole })}
                        >
                          <SelectTrigger className="bg-white/5 border-[#b0bf00]/30 text-white h-12 hover:border-[#b0bf00] transition-all duration-300 group-hover/input:bg-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0a1a35] border-[#b0bf00]/30 backdrop-blur-xl">
                            <SelectItem value="employee" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">Employee</SelectItem>
                            <SelectItem value="office_head" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">Office Head</SelectItem>
                            <SelectItem value="admin" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">Admin</SelectItem>
                            <SelectItem value="super_admin" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">Super Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Shield className="w-4 h-4 text-[#b0bf00]/50" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                      <div className="w-1 h-1 bg-[#b0bf00] rounded-full"></div>
                      Full Name
                    </Label>
                    <div className="relative group/input">
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/5 border-[#b0bf00]/30 text-white placeholder:text-gray-500 h-12 pl-11 hover:border-[#b0bf00] focus:border-[#b0bf00] transition-all duration-300 group-hover/input:bg-white/10"
                        placeholder="Enter full name"
                        required
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#b0bf00]/10 flex items-center justify-center border border-[#b0bf00]/30">
                        <UserIcon className="w-4 h-4 text-[#b0bf00]" />
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                      <div className="w-1 h-1 bg-[#b0bf00] rounded-full"></div>
                      Email Address
                    </Label>
                    <div className="relative group/input">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/5 border-[#b0bf00]/30 text-white placeholder:text-gray-500 h-12 pl-11 hover:border-[#b0bf00] focus:border-[#b0bf00] transition-all duration-300 group-hover/input:bg-white/10"
                        placeholder="user@company.com"
                        required
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#b0bf00]/10 flex items-center justify-center border border-[#b0bf00]/30">
                        <Mail className="w-4 h-4 text-[#b0bf00]" />
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-300 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                      <div className="w-1 h-1 bg-[#b0bf00] rounded-full"></div>
                      Department
                    </Label>
                    <div className="relative group/input">
                      <Select
                        value={formData.department}
                        onValueChange={(val) => setFormData({ ...formData, department: val })}
                      >
                        <SelectTrigger className="bg-white/5 border-[#b0bf00]/30 text-white h-12 pl-11 hover:border-[#b0bf00] transition-all duration-300 group-hover/input:bg-white/10">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a1a35] border-[#b0bf00]/30 backdrop-blur-xl">
                          <SelectItem value="HR Department" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">HR Department</SelectItem>
                          <SelectItem value="IT" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">IT Department</SelectItem>
                          <SelectItem value="Finance" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">Finance</SelectItem>
                          <SelectItem value="Sales" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">Sales</SelectItem>
                          <SelectItem value="Administration" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">Administration</SelectItem>
                          <SelectItem value="-" className="hover:bg-[#b0bf00]/10 hover:text-[#b0bf00]">None</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#b0bf00]/10 flex items-center justify-center border border-[#b0bf00]/30 pointer-events-none">
                        <Building2 className="w-4 h-4 text-[#b0bf00]" />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex justify-end gap-4 pt-8 border-t border-[#b0bf00]/20">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      className="bg-white/5 border-gray-600 text-gray-300 hover:bg-gray-700/30 hover:text-white hover:border-gray-500 px-6 h-12 transition-all duration-300 group/btn"
                    >
                      <X className="w-4 h-4 mr-2 transition-transform group-hover/btn:rotate-90" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#b0bf00] to-[#9aaa00] hover:from-[#c5d420] hover:to-[#b0bf00] text-white font-bold px-8 h-12 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(176,191,0,0.4)] hover:-translate-y-0.5 relative overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
                      <Save className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">Save Changes</span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Info Cards at Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-[#b0bf00]/20 hover:border-[#b0bf00]/40 transition-all duration-300">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Last Modified</p>
              <p className="text-white font-semibold">Just now</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-[#b0bf00]/20 hover:border-[#b0bf00]/40 transition-all duration-300">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-white font-semibold">Active</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-[#b0bf00]/20 hover:border-[#b0bf00]/40 transition-all duration-300">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Permissions</p>
              <p className="text-white font-semibold capitalize">{formData.role.replace('_', ' ')} Level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}