import express from "express";
import { newSubscribe } from "../controller/subscribeController.js";



const router=express.Router();

router.post("/newsubscribe",newSubscribe);


export default router;

