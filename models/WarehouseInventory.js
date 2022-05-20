const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class WarehouseInventory extends Model {}

WarehouseInventory.init(
  {
    WarehouseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Warehouse",
        key: "id",
      },
    },
    InventoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Inventory",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "warehouseinventory",
  }
);

module.exports = WarehouseInventory;
