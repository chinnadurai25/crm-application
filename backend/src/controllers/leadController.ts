import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Customer from '../models/Customer';

// @desc    Convert a lead to a customer
// @route   POST /api/leads/:id/convert
// @access  Public
export const convertLeadToCustomer = async (req: Request, res: Response) => {
  try {
    const { dealValue, notes } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // 1. Update lead status
    lead.status = 'Converted';
    await lead.save();

    // 2. Create customer
    const customer = await Customer.create({
      leadId: lead._id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      totalSpent: dealValue || 0,
      notes: notes || '',
      status: 'Active',
      joinedAt: new Date(),
    });

    res.status(201).json({ lead, customer });
  } catch (error) {
    res.status(500).json({ message: 'Server Error converting lead', error });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Public (Will be protected later)
export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error retrieving leads', error });
  }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, status, source, value, notes } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide name and email' });
    }

    const lead = await Lead.create({
      name, email, phone, company, status, source, value, notes
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating lead', error });
  }
};

// @desc    Update a lead (e.g. status change)
// @route   PUT /api/leads/:id
// @access  Public
export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating lead', error });
  }
};

// @desc    Add timeline entry to a lead
// @route   POST /api/leads/:id/timeline
// @access  Public
export const addTimelineEntry = async (req: Request, res: Response) => {
  try {
    const { type, content, user } = req.body;
    
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          timeline: {
            $each: [{
              type,
              content,
              user: user || 'Unknown User',
              createdAt: new Date(),
            }],
            $position: 0
          }
        }
      },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: 'Server Error adding timeline entry', error });
  }
};
