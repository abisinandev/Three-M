import { useUserStore } from '@stores/user/UserStore';
import { useState } from 'react';
import { Camera } from 'lucide-react';
import ChangePasswordModal from '@shared/components/modals/ChangePasswordModal';
import { format } from 'date-fns';

const UserProfilePage = () => {
  const { user } = useUserStore();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const formatJoinDate = (dateString: string | undefined) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM yyyy dd');
    } catch {
      return '—';
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 font-inter antialiased">
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] overflow-hidden">

          <div className="bg-gradient-to-r from-[#0f0f0f] to-[#111] px-6 py-10 text-center border-b border-[#222]">
            <div className="relative inline-block group mb-5">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16a34a] p-0.5 shadow-xl">
                <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-3xl font-bold text-white">
                  {user?.fullName ? getInitials(user.fullName) : 'U'}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight">
              {user?.fullName || 'User Name'}
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">
              {user?.email || 'user@example.com'}
            </p>
            <span className="inline-block mt-3 text-xs font-medium text-gray-500 bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#333]">
              Member since {formatJoinDate(user?.createdAt)}
            </span>
          </div>

          <div className="p-6 space-y-6">

            <section className="bg-[#111111] rounded-xl p-6 border border-[#222]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                <button className="flex items-center gap-2 bg-[#22C55E] hover:bg-[#1ea853] text-white text-xs font-bold px-5 py-2 rounded-lg transition">
                  Edit
                </button>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Full Name</span>
                  <span className="text-white font-semibold">{user?.userCode || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Full Name</span>
                  <span className="text-white font-semibold">{user?.fullName || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Phone</span>
                  <span className="text-white font-semibold">
                    {user?.phone ? `+91 ${user.phone}` : 'Not added'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Email</span>
                  <span className="text-white font-semibold">{user?.email || '—'}</span>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-orange-900/20 to-transparent rounded-xl p-6 border border-orange-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">KYC Verification</h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/40">
                      Pending
                    </span>
                    <span className="text-orange-400 text-sm font-medium">Action Required</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2 font-medium">
                    Complete KYC to unlock withdrawals and premium features
                  </p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition whitespace-nowrap">
                  Upload Documents
                </button>
              </div>
            </section>

            {/* Security & Preferences */}
            <section className="bg-[#111111] rounded-xl p-6 border border-[#222]">
              <h3 className="text-lg font-semibold text-white mb-5">Security & Preferences</h3>
              <div className="space-y-6">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-gray-500 text-xs mt-1 font-medium">Extra security via authenticator app</p>
                  </div>
                  <button className="relative w-12 h-7 rounded-full bg-gray-700">
                    <span className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition" />
                  </button>
                </div>

                {/* Change Password */}
                <div className="flex items-center justify-between pt-5 border-t border-[#333]">
                  <div>
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-gray-500 text-xs mt-1 font-medium">Last changed 30 days ago</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="text-[#22C55E] hover:text-[#1ea853] text-sm font-semibold underline underline-offset-2 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};
export default UserProfilePage