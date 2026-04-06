import React, { useState } from 'react';
import { 
  MessageSquare, MoreVertical, Search, 
  Plus, CheckCircle2, AlertCircle, Clock, 
  User, Send, Paperclip, Smile
} from 'lucide-react';
import { cn } from '../../utils/cn';

const SupportTickets: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>('t1');

  // Mock tickets data
  const tickets = [
    { id: 't1', subject: 'Cannot access analytics dashboard', customer: 'Alice Johnson', priority: 'High', status: 'Open', lastUpdate: '10m ago' },
    { id: 't2', subject: 'Billing inquiry regarding Q2 invoice', customer: 'Bob Smith', priority: 'Medium', status: 'In Progress', lastUpdate: '2h ago' },
    { id: 't3', subject: 'How to export leads as CSV?', customer: 'Charlie Davis', priority: 'Low', status: 'Resolved', lastUpdate: '1d ago' },
    { id: 't4', subject: 'Integration failed with Slack', customer: 'Diana Prince', priority: 'High', status: 'Open', lastUpdate: '4h ago' },
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-inter tracking-tight">Support Center</h1>
          <p className="text-slate-500 text-sm">Resolve customer inquiries and maintain high satisfaction.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-2xl text-sm font-bold text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
          <Plus className="w-5 h-5" />
          New Ticket
        </button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Ticket List */}
        <div className="w-1/3 flex flex-col gap-4 min-h-0 overflow-hidden">
          <div className="glass p-3 rounded-2xl shrink-0 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input 
              placeholder="Search tickets..." 
              className="bg-transparent border-none text-sm focus:ring-0 w-full"
            />
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {tickets.map((ticket) => (
              <div 
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={cn(
                  "p-4 rounded-2xl cursor-pointer transition-all border-2",
                  selectedTicket === ticket.id 
                    ? "glass border-indigo-500 bg-white shadow-lg" 
                    : "glass border-transparent hover:border-slate-100"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                    getPriorityStyle(ticket.priority)
                  )}>
                    {ticket.priority}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{ticket.lastUpdate}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{ticket.subject}</h3>
                <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 font-medium">
                  <User className="w-3 h-3 text-slate-400" />
                  {ticket.customer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="flex-1 glass rounded-3xl flex flex-col min-h-0 overflow-hidden shadow-2xl">
          {selectedTicket ? (
            <>
              {/* Converation Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    AJ
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Conversation regarding: Access Issue</h3>
                    <p className="text-xs text-slate-500 font-medium">With Alice Johnson from TechCorp</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <AlertCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-[0.03]">
                <div className="self-end max-w-[80%] bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow-lg shadow-indigo-100 text-sm leading-relaxed">
                  Hi Alice, I noticed you were having trouble with the analytics dashboard. Have you tried clearing your browser cache?
                </div>
                <div className="self-start max-w-[80%] bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-none p-4 shadow-sm text-sm leading-relaxed">
                  Yes, I've tried that and even used a different browser, but the charts are still stuck on "Loading...". I really need this data for my 3 PM meeting.
                </div>
                <div className="self-end max-w-[80%] bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow-lg shadow-indigo-100 text-sm leading-relaxed">
                  Understood. I've escalated this to our engineering team. We'll get a fix out within the next hour. I'll update you here as soon as it's live!
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-slate-100 shrink-0 bg-white">
                <div className="relative group">
                  <textarea 
                    rows={2}
                    placeholder="Type your response here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-4 pr-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-sm"
                  />
                  <div className="absolute right-3 bottom-4 flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    Normal response time: 45 mins
                  </div>
                  <div className="text-[10px] text-slate-400 italic">
                    Press <kbd className="font-mono bg-slate-100 px-1 rounded">Enter</kbd> to send
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-50">
              <MessageSquare className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-xl font-bold text-slate-400 italic">Select a ticket to view conversation</h3>
              <p className="text-slate-300 mt-2 text-sm max-w-xs">Connecting with your customers is just a click away.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
