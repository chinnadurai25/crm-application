import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Lost' | 'Converted';
  source?: string;
  value?: number;
  notes?: string;
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

// Async Thunks
export const fetchLeads = createAsyncThunk('leads/fetchLeads', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/leads');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch leads');
  }
});

export const createLead = createAsyncThunk('leads/createLead', async (leadData: Partial<Lead>, { rejectWithValue }) => {
  try {
    const response = await api.post('/leads', leadData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create lead');
  }
});

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<LeadState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Leads
      .addCase(fetchLeads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action: PayloadAction<Lead[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Lead
      .addCase(createLead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearError } = leadSlice.actions;
export default leadSlice.reducer;
