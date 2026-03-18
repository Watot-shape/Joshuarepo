import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { User } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, UserCircle, Shield, Settings, LogOut } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

export function AuthorityManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user as User | undefined;

  const [accessLevel, setAccessLevel] = useState<'full' | 'custom'>('custom');
  const [permissions, setPermissions] = useState({
    canCommentOnTickets: false,
    canAddAccounts: false,
    canRemoveAccounts: false,
    canAccessOtherAccounts: false,
    canAccessAllTickets: false,
    canGiveAuthority: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/super-admin');
    }
  }, [user, navigate]);

  const generateUserId = (role: string, id: string) => {
    const prefix = role === 'admin' || role === 'super_admin' ? 'ADM' : 'EMP';
    return `${prefix}-${id.slice(0, 3).padStart(3, '0')}`;
  };

  const handleSave = () => {
    // Save permissions logic here
    console.log('Saving permissions:', permissions);
    navigate('/super-admin');
  };

  const handleCancel = () => {
    navigate('/super-admin');
  };

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#e8e6d5]">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#2d4a3e] to-[#1a3a2e] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-green-700/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4a6f5a] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">HR System</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="px-4 py-3 bg-[#4a6f5a]/30 rounded-lg text-white flex items-center gap-3">
              <Shield className="w-5 h-5" />
              <span>Admin Dashboard</span>
            </div>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-green-700/30 space-y-2">
          <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-[#4a6f5a]/20 rounded-lg flex items-center gap-3 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full px-4 py-3 text-left text-gray-300 hover:bg-[#4a6f5a]/20 rounded-lg flex items-center gap-3 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Back Button */}
          <button 
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to User Management</span>
          </button>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Authority Management</h1>
            <p className="text-gray-600">Manage user permissions and access levels</p>
          </div>

          {/* Account Owner Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <UserCircle className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-800">Account Owner</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">User ID</div>
                <div className="text-sm font-semibold text-gray-900">{generateUserId(user.role, user.id)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Current Role</div>
                <div className="text-sm font-semibold text-gray-900 capitalize">{user.role.replace('_', ' ')}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-500 mb-1">Name</div>
                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="text-sm font-semibold text-gray-900">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Authority Settings Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-800">Authority Settings</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">Select the access level for this user</p>

            {/* Access Level */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Access Level</h3>
              <RadioGroup value={accessLevel} onValueChange={(val) => setAccessLevel(val as 'full' | 'custom')}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="full" id="full" className="border-gray-400" />
                  <Label htmlFor="full" className="text-sm font-normal cursor-pointer text-gray-700">Full Control</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" className="border-gray-400" />
                  <Label htmlFor="custom" className="text-sm font-normal cursor-pointer text-gray-700">Custom Authority</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Specific Permissions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Specific Permissions</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="canCommentOnTickets" 
                    checked={permissions.canCommentOnTickets}
                    onCheckedChange={() => togglePermission('canCommentOnTickets')}
                    disabled={accessLevel === 'full'}
                    className="border-gray-400"
                  />
                  <Label htmlFor="canCommentOnTickets" className="text-sm font-normal cursor-pointer text-gray-700">
                    Can Comment on Tickets
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="canAddAccounts" 
                    checked={permissions.canAddAccounts}
                    onCheckedChange={() => togglePermission('canAddAccounts')}
                    disabled={accessLevel === 'full'}
                    className="border-gray-400"
                  />
                  <Label htmlFor="canAddAccounts" className="text-sm font-normal cursor-pointer text-gray-700">
                    Can Add Accounts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="canRemoveAccounts" 
                    checked={permissions.canRemoveAccounts}
                    onCheckedChange={() => togglePermission('canRemoveAccounts')}
                    disabled={accessLevel === 'full'}
                    className="border-gray-400"
                  />
                  <Label htmlFor="canRemoveAccounts" className="text-sm font-normal cursor-pointer text-gray-700">
                    Can Remove Accounts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="canAccessOtherAccounts" 
                    checked={permissions.canAccessOtherAccounts}
                    onCheckedChange={() => togglePermission('canAccessOtherAccounts')}
                    disabled={accessLevel === 'full'}
                    className="border-gray-400"
                  />
                  <Label htmlFor="canAccessOtherAccounts" className="text-sm font-normal cursor-pointer text-gray-700">
                    Can Access Other Accounts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="canAccessAllTickets" 
                    checked={permissions.canAccessAllTickets}
                    onCheckedChange={() => togglePermission('canAccessAllTickets')}
                    disabled={accessLevel === 'full'}
                    className="border-gray-400"
                  />
                  <Label htmlFor="canAccessAllTickets" className="text-sm font-normal cursor-pointer text-gray-700">
                    Can Access All Tickets
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="canGiveAuthority" 
                    checked={permissions.canGiveAuthority}
                    onCheckedChange={() => togglePermission('canGiveAuthority')}
                    disabled={accessLevel === 'full'}
                    className="border-gray-400"
                  />
                  <Label htmlFor="canGiveAuthority" className="text-sm font-normal cursor-pointer text-gray-700">
                    Can Give Authority to Other Accounts
                  </Label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-[#4a6f5a] hover:bg-[#3d5a49] text-white px-6"
              >
                Save Authorities
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}