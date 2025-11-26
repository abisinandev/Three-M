import { Wallet, TrendingDown, ArrowUpRight, ArrowDownRight, Star, Zap, BarChart3, Shield, Ban, Bot } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: 'Wallet Balance', value: '₹1,24,500', change: '+12.5%', positive: true },
          { icon: TrendingDown, label: 'Monthly Expenses', value: '₹45,200', change: '-8.2%', positive: false },
          { icon: BarChart3, label: 'Mutual Fund Value', value: '₹2,85,750', change: '+15.3%', positive: true },
          { icon: Bot, label: 'Algo Trading', value: 'Active', change: '5 strategies', positive: true },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#111111] rounded-xl p-4 border border-[#222222] hover:border-[#333] transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.positive ? 'bg-[#22C55E]/10' : 'bg-red-500/10'}`}>
                <stat.icon className={`w-5 h-5 ${stat.positive ? 'text-[#22C55E]' : 'text-red-400'}`} />
              </div>
              {stat.positive ? <ArrowUpRight className="w-4 h-4 text-[#22C55E]" /> : <ArrowDownRight className="w-4 h-4 text-red-400" />}
            </div>
            <p className="text-gray-400 text-xs font-medium">{stat.label}</p>
            <p className="text-white text-lg font-bold mt-1">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.positive ? 'text-[#22C55E]' : 'text-red-400'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Expense Analysis */}
        <div className="bg-[#111111] rounded-xl p-5 border border-[#222222]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Expense Analysis</h3>
            <span className="text-xs text-gray-500 bg-[#1A1A1A] px-3 py-1 rounded-full">This Month</span>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-conic from-[#22C55E] via-purple-500 to-orange-500 p-3">
              <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center">
                <span className="text-3xl font-bold text-white">68%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5 text-xs">
            {['Food', 'Transport', 'Shopping', 'Fun', 'Bills', 'Others'].map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-[#22C55E]' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-purple-500' : i === 3 ? 'bg-orange-500' : i === 4 ? 'bg-red-500' : 'bg-gray-500'}`} />
                <span className="text-gray-400">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Performance */}
        <div className="bg-[#111111] rounded-xl p-5 border border-[#222222]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Portfolio Performance</h3>
            <span className="text-xs text-gray-500 bg-[#1A1A1A] px-3 py-1 rounded-full">6 Months</span>
          </div>
          <div className="h-48 flex items-end justify-between gap-2">
            {[265, 258, 272, 268, 285, 310].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-[#22C55E] to-[#22C55E]/30 rounded-t-md"
                  style={{ height: `${(val / 320) * 100}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIP & Algo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#111111] rounded-xl p-5 border border-[#222222]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Active SIP Plans</h3>
            <a href="#" className="text-[#22C55E] text-xs hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {['HDFC Top 100', 'SBI Small Cap', 'ICICI Bluechip'].map((fund, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-[#222] last:border-0">
                <div>
                  <p className="text-white text-sm font-medium">{fund}</p>
                  <p className="text-xs text-gray-500">₹{i === 0 ? '5,000' : i === 1 ? '3,000' : '7,500'}/mo</p>
                </div>
                <span className={`text-sm font-bold ${i === 2 ? 'text-orange-400' : 'text-[#22C55E]'}`}>
                  +{i === 2 ? '9.8%' : '12.5%'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111111] rounded-xl p-5 border border-[#222222]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Recent Algo Trades</h3>
            <a href="#" className="text-[#22C55E] text-xs hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {[
              { stock: 'RELIANCE', type: 'Buy', profit: '+₹2,450', positive: true },
              { stock: 'TCS', type: 'Sell', profit: '-₹1,200', positive: false },
              { stock: 'INFY', type: 'Buy', profit: '+₹3,760', positive: true },
            ].map((trade, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${trade.positive ? 'bg-[#22C55E]/10' : 'bg-red-500/10'}`}>
                    {trade.positive ? <ArrowUpRight className="w-3.5 h-3.5 text-[#22C55E]" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{trade.stock}</p>
                    <p className="text-xs text-gray-500">{trade.type}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${trade.positive ? 'text-[#22C55E]' : 'text-red-400'}`}>
                  {trade.profit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market News */}
      <div className="bg-[#111111] rounded-xl p-5 border border-[#222222]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Market News</h3>
          <a href="#" className="text-[#22C55E] text-xs hover:underline">View More</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Markets hit record high on strong Q3', source: 'BT' },
            { title: 'RBI keeps repo rate unchanged at 6.5%', source: 'ET' },
            { title: 'Tech stocks rally on AI boom', source: 'Mint' },
          ].map((news, i) => (
            <div key={i} className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:ring-1 hover:ring-[#22C55E]/30 transition">
              <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900" />
              <div className="p-3">
                <h4 className="text-white text-sm font-medium line-clamp-2">{news.title}</h4>
                <p className="text-xs text-gray-500 mt-2">{news.source} • {2 + i * 2}h ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Section - Compact & Elegant */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-[#0f0f0f] to-[#111] rounded-2xl border border-[#22C55E]/20 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#22C55E]/5" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 text-[#22C55E] text-xs font-bold mb-3">
              <Star className="w-4 h-4 fill-current" />
              <span>three M Premium</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Upgrade to Premium</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
              Unlock AI trading, priority execution, and ad-free experience.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
              {[
                { icon: Bot, title: 'AI Bot' },
                { icon: Zap, title: 'Auto-Trade' },
                { icon: BarChart3, title: 'Smart Insights' },
                { icon: Shield, title: 'Reports' },
                { icon: Ban, title: 'Ad-Free' },
              ].map((f, i) => (
                <div key={i} className="bg-[#1A1A1A]/50 rounded-xl p-4 border border-[#333]">
                  <f.icon className="w-8 h-8 text-[#22C55E] mx-auto mb-2" />
                  <p className="text-white text-xs font-medium">{f.title}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { popular: false },
                { popular: true },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-6 border ${plan.popular ? 'border-[#22C55E] bg-[#22C55E]/10' : 'border-[#333]'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-xs px-3 py-1 rounded-full font-bold">
                      Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3">three M Premium</h3>
                  <p className="text-3xl font-bold text-white mb-6">₹499<span className="text-sm text-gray-400">/month</span></p>
                  <button className="w-full bg-[#22C55E] hover:bg-[#1ea853] text-black font-bold py-3 rounded-xl text-sm transition">
                    Upgrade Now
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#1A1A1A]/50 rounded-xl p-4 border border-[#333] max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-[#22C55E] text-sm font-bold">
                <Zap className="w-5 h-5" />
                <span>AI predicts 40% better accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage