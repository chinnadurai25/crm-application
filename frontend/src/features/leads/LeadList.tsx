import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreHorizontal, 
  Mail, Building2, Calendar,
  ChevronLeft, ChevronRight, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import AddLeadModal from './AddLeadModal';

const LeadList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock leads data (normally from Redux/API)
  const leads = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 234 567 8901', company: 'TechCorp', status: 'New', source: 'Google', createdAt: '2026-04-01' },
    { id: '2', name: 'Bob Smith', email: 'bob@smith.io', phone: '+1 987 654 3210', company: 'Build-it Inc', status: 'Qualified', source: 'Facebook', createdAt: '2026-03-28' },
    { id: '3', name: 'Charlie Davis', email: 'charlie@davis.com', phone: '+1 555 012 3456', company: 'Cloud Systems', status: 'Contacted', source: 'Website', createdAt: '2026-04-03' },
    { id: '4', name: 'Diana Prince', email: 'diana@amazon.net', phone: '+1 444 777 8888', company: 'Themyscira', status: 'Lost', source: 'Referral', createdAt: '2026-03-25' },
    { id: '5', name: 'Ethan Hunt', email: 'ethan@imf.org', phone: '+1 111 222 3333', company: 'Mission Control', status: 'Converted', source: 'Google', createdAt: '2026-04-05' },
    { id: '6', name: 'Fiona Gallagher', email: 'fiona@southside.com', phone: '+1 666 999 0000', company: 'Southside Deli', status: 'New', source: 'Facebook', createdAt: '2026-04-06' },
  ];

  const statusColors = {
    'New': 'bg-blue-50 text-blue-700 border-blue-100',
    'Contacted': 'bg-amber-50 text-amber-700 border-amber-100',
    'Qualified': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'Lost': 'bg-slate-50 text-slate-700 border-slate-100',
    'Converted': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500 text-sm">Track and manage your potential customers lifecycle.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Lead
          </button>
        </div>
      </div>

      <AddLeadModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Filters & Search */}
      <div className="glass p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, or company..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-2 mr-2 border-r border-slate-200 pr-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Filter by:</span>
          </div>
          {['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                statusFilter === status 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/leads/${lead.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{lead.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{lead.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{lead.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold border",
                      statusColors[lead.status as keyof typeof statusColors]
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {lead.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Showing 6 of 1,284 leads</span>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-indigo-600 text-white rounded-lg shadow-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold text-slate-500 hover:bg-white hover:shadow-sm rounded-lg">2</button>
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold text-slate-500 hover:bg-white hover:shadow-sm rounded-lg">3</button>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadList;
