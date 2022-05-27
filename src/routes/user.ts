import express from 'express'

import userController from '../controllers/user'

const router=express.Router()


router.post('/register',userController.registerUser)
router.post('/sign-in',userController.signIn)
router.post('/refresh-token',userController.refreshTokenForUser)
router.delete('/sign-out',userController.signOut)

export default router