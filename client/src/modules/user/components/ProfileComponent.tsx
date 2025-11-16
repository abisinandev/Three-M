import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import api from "@lib/axios";
import { useUserStore } from '@stores/user/UserStore';
import { useNavigate } from '@tanstack/react-router';
import { CircleUserRound, Wallet, ChevronDown, LogOut, User } from 'lucide-react';
import { Footer } from '@shared/components/LandingPage/Footer';

export default function ProfileComponent() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, setUser, logout } = useUserStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/profile/me", { withCredentials: true });
        setUser(response.data.data);
      } catch (error) {
        navigate({ to: "/auth/login", replace: true });
      }
    };
    fetchProfile();
  }, [setUser, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        const response = await api.post("/auth/logout");
        if (response.data.success) {
          logout();
          navigate({ to: '/auth/login', replace: true });
          toast.success('You have been logged out.');
        }
      } catch (error) {
        toast.error('Logout failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-[#111111] border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">
              <span className="text-white">three</span>
              <span className="text-[#22C55E]"> M</span>
            </h1>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#" className="text-[#22C55E] border-b-2 border-[#22C55E] pb-1 font-medium">Dashboard</a>
              <a href="#" className="text-white font-medium">Expense Tracker</a>
              <a href="#" className="text-gray-500 hover:text-white transition">My Wallet</a>
              <a href="#" className="text-gray-500 hover:text-white transition">Mutual Fund</a>
              <a href="#" className="text-gray-500 hover:text-white transition">SIP Plans</a>
              <a href="#" className="text-gray-500 hover:text-white transition">Algo Trading</a>
              <a href="#" className="text-gray-500 hover:text-white transition">Market News</a>
              <a href="#" className="text-gray-500 hover:text-white transition">AI Assistant</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Wallet Balance */}
            <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full text-xs">
              <Wallet className="w-3 h-3 text-[#22C55E]" />
              <span>₹1,24,500</span>
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 p-1 rounded-full hover:bg-[#1A1A1A] transition"
              >
                <CircleUserRound size={35} color="#ffffff" strokeWidth={1} />
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Dropdown Modal */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#333333] overflow-hidden z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        // Navigate to profile or scroll to section
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-[#252525] transition"
                    >
                      <User size={16} className="text-gray-400" />
                      <span className="text-white">Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-[#252525] transition text-red-400"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Profile & Settings</h2>
          <p className="text-sm text-gray-500">Manage your account information and preferences</p>
        </div>

        {/* User Profile Card */}
        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6 border border-[#333333]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-semibold text-white">User Profile</h3>
            <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#22C55E]/90 transition">
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Full Name</div>
              <div className="text-white">{user?.fullName || ''}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</div>
              <div className="text-white">+91-{user?.phone || ''}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</div>
              <div className="text-white">{user?.email || ''}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Member Since</div>
              <div className="text-white">Sep 10, 2025</div>
            </div>
          </div>
        </div>

        {/* KYC Verification Card */}
        <div className="bg-[#111111] rounded-xl p-6 mb-6 border border-[#333333]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">KYC Verification</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-orange-500/20 text-orange-500 text-xs font-bold px-3 py-1 rounded-full">Pending</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Complete your KYC verification to unlock all features and higher transaction limits.
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Required Documents:</span> Aadhaar Card, PAN Card
              </p>
            </div>
          </div>
          <button className="bg-[#22C55E] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#22C55E]/90 transition">
            Upload Documents
          </button>
        </div>

        {/* Security Settings Card */}
        <div className="bg-[#111111] rounded-xl p-6 border border-[#333333]">
          <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>

          {/* Two-Factor Authentication */}
          <div className="flex justify-between items-center pb-5 mb-5 border-b border-[#333333]">
            <div>
              <h4 className="font-semibold text-white mb-1">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => setTwoFactorAuth(!twoFactorAuth)}
              className={`relative w-11 h-6 rounded-full transition ${twoFactorAuth ? 'bg-[#22C55E]' : 'bg-[#333333]'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${twoFactorAuth ? 'translate-x-5' : 'translate-x-0'}`}
              ></span>
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex justify-between items-center pb-5 mb-5 border-b border-[#333333]">
            <div>
              <h4 className="font-semibold text-white mb-1">Dark mode</h4>
              <p className="text-sm text-gray-400">Toggle dark mode for better viewing experience</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-11 h-6 rounded-full transition ${darkMode ? 'bg-[#22C55E]' : 'bg-[#333333]'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
              ></span>
            </button>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-white mb-1">Password</h4>
              <p className="text-sm text-gray-400">Last changed 30 days ago</p>
            </div>
            <button className="bg-[#1A1A1A] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#252525] transition border border-[#333333]">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}