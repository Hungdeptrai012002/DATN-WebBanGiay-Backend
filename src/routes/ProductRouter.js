const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", authMiddleware, ProductController.updateProduct);
router.get("/details/:id", ProductController.getDetailsProduct);
router.delete("/delete/:id",authMiddleware, ProductController.deleteProduct);
router.get("/getall", ProductController.getAllProduct);
router.post("/deletemany",authMiddleware, ProductController.deleteManyProduct);
router.get("/getalltype", ProductController.getAllType);

module.exports = router;