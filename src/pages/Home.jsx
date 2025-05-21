import { useState } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Icons
  const BarChartIcon = getIcon('bar-chart-2');
  const DollarSignIcon = getIcon('dollar-sign');
  const TrendingUpIcon = getIcon('trending-up');
  const UsersIcon = getIcon('users');
  const CalendarIcon = getIcon('calendar');
  
  // Mock statistics data
  const stats = [
    { 
      title: 'Total Income',
      value: '$12,430.50',
      change: '+12.5%',
      positive: true,
      icon: DollarSignIcon,
      color: 'bg-blue-500',
    },
    { 
      title: 'Total Expenses',
      value: '$8,671.20',
      change: '+4.2%',
      positive: false,
      icon: TrendingUpIcon,
      color: 'bg-red-500',
    },
    { 
      title: 'Active Clients',
      value: '18',
      change: '+2',
      positive: true,
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
    { 
      title: 'Pending Invoices',
      value: '7',
      change: '-3',
      positive: true,
      icon: CalendarIcon,
      color: 'bg-amber-500',
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-white">Financial Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            Track your financial health and manage cash flow
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button className="btn btn-primary">
            <span>New Invoice</span>
            <span>+</span>
          </button>
          <button className="btn btn-secondary">
            <span>New Expense</span>
            <span>+</span>
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mt-1 text-surface-800 dark:text-white">
                  {stat.value}
                </p>
                <div className={`flex items-center mt-1 ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Tabs for main feature */}
      <div className="border-b border-surface-200 dark:border-surface-700">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'dashboard' 
              ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
              : 'border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300'
            }`}
          >
            Financial Overview
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'invoices' 
              ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
              : 'border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300'
            }`}
          >
            Invoice Tracker
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'expenses' 
              ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
              : 'border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300'
            }`}
          >
            Expense Tracker
          </button>
        </div>
      </div>
      
      {/* Main feature component */}
      <MainFeature activeTab={activeTab} />
      
      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-surface-800 dark:text-white">Recent Activity</h2>
        <div className="card divide-y divide-surface-200 dark:divide-surface-700">
          {[
            { type: 'invoice', title: 'New invoice created', client: 'Acme Corp', amount: '$1,200.00', time: '2 hours ago' },
            { type: 'expense', title: 'Office supplies purchased', category: 'Office', amount: '$87.50', time: 'Yesterday' },
            { type: 'payment', title: 'Payment received', client: 'TechStart Inc', amount: '$3,450.00', time: '2 days ago' },
            { type: 'invoice', title: 'Invoice sent', client: 'Global Solutions', amount: '$5,400.00', time: '3 days ago' },
          ].map((activity, i) => {
            const ActivityIcon = getIcon(
              activity.type === 'invoice' ? 'file-text' : 
              activity.type === 'expense' ? 'credit-card' : 'dollar-sign'
            );
            
            return (
              <div key={i} className="py-3 flex items-start gap-3">
                <div className={`rounded-full p-2 ${
                  activity.type === 'invoice' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                  activity.type === 'expense' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' :
                  'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                }`}>
                  <ActivityIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-surface-800 dark:text-white">{activity.title}</p>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">
                    {activity.client && `Client: ${activity.client} • `}
                    {activity.category && `Category: ${activity.category} • `}
                    Amount: {activity.amount}
                  </p>
                </div>
                <div className="text-sm text-surface-500 dark:text-surface-400">{activity.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;