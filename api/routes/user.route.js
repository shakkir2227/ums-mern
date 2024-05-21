import express from "express"
import { getCurrentProfileData, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test) 
router.post("/update", verifyToken, updateUser)
router.get("/updated-profile", verifyToken, getCurrentProfileData)

export default router