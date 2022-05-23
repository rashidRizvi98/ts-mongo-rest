const express=require('express')
const router=express.Router()
const userService=require('../services/user')

router.post('/register',userService.registerUser)
router.post('/sign-in',userService.signIn)
router.post('/refresh-token',userService.refreshTokenForUser)
router.delete('/sign-out',userService.signOut)

module.exports=router