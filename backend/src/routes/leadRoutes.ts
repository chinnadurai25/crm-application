import express from 'express';
import multer from 'multer';
import { 
  getLeads, 
  createLead, 
  updateLead, 
  addTimelineEntry,
  convertLeadToCustomer,
  bulkCreateLeads,
  deleteLead
} from '../controllers/leadController';

const router = express.Router();

// Multer setup for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.route('/')
  .get(getLeads)
  .post(createLead);

router.post('/bulk', upload.single('file'), bulkCreateLeads);

router.route('/:id')
  .put(updateLead)
  .delete(deleteLead);

router.route('/:id/timeline')
  .post(addTimelineEntry);

router.post('/:id/convert', convertLeadToCustomer);

export default router;
