import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';

class Users extends Model {
  static associate(models) {
    this.hasMany(models.Boards, {
      as: 'Boards',
      foreignKey: 'userId',
    });
  }
}

Users.init(
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Users',
  }
);

export default Users;
