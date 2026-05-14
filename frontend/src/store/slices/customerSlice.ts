import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';

export interface Customer {
  _id: string;
  leadId?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  sector?: string;
  totalSpent: number;
  status: 'Active' | 'VIP' | 'New' | 'Inactive';
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerState {
  items: Customer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  items: [],
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/customers');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
  }
});

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
