import express from "express"
import { LoginAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signin", LoginAdmin)


export default router