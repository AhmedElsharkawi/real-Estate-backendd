import express from "express";
import { DeleteUser, getAllUsers , getUser, getUserListings, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/VerifyToken.js";

const router = express.Router();

router.get("/",  getAllUsers);
router.put("/:id",verifyToken,  updateUser);
router.delete("/:id",verifyToken, DeleteUser);
router.get("/listing/:id",verifyToken, getUserListings);
router.get("/:id",verifyToken, getUser);

export default router;
