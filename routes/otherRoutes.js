import express from "express";
import { contact, feedback } from "../controllers/otherController.js";

const router = express.Router();

router.route("/contact").post(contact);

router.route("/feedback").post(feedback);

export default router;
