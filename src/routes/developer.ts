import express,{Express} from 'express'
import developerService from '../services/developer'
import userService from '../services/user'

const router=express.Router()

router.get('/',userService.requireSignIn,developerService.findDevelopers)
router.get('/:id',developerService.findDeveloper)
router.post('/',developerService.createDeveloper)
router.patch('/:id',developerService.updateAssignment)
router.delete('/:id',developerService.deleteDeveloper)

export default router