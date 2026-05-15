import express from 'express';
import { 
  getLeads, 
  createLead, 
  updateLead, 
  addTimelineEntry,
  convertLeadToCustomer 
} from '../controllers/leadController';

const router = express.Router();

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id')
  .put(updateLead);

router.route('/:id/timeline')
  .post(addTimelineEntry);

router.post('/:id/convert', convertLeadToCustomer);

export default router;
