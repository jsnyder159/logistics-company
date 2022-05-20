const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Warehouse extends Model {}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [2, 30],
      },
    },
    location: {
      street: {
        type: DataTypes.STRING(30),
      },
      city: {
        type: DataTypes.STRING(30),
      },
      state: {
        type: DataTypes.STRING,
      },
      zip: {
        type: DataTypes.INTEGER,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    warehousenumber: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "warehouse",
  }
);

module.exports = Warehouse;
