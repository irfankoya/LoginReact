import express from 'express'
import { deleteUser, getUser, test, updateUser } from '../controller/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()

router.get('/', test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/getUser/:id', getUser)
 

export default router