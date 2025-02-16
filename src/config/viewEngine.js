import express from "express";

const configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
  // Cấu hình Express phục vụ ảnh trong thư mục uploads
  app.use(express.static('./src/uploads'));

};

export default configViewEngine;
