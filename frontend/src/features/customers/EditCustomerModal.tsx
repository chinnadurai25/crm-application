import React from 'react';
import { X, User, Mail, Phone, Building2, Tag, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { cn } from '../../utils/cn';
import { useAppDispatch } from '../../store';
import { updateCustomer } from '../../store/slices/customerSlice';
import { Customer } from '../../store/slices/customerSlice';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().default(''),
  company: yup.string().default(''),
  sector: yup.string().default(''),
  status: yup.string().oneOf(['Active', 'VIP', 'New', 'Inactive']).required('Status is required'),
});

type EditCustomerForm = yup.InferType<typeof schema>;

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({ isOpen, onClose, customer }) => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EditCustomerForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      company: customer.company || '',
      sector: customer.sector || '',
      status: customer.status || 'Active',
    }
  });

  // Reset form when customer changes
  React.useEffect(() => {
    reset({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      company: customer.company || '',
      sector: customer.sector || '',
      status: customer.status || 'Active',
    });
  }, [customer, reset]);

  const onSubmit = async (data: EditCustomerForm) => {
    try {
      await dispatch(updateCustomer({ id: customer._id, data })).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to update customer', error);
      alert('Failed to update customer details.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Edit Customer Profile</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                {...register('name')}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none",
                  errors.name ? "border-rose-300 ring-rose-100" : "border-slate-200"
                )}
                placeholder="Jane Doe"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email *</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  {...register('email')}
                  type="email"
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none",
                    errors.email ? "border-rose-300 ring-rose-100" : "border-slate-200"
                  )}
                  placeholder="jane@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  {...register('phone')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company</label>
              <div className="relative group">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  {...register('company')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sector</label>
              <div className="relative group">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  {...register('sector')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Technology"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status / Tier *</label>
            <div className="relative group">
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <select
                {...register('status')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm transition-all focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
              >
                <option value="Active">Active</option>
                <option value="VIP">VIP (Platinum)</option>
                <option value="New">New</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {errors.status && <p className="mt-1 text-xs text-rose-500">{errors.status.message}</p>}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;
