import express from 'express';
import { test,updateUser,deleteUser, getUserListings } from '../controllers/user.controller.js';
import { verifytoken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id',verifytoken,updateUser);
router.delete('/delete/:id',verifytoken,deleteUser);
router.get('/listings/:id',verifytoken,getUserListings);
export default router;