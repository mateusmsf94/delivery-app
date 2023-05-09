module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale', 
    { 
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      totalPrice: DataTypes.DECIMAL,
      deliveryAdrress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleData: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'sales',
    },
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  };

  return Sale;
};