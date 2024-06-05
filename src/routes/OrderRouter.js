const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware} = require("../middleware/authMiddleware");

router.post("/create", authUserMiddleware, OrderController.createOrder);
router.get("/getOrderDetails/:id", OrderController.getOrderDetails);
router.get("/getDetailsOrder/:id", OrderController.getDetailsOrder);
router.delete("/cancelOrder/:id", OrderController.cancelOrder);
router.get("/getAllOrder", OrderController.getAllOrder);


module.exports = router;