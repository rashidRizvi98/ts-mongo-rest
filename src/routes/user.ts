import express from 'express'
import userService from '../services/user'
const router=express.Router()


router.post('/register',userService.registerUser)
router.post('/sign-in',userService.signIn)
router.post('/refresh-token',userService.refreshTokenForUser)
router.delete('/sign-out',userService.signOut)

export default router