import { Router } from 'express';
import workOpportunityController from '../controllers/job-controller';

const router: Router = Router();

router.post('/registeropportunities', workOpportunityController.createWorkOpportunity);

router.get('/work-opportunities', workOpportunityController.getAllWorkOpportunities);

router.get('/opportunities/filter', workOpportunityController.filterWorkOpportunities);


export default router;