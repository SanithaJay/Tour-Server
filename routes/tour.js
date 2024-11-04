import express, { Router } from "express";
import { authenticate,restrict } from "../auth/verifyToken.js";
import { newTour, updateTour } from "../controller/tourController.js";

const router=express.Router();

router.post("/newTour",authenticate,restrict(["admin"]),newTour);
router.put("/updateTour/:id",authenticate,restrict(["admin"]),updateTour);



export default router;