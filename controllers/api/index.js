const router = require("express").Router();
const userRoutes = require("./user-routes");
const inventoryRoutes = require("./inventoryRoutes");
const warehouseRoutes = require("./warehouseRoutes");

router.use("/user", userRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/warehouse", warehouseRoutes);

module.exports = router;
