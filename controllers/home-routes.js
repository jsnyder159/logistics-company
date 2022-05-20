const router = require("express").Router();
const { User, Inventory, Warehouse } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const inventoryData = await Inventory.findAll();
    const warehouseData = await Inventory.findAll();

    const inventory = inventoryData.map((inventory) =>
      inventory.get({ plain: true })
    );
    const warehouse = warehouseData.map((warehouse) =>
      warehouse.get({ plain: true })
    );

    res.render("homepage", {
      inventory,
      warehouse,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  } else {
    res.render("login");
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  } else {
    res.render("signup");
  }
});

router.get("/create", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("create", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/inventory/:id", async (req, res) => {
  try {
    const inventoryData = await Inventory.findByPk(req.params.id, {
      include: [
        { model: Warehouse },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    const inventory = inventoryData.get({ plain: true });

    res.render("inventory", {
      ...inventory,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err, "Error with getting that inventory item.")
  }
});

module.exports = router;
