import express from "express";
import methodOverride from "method-override";
import apiController from "../controllers/APIController/LoginRegisterController";
import postController from "../controllers/APIController/postController";
import houseController from "../controllers/houseController";
const router = express.Router();
router.use(methodOverride("_method"));

const initApiRoutes = (app) => {
  //api đăng kí đăng nhập
  router.post("/register", apiController.register);
  router.post("/login", apiController.login);
  router.post("/comment/house/:id", houseController.addCommentByUser);
  //api gửi đi tất cả post (house)
  router.get("/posts/read", postController.fetchAllPost);
  //api đăng tin bài viết thuê nhà
  router.post("/posts/upload", postController.uploadAPost);
  router.get("/house/:id", houseController.getHouseByIdUser);
  return app.use("/api/v1/", router);
};

export default initApiRoutes;
