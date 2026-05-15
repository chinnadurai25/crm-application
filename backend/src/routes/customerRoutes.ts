import express from 'express';
import { 
  getCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  addCustomerTimelineEntry 
} from '../controllers/customerController';

const router = express.Router();

router.route('/')
  .get(getCustomers)
  .post(createCustomer);

router.route('/:id')
  .get(getCustomerById)
  .put(updateCustomer);

router.post('/:id/timeline', addCustomerTimelineEntry);

export default router;
