import { router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { registerUser } from "../controllers/user.controller.js";

const router = router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);

export default router;
