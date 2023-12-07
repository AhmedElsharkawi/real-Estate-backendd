import express from "express"
import { signup , signin, google, signOut} from "../controllers/auth.controller.js"
const router = express.Router()


router.post("/register", signup)
router.post("/login", signin)
router.post("/google", google)
router.get("/signout", signOut)

export default router 