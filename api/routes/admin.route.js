import express from "express"
import { LoginAdmin, viewUsersList } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signin", LoginAdmin)
router.get("/view-users", viewUsersList)


export default router