import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Converted';
  source: 'Facebook' | 'Google' | 'Website' | 'Referral';
  assignedTo: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadState {
  items: Lead[];
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    source: string;
    search: string;
  };
}

const initialState: LeadState = {
  items: [],
  isLoading: false,
  error: null,
  filters: {
    status: 'All',
    source: 'All',
    search: '',
  },
};

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.items = action.payload;
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.items.unshift(action.payload);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<LeadState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLeads, addLead, updateLead, deleteLead, setFilters, setLoading, setError } = leadSlice.actions;
export default leadSlice.reducer;
