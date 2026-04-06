import express from 'express';
import { getLeads, createLead, updateLead } from '../controllers/leadController';

const router = express.Router();

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id')
  .put(updateLead);

export default router;
