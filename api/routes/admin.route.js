import express from "express"
import { LoginAdmin, viewUsersList, updateUser } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signin", LoginAdmin)
router.get("/view-users", viewUsersList)
router.post("/update-user/:id", updateUser)


export default router