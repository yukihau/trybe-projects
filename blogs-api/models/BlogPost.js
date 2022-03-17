const associate = (models) => {
  models.BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    table: 'BlogPosts',
    createdAt: 'published',
    updatedAt: 'updated',
  });
  
  BlogPost.associate = associate;
  
  return BlogPost;
};