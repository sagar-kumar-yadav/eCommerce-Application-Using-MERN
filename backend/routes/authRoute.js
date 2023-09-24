import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// Register || Method POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

// forgot password || Post
router.post("/forgot-password", forgotPasswordController);

// test routes
// we create two middlewares in requireSignIn we check token and isAdmin we check the admin
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route auth
// here we check two condition token and isAdmin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
