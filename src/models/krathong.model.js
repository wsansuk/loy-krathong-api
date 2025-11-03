const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Krathong = sequelize.define(
  "Krathong",
  {
    krathong_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    krathong_type: { type: DataTypes.INTEGER, allowNull: false },
    emp_name: { type: DataTypes.STRING(50), allowNull: false },
    emp_department: { type: DataTypes.STRING(50), allowNull: false },
    emp_wish: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: "krathongs", timestamps: false, underscored: true }
);

module.exports = Krathong;
