import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building2, Globe, Tag, Send, ArrowLeft, FileSpreadsheet, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { cn } from '../../utils/cn';

import { useAppDispatch } from '../../store';
import { createLead } from '../../store/slices/leadSlice';
import BulkUploadLeads from './BulkUploadLeads';

const schema = yup.object({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  company: yup.string().required('Company name is required'),
  source: yup.string().required('Lead source is required'),
  status: yup.string().oneOf(['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Lost', 'Converted'] as const).required('Status is required'),
  notes: yup.string().default(''),
}).required();

type FormData = yup.InferType<typeof schema>;

const CreateLead: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'New',
      source: 'Website',
      notes: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(createLead(data)).unwrap();
      reset();
      navigate('/leads');
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/leads')}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Add New Lead</h1>
            <p className="text-slate-500 text-sm">Create a new lead manually or upload from an Excel sheet.</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('manual')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
              activeTab === 'manual' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
              activeTab === 'bulk' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Bulk Upload
          </button>
        </div>
      </div>

      {activeTab === 'manual' ? (
        <div className="glass rounded-3xl overflow-hidden border border-white/40">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    {...register('name')}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-slate-50/50 border rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none",
                      errors.name ? "border-rose-300 ring-rose-100" : "border-slate-200"
                    )}
                    placeholder="e.g. John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    {...register('email')}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-slate-50/50 border rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none",
                      errors.email ? "border-rose-300 ring-rose-100" : "border-slate-200"
                    )}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    {...register('phone')}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-slate-50/50 border rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none",
                      errors.phone ? "border-rose-300 ring-rose-100" : "border-slate-200"
                    )}
                    placeholder="+1 234 567 890"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.phone.message}</p>}
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Company Name</label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    {...register('company')}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 bg-slate-50/50 border rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none",
                      errors.company ? "border-rose-300 ring-rose-100" : "border-slate-200"
                    )}
                    placeholder="TechCorp Solutions"
                  />
                </div>
                {errors.company && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.company.message}</p>}
              </div>

              {/* Lead Source */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Lead Source</label>
                <div className="relative group">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    {...register('source')}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all cursor-pointer"
                  >
                    <option value="Website">Website</option>
                    <option value="Google">Google Ads</option>
                    <option value="Facebook">Facebook Ads</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
              </div>

              {/* Initial Status */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Initial Status</label>
                <div className="relative group">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    {...register('status')}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Additional Notes</label>
              <textarea
                {...register('notes')}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter any initial information or requirements..."
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <button 
                type="button"
                onClick={() => navigate('/leads')}
                className="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-800 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-10 py-3 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2"
              >
                Create Lead
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <BulkUploadLeads />
      )}
    </div>
  );
};

export default CreateLead;
