import { Router } from "express";
import passport from "passport";
import {
  signIn,
  signOut,
  signUp
} from "../../controllers/authController.js";

const router = Router();

router.post("/sign-in", passport.authenticate("sign-in", { session: false}), signIn);
router.post("/sign-out", signOut);
router.post("/sign-up", passport.authenticate("sign-up", { session: false}), signUp);

export default router;
