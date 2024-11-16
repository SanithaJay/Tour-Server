import express from "express";
import { authenticate,restrict } from "../auth/verifyToken.js";
import { createReview, getAllReview, getTourReview } from "../controller/reviewController.js";


const router=express.Router();

router.post("/newReview/:id",authenticate,restrict(["user"]),createReview);
router.get("/getAllReviews",getAllReview);
router.post("/getTourReview/:id",getTourReview);

export default router;