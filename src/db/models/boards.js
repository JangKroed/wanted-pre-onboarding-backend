import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';

class Boards extends Model {
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'userId' });
  }
}

Boards.init(
  {
    boardId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      },
      onDelete: 'cascade',
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Boards',
  }
);

export default Boards;
