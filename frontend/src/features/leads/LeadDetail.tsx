import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Phone, Building2,  
  Tag, MessageSquare, History, User,
  CheckCircle2, PhoneCall, MailPlus, AlertCircle
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../../utils/cn';
import ConvertLeadModal from './ConvertLeadModal';

const LeadDetail: React.FC = () => {
  const { id: _id } = useParams<{ id: string }>();
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  // Mock lead data
  const lead = {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 234 567 8901',
    company: 'TechCorp Solutions',
    status: 'Qualified',
    source: 'Google Ads',
    assignedTo: 'John Doe',
    jobTitle: 'CMO',
    notes: 'Interested in enterprise license for the next quarter. Budget approved, ready for demo.',
    createdAt: '2026-04-01',
    updatedAt: '2026-04-05',
    timeline: [
      { id: 't1', type: 'note', content: 'Met at the conference, seems interested.', user: 'John Doe', time: '2h ago', icon: MessageSquare },
      { id: 't2', type: 'status', content: 'Status changed from "Contacted" to "Qualified"', user: 'System', time: '1d ago', icon: History },
      { id: 't3', type: 'call', content: 'Follow-up call: Discussed pricing tiers.', user: 'John Doe', time: '2d ago', icon: PhoneCall },
      { id: 't4', type: 'email', content: 'Sent personalized demo video.', user: 'John Doe', time: '4d ago', icon: MailPlus },
    ]
  };

  const statusColors = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-amber-100 text-amber-700 border-amber-200',
    'Qualified': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Lost': 'bg-slate-100 text-slate-700 border-slate-200',
    'Converted': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header / Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/leads" 
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-all hover:translate-x-[-2px]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{lead.name}</h1>
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-bold border",
                statusColors[lead.status as keyof typeof statusColors]
              )}>
                {lead.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
              <Building2 className="w-4 h-4" />
              <span>{lead.company}</span>
              <span className="mx-1 opacity-20">•</span>
              <span>{lead.jobTitle}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all">
            Edit
          </button>
          <button 
            onClick={() => setIsConvertModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark as Converted
          </button>
        </div>
      </div>

      <ConvertLeadModal 
        isOpen={isConvertModalOpen} 
        onClose={() => setIsConvertModalOpen(false)} 
        leadName={lead.name}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-bold">Email</span>
                    <span className="text-sm font-bold text-slate-700">{lead.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-bold">Phone</span>
                    <span className="text-sm font-bold text-slate-700">{lead.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Lead Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-bold">Source</span>
                    <span className="text-sm font-bold text-slate-700">{lead.source}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-bold">Assigned To</span>
                    <span className="text-sm font-bold text-slate-700">{lead.assignedTo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">Activity Timeline</h3>
              <button className="text-indigo-600 text-sm font-bold hover:underline">+ Add Entry</button>
            </div>
            <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {lead.timeline.map((entry) => (
                <div key={entry.id} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 shadow-sm group-hover:border-indigo-200">
                    <entry.icon className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-800">{entry.content}</span>
                      <span className="text-xs text-slate-400 font-medium">{entry.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-[8px] font-bold">
                        {entry.user.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Logged by {entry.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions/Notes */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <AlertCircle className="w-5 h-5 text-indigo-100" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40 mb-4">Internal Notes</h3>
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{lead.notes}"
              </p>
            </div>
            <button className="mt-4 w-full py-2.5 text-indigo-600 text-sm font-bold hover:bg-indigo-50 rounded-xl transition-all">
              Update Notes
            </button>
          </div>

          <div className="glass p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">System Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Record Created</span>
                <span className="font-bold text-slate-700">{lead.createdAt}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Last Updated</span>
                <span className="font-bold text-slate-700">{lead.updatedAt}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Lead ID</span>
                <span className="font-mono text-xs font-bold text-slate-400">#LD-0000{lead.id}</span>
              </div>
            </div>
          </div>
          
          <button className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold hover:bg-rose-100 transition-all">
            Delete Lead Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
