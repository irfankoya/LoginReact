import express from 'express'
const app = express()
const router = express.Router()
import { adminLogin, deleteUser, edit, userData} from '../controller/admin.controller.js'
import multer from 'multer';
import { verifyToken } from '../utils/verifyUser.js'

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {  
      cb(null, 'api/uploads/')
    }, 
    filename: function (req, file, cb) { 
      const uniqueSuffix = Date.now();
      cb(null,uniqueSuffix + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/login', adminLogin)
router.post('/userdata', userData)
router.post('/edit',upload.single('image'), edit)   
router.delete('/delete/:id', deleteUser);
 

export default router

 