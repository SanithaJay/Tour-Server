import express from "express";
import { newUser } from "../controller/authController.js";


const router=express.Router();

router.post("/newuser",newUser);

export default router;

