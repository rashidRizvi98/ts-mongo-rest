import express,{Express} from 'express'
import { requireSignIn } from '../commons/authMiddleware'
import developerController from '../controllers/developer'


const router=express.Router()

router.get('/',requireSignIn,developerController.findDevelopers)
router.get('/:id',developerController.findDeveloper)
router.post('/',developerController.createDeveloper)
router.patch('/:id',developerController.updateAssignment)
router.delete('/:id',developerController.deleteDeveloper)

export default router