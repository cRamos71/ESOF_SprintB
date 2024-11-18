import { Router } from 'express';
import workOpportunityController from '../controllers/job-controller';
import { verifyToken } from '../middleware/auth-middleware'; // Import the token verification middleware


const router: Router = Router();

router.post('/registeropportunities', verifyToken, workOpportunityController.createWorkOpportunity);

router.get('/work-opportunities', verifyToken,workOpportunityController.getAllWorkOpportunities);

router.get('/opportunities/filter', verifyToken, workOpportunityController.filterWorkOpportunities);


export default router;