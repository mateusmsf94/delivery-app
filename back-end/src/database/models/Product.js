module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product', 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      urlImage: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'products'
    },
  );

  Product.associate = (models) => {
    Product.hasMany(models.User, { foreignKey: 'id', as: 'sale_product' });
  };

  return Product;
};