import express from "express";
import { newUser,login } from "../controller/authController.js";


const router=express.Router();

router.post("/newuser",newUser);
router.get("/login",login);

export default router;

