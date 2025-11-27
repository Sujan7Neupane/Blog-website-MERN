import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllActivePost,
  getAllPost,
  getIndividualPost,
  updatePost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middlware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/create-post")
  .post(verifyJWT, upload.single("featuredImage"), createPost);

router.route("/active-post").get(verifyJWT, getAllActivePost);

router.route("/all").get(getAllPost);

router.route("/p/:id").get(verifyJWT, getIndividualPost);

router
  .route("/update/:id")
  .put(verifyJWT, upload.single("featuredImage"), updatePost);

router.route("/delete/:id").delete(verifyJWT, deletePost);

export default router;
