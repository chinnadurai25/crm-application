import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  leadId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  sector?: string;
  totalSpent: number;
  status: 'Active' | 'VIP' | 'New' | 'Inactive';
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    company: { type: String },
    sector: { type: String },
    totalSpent: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Active', 'VIP', 'New', 'Inactive'],
      default: 'Active',
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
