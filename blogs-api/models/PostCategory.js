const associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: models.PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
  models.Category.belongsToMany(models.BlogPost, {
    as: 'blogPosts',
    through: models.PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {},
    {
      tableName: 'PostsCategories',
      timestamps: false,
    },
  );

  PostCategory.associate = associate;

  return PostCategory;
};