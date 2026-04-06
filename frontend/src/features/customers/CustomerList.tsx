import React, { useState } from 'react';
import { 
  Users, Mail, Phone, Building2, Calendar, 
  Search, Filter, Download,
  ArrowUpRight, Star, ExternalLink
} from 'lucide-react';
import { cn } from '../../utils/cn';

const CustomerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock customers data
  const customers = [
    { id: 'c1', name: 'James Wilson', email: 'james@globex.com', phone: '+1 555 987 6543', company: 'Globex Corp', sector: 'Technology', totalSpent: '$12,400', status: 'Active', joinedAt: '2026-01-15' },
    { id: 'c2', name: 'Sarah Miller', email: 'sarah@penta.io', phone: '+1 444 333 2222', company: 'Penta Digital', sector: 'Marketing', totalSpent: '$8,200', status: 'Active', joinedAt: '2026-02-20' },
    { id: 'c3', name: 'Michael Chen', email: 'm.chen@apex.net', phone: '+1 111 222 3333', company: 'Apex Logistics', sector: 'Logistics', totalSpent: '$45,000', status: 'VIP', joinedAt: '2025-11-10' },
    { id: 'c4', name: 'Emily Blunt', email: 'emily@horizon.org', phone: '+1 999 888 7777', company: 'Horizon Edu', sector: 'Education', totalSpent: '$3,500', status: 'New', joinedAt: '2026-03-30' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Directory</h1>
          <p className="text-slate-500 text-sm">Manage your long-term business relationships and lifetime value.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export data
          </button>
        </div>
      </div>

      {/* KPI Cards for Customers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Customers</span>
            <h3 className="text-2xl font-bold text-slate-900">1,248</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Retention Rate</span>
            <h3 className="text-2xl font-bold text-slate-900">94.2%</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Lifetime Value</span>
            <h3 className="text-2xl font-bold text-slate-900">$2.4M</h3>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="glass p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name or company..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Grid Layout for Customers (Premium feel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="glass p-6 rounded-3xl group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{customer.name}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                      getStatusStyle(customer.status)
                    )}>
                      {customer.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-0.5 font-medium">
                    <Building2 className="w-3 h-3" />
                    {customer.company}
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Spent</span>
                <p className="text-sm font-bold text-slate-900">{customer.totalSpent}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Industry</span>
                <p className="text-sm font-bold text-slate-900">{customer.sector}</p>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-6"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex items-center gap-1.5 hover:text-indigo-600 cursor-pointer transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5 hover:text-indigo-600 cursor-pointer transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium italic">
                <Calendar className="w-3.5 h-3.5" />
                Joined {customer.joinedAt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
