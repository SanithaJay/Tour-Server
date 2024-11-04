import express, { Router } from "express";
import { authenticate,restrict } from "../auth/verifyToken.js";
import { newTour } from "../controller/tourController.js";

const router=express.Router();

router.post("/newTour",authenticate,restrict(["admin"]),newTour);


export default router;