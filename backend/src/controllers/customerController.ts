import { Request, Response } from 'express';
import Customer from '../models/Customer';

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error retrieving customers', error });
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Public
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error retrieving customer', error });
  }
};

// @desc    Create a new customer (or convert from lead)
// @route   POST /api/customers
// @access  Public
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Customer with this email already exists' });
    }
    res.status(500).json({ message: 'Server Error creating customer', error });
  }
};
