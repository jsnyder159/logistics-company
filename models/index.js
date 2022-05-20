const User = require("./User");
const Inventory = require("./Inventory");
const Warehouse = require("./Warehouse");
const UserWarehouse = require("./UserWarehouse");
const WarehouseInventory = require("./WarehouseInventory");

User.belongsToMany(Warehouse, { through: UserWarehouse });

Warehouse.belongsToMany(User, { through: UserWarehouse });

Warehouse.belongsToMany(Inventory, { through: WarehouseInventory });

Inventory.belongsToMany(Warehouse, { through: WarehouseInventory });

module.exports = { User, Inventory, Warehouse };
