const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserWarehouse extends Model {}

UserWarehouse.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    WarehouseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Warehouse",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userwarehouse",
  }
);

module.exports = UserWarehouse;
