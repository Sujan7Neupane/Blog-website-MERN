import { Router } from "express";
import {
  getCurrentUser,
  rotateRefreshToken,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middlware.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);

router.route("/login").post(userLogin);

router.route("/logout").post(verifyJwt, userLogout);

router.route("/refresh-token").get(verifyJwt, rotateRefreshToken);

router.route("/current-user").get(verifyJwt, getCurrentUser);

export default router;
