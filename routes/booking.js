import express from "express";
import { authenticate,restrict } from "../auth/verifyToken.js";
import { createReview } from "../controller/reviewController.js";
import { createBooking } from "../controller/BookingController.js";


const router=express.Router();

router.post("/newBooking/:id",authenticate,restrict(["user"]),createBooking);

export default router;