import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, DollarSign, TrendingUp, Receipt, BarChart3, Bell, Settings, Bot, LogOut, Menu, X, Search } from 'lucide-react';
import { useAuthStore } from '@stores/user/UserAuthStore';
import { useMutation } from '@tanstack/react-query';
import adminApi from '@lib/axiosAdmin';
import { LOGOUT } from '@shared/constants/adminConstants';
import { toast } from 'sonner';
import { useAdminStore } from '@stores/admin/useAdminStore';

const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/sips', label: 'SIPs', icon: DollarSign },
    { to: '/admin/mutual-funds', label: 'Mutual Funds', icon: TrendingUp },
    { to: '/admin/transactions', label: 'Transactions', icon: Receipt },
    { to: '/admin/stocks', label: 'Stocks', icon: BarChart3 },
    { to: '/admin/notifications', label: 'Notifications', icon: Bell },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/bot-management', label: 'Bot management', icon: Bot },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { logout,setData } = useAdminStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await adminApi.get('/profile', { withCredentials: true });
                setData(response.data.data);
            } catch (error) {
                navigate({ to: '/auth/login', replace: true });
            }
        };
        fetchProfile();
    }, [setData, navigate]);

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            try {
                await adminApi.post(LOGOUT);
                logout();
                navigate({ to: '/admin/authentication', replace: true });
                toast.success('Logged out successfully');
            } catch (error) {
                toast.error('Logout failed');
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-neutral-800 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-5 border-b border-neutral-800">
                    <h1 className="text-2xl font-black tracking-tighter">
                        <span className="text-white">three</span>
                        <span className="text-teal-green">M</span>
                    </h1>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X size={22} />
                    </button>
                </div>

                <nav className="p-3 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-teal-green/10 text-teal-green border border-teal-green/30 shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
                    <button onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                <header className="bg-[#111111] border-b border-neutral-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                            <Menu size={22} className="text-gray-400 hover:text-white" />
                        </button>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search users, transactions, funds..."
                                className="pl-10 pr-4 py-2 bg-[#1a1a1a] border border-neutral-700 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-teal-green/50 w-72 lg:w-96 transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 text-xs">
                        <div className="hidden sm:block text-right">
                            <div className="text-gray-400">System uptime: <span className="text-teal-green font-medium">99.91%</span></div>
                            <div className="text-gray-500">Last updated 2 min ago</div>
                        </div>
                        <button className="relative">
                            <Bell size={20} className="text-gray-400 hover:text-white transition" />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-green to-cyan-500 flex items-center justify-center text-xs font-bold shadow-lg">
                            AD
                        </div>
                    </div>
                </header>

                <main className="p-6 pb-10">
                    {children}
                </main>
            </div>
        </div>
    );
}