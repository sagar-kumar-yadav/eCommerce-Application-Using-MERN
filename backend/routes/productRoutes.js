import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import { upload } from "./../middlewares/multerMiddleware.js";

// router object
const router = express.Router();

// create product
router.post(
  "/create-product",
  upload.fields([
    {
      name: "photos",
      maxCount: 5,
    },
  ]),
  // requireSignIn,
  // isAdmin,
  createProductController
);


// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  updateProductController
);

// get all products
router.get("/get-products", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/product-filter", productFilterController);

// // product count
router.get("/product-count", productCountController);

// // product per page
router.get("/product-list/:page", productListController);

// // search product
router.get("/search/:keyword", searchProductController);

// // similar product
router.get("/related-product/:pid/:cid", relatedProductController);

// // category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
