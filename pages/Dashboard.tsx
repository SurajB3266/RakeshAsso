import React, { useMemo } from 'react';
import { INVESTMENT_DATA } from '../constants';
import { formatCurrency, formatDate } from '../utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { TrendingUp, Lock, Calendar, IndianRupee, AlertCircle, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    investedAmount, 
    currentReturnPercentage, 
    startDate, 
    lockInPeriodYears,
    withdrawalAllowedMonths,
    fundName
  } = INVESTMENT_DATA;

  // Calculate Key Metrics
  const currentValue = investedAmount * (1 + currentReturnPercentage / 100);
  const profit = currentValue - investedAmount;
  
  const startObj = new Date(startDate);
  const withdrawalDate = new Date(startObj);
  withdrawalDate.setMonth(withdrawalDate.getMonth() + withdrawalAllowedMonths);
  
  const lockInEndDate = new Date(startObj);
  lockInEndDate.setFullYear(lockInEndDate.getFullYear() + lockInPeriodYears);

  const today = new Date();
  const isEligibleForWithdrawal = today >= withdrawalDate;

  // Generate Mock Chart Data
  const chartData = useMemo(() => {
    const data = [];
    const months = 12; // Show approx 1 year view or YTD
    const points = 30; // Data points
    
    // Create a smooth curve from start date to today
    for (let i = 0; i <= points; i++) {
      const date = new Date(startObj.getTime() + (today.getTime() - startObj.getTime()) * (i / points));
      // Simulate non-linear growth with some volatility but generally trending to target return
      const progress = i / points;
      const volatility = (Math.random() - 0.5) * 2000;
      const growth = (profit * progress); 
      
      data.push({
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        value: Math.round(investedAmount + growth + (progress > 0.1 ? volatility : 0)),
        invested: investedAmount,
      });
    }
    return data;
  }, [investedAmount, profit, startObj, today]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Portfolio Dashboard</h2>
          <p className="text-slate-500">Welcome back, here is your investment overview.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-100 flex items-center shadow-sm">
          <TrendingUp size={20} className="mr-2" />
          <span className="font-semibold">Portfolio is up {currentReturnPercentage}%</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Current Value" 
          value={formatCurrency(currentValue)} 
          subValue={`+${formatCurrency(profit)}`}
          subValueColor="text-emerald-600"
          icon={IndianRupee}
          iconColor="text-blue-600"
        />
        <StatCard 
          title="Invested Amount" 
          value={formatCurrency(investedAmount)} 
          subValue={fundName}
          icon={TrendingUp}
          iconColor="text-slate-600"
        />
        <StatCard 
          title="Lock-in Ends" 
          value={formatDate(lockInEndDate.toISOString())}
          subValue={`${lockInPeriodYears} Years Total`}
          icon={Lock}
          iconColor="text-amber-600"
        />
        <StatCard 
          title="Withdrawal Eligibility" 
          value={isEligibleForWithdrawal ? "Eligible Now" : formatDate(withdrawalDate.toISOString())}
          subValue={isEligibleForWithdrawal ? "Action Required" : "Wait Period"}
          icon={isEligibleForWithdrawal ? CheckCircle2 : Calendar}
          iconColor={isEligibleForWithdrawal ? "text-emerald-600" : "text-slate-600"}
          highlight={isEligibleForWithdrawal}
        />
      </div>

      {/* Main Chart Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Performance Growth</h3>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
             <span className="w-3 h-3 rounded-full bg-blue-500"></span>
             <span>Portfolio Value</span>
             <span className="w-3 h-3 rounded-full bg-slate-300 ml-2"></span>
             <span>Invested</span>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                minTickGap={30}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                tickFormatter={(value) => `₹${value / 1000}k`}
                domain={['dataMin - 5000', 'auto']}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ color: '#64748b', marginBottom: '0.5rem' }}
              />
              <ReferenceLine y={investedAmount} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'right',  value: 'Principal', fill: '#94a3b8', fontSize: 12 }} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                name="Portfolio Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fund Details Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <AlertCircle className="text-blue-600" size={24} />
          <h3 className="text-lg font-bold text-slate-800">Fund Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailRow label="Fund Name" value={fundName} />
          <DetailRow label="Start Date" value={formatDate(startDate)} />
          <DetailRow label="Lock-in Period" value={`${lockInPeriodYears} Years`} />
          <DetailRow label="Withdrawal Start" value={formatDate(withdrawalDate.toISOString())} />
          <DetailRow label="Fund Type" value="Equity Linked Savings Scheme (ELSS)" />
          <DetailRow label="Status" value="Active" status="active" />
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const StatCard = ({ title, value, subValue, subValueColor = "text-slate-500", icon: Icon, iconColor, highlight }: any) => (
  <div className={`bg-white rounded-xl p-6 border transition-all duration-200 ${highlight ? 'border-emerald-200 shadow-md ring-1 ring-emerald-100' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${highlight ? 'bg-emerald-100' : 'bg-slate-50'}`}>
        <Icon className={iconColor} size={24} />
      </div>
    </div>
    <p className={`text-sm font-medium ${subValueColor}`}>{subValue}</p>
  </div>
);

const DetailRow = ({ label, value, status }: any) => (
  <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
    {status === 'active' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
        {value}
      </span>
    ) : (
      <p className="text-base font-medium text-slate-800">{value}</p>
    )}
  </div>
);

export default Dashboard;