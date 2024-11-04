import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { updateUser } from "../controller/userController.js";


const router=express.Router();


router.put("/:id",authenticate,updateUser);

export default router;

