import {  AlertCircle, Lightbulb, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Users', value: '1,254', change: '+12%', positive: true },
          { label: 'Wallet Balance', value: '₹2.4M', change: '+8%', positive: true },
          { label: 'Active Funds', value: '23', change: '+5%', positive: true },
          { label: 'Auto-Trades', value: '89', change: '+15%', positive: true },
          { label: 'Premium Users', value: '156', change: '+22%', positive: true },
          { label: 'News Posts', value: '42', change: '+3%', positive: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111111] border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-all duration-200"
          >
            <div className="text-gray-500 text-xs font-medium">{stat.label}</div>
            <div className="text-2xl font-bold mt-1.5 text-white">{stat.value}</div>
            <div className={`text-xs mt-2 flex items-center gap-1 ${stat.positive ? 'text-teal-green' : 'text-red-400'}`}>
              {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span className="font-medium">{stat.change}</span>
              <span className="text-gray-500">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth + Fund Performance */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-[#111111] border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">User Growth</h3>
              <span className="text-xs text-teal-green font-medium">+28.4%</span>
            </div>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path
                  d="M 20 160 Q 100 100, 180 120 T 340 80 L 380 70"
                  stroke="#22c55e"
                  strokeWidth="3"
                  fill="none"
                  className="opacity-80"
                />
                <path
                  d="M 20 160 L 20 180 Q 100 180 180 180 T 340 180 L 380 180 L 380 70"
                  fill="#22c55e20"
                />
              </svg>
              <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs text-gray-500">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Fund Performance */}
          <div className="bg-[#111111] border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Fund Performance</h3>
              <span className="text-xs text-teal-green font-medium">+18.2%</span>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-black text-teal-green">+18.2%</div>
                <div className="text-xs text-gray-500 mt-2">vs Benchmark +9.1%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Trade Profit Donut */}
        <div className="bg-[#111111] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Auto-Trade Profit</h3>
            <span className="text-xs text-teal-green font-medium">+156% YTD</span>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-52 h-52">
              <svg className="w-full h-full -rotate-90">
                <circle cx="104" cy="104" r="96" stroke="#1a1a1a" strokeWidth="16" fill="none" />
                <circle
                  cx="104"
                  cy="104"
                  r="96"
                  stroke="#f97316"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray="603"
                  strokeDashoffset="120"
                  className="transition-all duration-1000"
                />
                <circle
                  cx="104"
                  cy="104"
                  r="96"
                  stroke="#22c55e"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray="603"
                  strokeDashoffset="240"
                  className="transition-all duration-1000"
                />
                <circle
                  cx="104"
                  cy="104"
                  r="96"
                  stroke="#8b5cf6"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray="603"
                  strokeDashoffset="420"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-black text-teal-green">+156%</div>
                  <div className="text-xs text-gray-500 mt-1">YTD Return</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-[#111111] border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-5 text-white">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { id: '#TXN001234', user: 'John Doe', amount: '₹15,000', type: 'Fund Purchase', status: 'Completed', time: '2 min ago' },
              { id: '#TXN001235', user: 'Sarah Smith', amount: '₹8,500', type: 'Stock Trade', status: 'Pending', time: '5 min ago' },
              { id: '#TXN001236', user: 'Mike Johnson', amount: '₹25,000', type: 'Withdrawal', status: 'Completed', time: '12 min ago' },
              { id: '#TXN001237', user: 'Emma Wilson', amount: '₹12,300', type: 'Auto-Trade', status: 'Completed', time: '18 min ago' },
            ].map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3 border-b border-neutral-800 last:border-0">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-200">{tx.id}</div>
                    <div className="text-xs text-gray-500">{tx.user} • {tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{tx.amount}</div>
                  <div className="text-xs text-gray-500">{tx.type}</div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  tx.status === 'Completed'
                    ? 'bg-teal-green/10 text-teal-green border border-teal-green/30'
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {tx.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* System Alerts */}
          <div className="bg-[#111111] border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={18} className="text-red-400" />
              <h3 className="text-lg font-semibold text-white">System Alerts</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg">
                High Server Load (CPU: 88%)
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-3 rounded-lg">
                12 users awaiting KYC approval
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-[#111111] border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-teal-green" />
              <h3 className="text-lg font-semibold text-white">AI Insight</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI detected <span className="text-teal-green font-medium">12% increase</span> in user engagement after last fund update. 
              Recommend promoting <span className="text-teal-green font-medium">high-performing funds</span> to maximize user retention.
            </p>
          </div>

          {/* Recent Admin Actions */}
          <div className="bg-[#111111] border border-neutral-800 rounded-xl p-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Recent Admin Actions</h4>
            <div className="space-y-2 text-xs text-gray-500">
              <div>• Admin updated fund NAV <span className="text-gray-400">• 2m ago</span></div>
              <div>• User account verified <span className="text-gray-400">• 5m ago</span></div>
              <div>• System backup completed <span className="text-gray-400">• 15m ago</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;