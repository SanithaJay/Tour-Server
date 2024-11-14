import express, { Router } from "express";
import { authenticate,restrict } from "../auth/verifyToken.js";
import { deleteTour, getAllTour, getSingleTour, newTour, searchTours, updateTour } from "../controller/tourController.js";

const router=express.Router();

router.post("/newTour",authenticate,restrict(["admin"]),newTour);
router.put("/updateTour/:id",authenticate,restrict(["admin"]),updateTour);
router.delete("/deleteTour/:id",authenticate,restrict(["admin"]),deleteTour);
router.get("/getAllTour",getAllTour);
router.get("/getSingleTour/:id",getSingleTour);
router.get("/searchTours", searchTours);



export default router;