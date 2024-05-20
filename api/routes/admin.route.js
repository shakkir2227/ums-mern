import express from "express"
import { LoginAdmin, viewUsersList, updateUser,deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signin", LoginAdmin)
router.get("/view-users", viewUsersList)
router.post("/update-user/:id", updateUser)
router.post("/delete-user/:id", deleteUser)


export default router