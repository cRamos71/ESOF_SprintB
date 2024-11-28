import { Router } from 'express';
import workOpportunityController from '../controllers/job-controller';
import { verifyToken } from '../../middleware/auth-middleware'; 


const router: Router = Router();

router.post('/registeropportunities', verifyToken, workOpportunityController.createWorkOpportunity);

router.get('/work-opportunities', verifyToken,workOpportunityController.getAllWorkOpportunities);

router.post('/opportunities/filter', verifyToken, workOpportunityController.filterWorkOpportunities);

router.get('/candidatures', verifyToken, workOpportunityController.opportunitiesCandidatures);


export default router;