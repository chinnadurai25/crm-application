import React, { useState } from 'react';
import { 
  CheckSquare, Clock, AlertCircle, Plus, 
  Search, Filter, MoreVertical, Calendar,
  User, CheckCircle2, Circle
} from 'lucide-react';
import { cn } from '../../utils/cn';

const TaskList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock tasks data
  const tasks = [
    { id: 't1', title: 'Follow up with Alice Johnson', dueDate: '2026-04-07', priority: 'High', status: 'Pending', assignedTo: 'John Doe', relatedTo: 'TechCorp' },
    { id: 't2', title: 'Prepare demo for Bob Smith', dueDate: '2026-04-08', priority: 'Medium', status: 'In Progress', assignedTo: 'John Doe', relatedTo: 'Build-it Inc' },
    { id: 't3', title: 'Contract review for Apex Logistics', dueDate: '2026-04-06', priority: 'High', status: 'Completed', assignedTo: 'Sarah Miller', relatedTo: 'Apex Logistics' },
    { id: 't4', title: 'Initial discovery call - Fiona', dueDate: '2026-04-10', priority: 'Low', status: 'Pending', assignedTo: 'John Doe', relatedTo: 'Southside Deli' },
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
          <p className="text-slate-500 text-sm">Stay on top of your deals and follow-ups.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-2xl text-sm font-bold text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
          <Plus className="w-5 h-5" />
          Create New Task
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending</span>
            <h3 className="text-2xl font-bold text-slate-900">12</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Due Today</span>
            <h3 className="text-2xl font-bold text-slate-900">4</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Completed</span>
            <h3 className="text-2xl font-bold text-slate-900">84</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            Active Tasks
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="glass p-4 sm:p-6 rounded-3xl group hover:shadow-lg transition-all border-l-4 border-transparent hover:border-indigo-500">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <button className="mt-1 text-slate-300 hover:text-indigo-600 transition-colors">
                  {task.status === 'Completed' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <div className="space-y-1">
                  <h3 className={cn(
                    "text-lg font-bold transition-all",
                    task.status === 'Completed' ? "text-slate-400 line-through" : "text-slate-900 group-hover:text-indigo-600"
                  )}>
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {task.dueDate}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5" />
                      {task.relatedTo}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {task.assignedTo}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                  getPriorityStyle(task.priority)
                )}>
                  {task.priority}
                </span>
                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
