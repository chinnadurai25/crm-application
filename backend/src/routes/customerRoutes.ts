import express from 'express';
import { 
  getCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  addCustomerTimelineEntry,
  getCustomerByEmail,
  deleteCustomer
} from '../controllers/customerController';

const router = express.Router();

router.route('/')
  .get(getCustomers)
  .post(createCustomer);

router.get('/email/:email', getCustomerByEmail);

router.route('/:id')
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer);

router.post('/:id/timeline', addCustomerTimelineEntry);

export default router;
