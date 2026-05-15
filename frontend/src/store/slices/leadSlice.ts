import { createSlice, createAsyncThunk, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import api from '../../utils/api';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Lost' | 'Converted';
  source?: string;
  assignedTo?: string;
  value?: number;
  notes?: string;
  timeline?: Array<{
    _id: string;
    type: 'note' | 'call' | 'email' | 'status';
    content: string;
    user: string;
    createdAt: string;
  }>;
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

export const updateLead = createAsyncThunk('leads/updateLead', async ({ id, data }: { id: string, data: Partial<Lead> }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/leads/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update lead');
  }
});

export const addTimelineEntry = createAsyncThunk('leads/addTimelineEntry', async ({ id, entry }: { id: string, entry: any }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/leads/${id}/timeline`, entry);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add timeline entry');
  }
});

export const convertLead = createAsyncThunk('leads/convertLead', async ({ id, data }: { id: string, data: any }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/leads/${id}/convert`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to convert lead');
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
      })
      // Update Lead / Add Timeline
      .addMatcher(
        isAnyOf(updateLead.fulfilled, addTimelineEntry.fulfilled),
        (state, action: PayloadAction<Lead>) => {
          state.isLoading = false;
          const index = state.items.findIndex(item => item._id === action.payload._id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      // Convert Lead
      .addMatcher(
        isAnyOf(convertLead.fulfilled),
        (state, action: PayloadAction<{ lead: Lead, customer: any }>) => {
          state.isLoading = false;
          const index = state.items.findIndex(item => item._id === action.payload.lead._id);
          if (index !== -1) {
            state.items[index] = action.payload.lead;
          }
        }
      )
      .addMatcher(
        isAnyOf(updateLead.pending, addTimelineEntry.pending, convertLead.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(updateLead.rejected, addTimelineEntry.rejected, convertLead.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const { setFilters, clearError } = leadSlice.actions;
export default leadSlice.reducer;
