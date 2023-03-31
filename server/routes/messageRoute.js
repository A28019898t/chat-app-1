import express from "express";
import { getAllMessage, addMessage } from "../controllers/messageController.js";
const router = express.Router();

router.post('/addmsg', addMessage);
router.post('/getmsg', getAllMessage);

export default router;