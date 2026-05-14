import express from 'express';
import { getLeads, createLead, updateLead, addTimelineEntry } from '../controllers/leadController';

const router = express.Router();

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id')
  .put(updateLead);

router.route('/:id/timeline')
  .post(addTimelineEntry);

export default router;
