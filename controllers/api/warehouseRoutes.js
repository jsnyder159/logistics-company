const router = require("express").Router();
const { Warehouse, Inventory, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const warehouseData = await Warehouse.findAll({
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        { model: Inventory },
      ],
    });
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err, "Error getting those warehouses.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const warehouseData = await Warehouse.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        { model: Inventory },
      ],
    });

    if (!warehouseData) {
      res.status(404).json({ message: "No warehouse with this id." });
      return;
    }
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err, "Error getting a warehouse with that id.");
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const warehouseData = await Warehouse.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err, "Error Adding Warehouse.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const warehouseData = await Warehouse.update(
      {
        id: req.body.id,
        name: req.body.name,
        location: {
          street: req.body.location.street,
          city: req.body.location.city,
          state: req.body.location.state,
          zip: req.body.location.zip,
          country: req.body.location.country,
        },
        warehousenumber: req.body.warehousenumber,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!warehouseData) {
      res.status(404).json({ message: "No warehouse exsists with this id." });
      return;
    }
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err, "Error updating warehouse.");
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const warehouseData = await Warehouse.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!warehouseData) {
      res.status(404).json({ message: "No Warehouse with that id was found." });
      return;
    }
    res.status(200).json(warehouseData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err, "Error Deleting Warehouse.");
  }
});

module.exports = router;
