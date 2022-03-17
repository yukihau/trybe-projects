require('dotenv').config();

const { Category, BlogPost, PostCategory, User } = require('../models');

// Messages
const CATEGORIES_DO_NOT_EXIST = '"categoryIds" not found';
const UNAUTHORIZED = 'Unauthorized user';

// Validations
// Referência: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
const validateIfCategoriesExist = async (categoryIds) => {
  const result = await Promise.all(categoryIds.map(async (categoryId) => {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (category === null) return undefined;
    return category;
  }));
  if (result.includes(undefined)) return false;
  return true;
};

// Services
const create = async ({ post, userId }) => {
  const categoriesExist = await validateIfCategoriesExist(post.categoryIds);
  if (!categoriesExist) return { code: 400, data: { message: CATEGORIES_DO_NOT_EXIST } };

  const userPost = { userId, title: post.title, content: post.content };
  const { dataValues: { id: postId } } = await BlogPost.create(userPost);

  const postsWithCategories = post.categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(postsWithCategories);

  const result = { id: postId, ...userPost };
  return { code: 201, data: result };
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { code: 200, data: result };
};

const getById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) return { code: 404, data: { message: 'Post does not exist' } };

  return { code: 200, data: result };
};

const update = async ({ newPost, id, userId }) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
    exclude: ['published', 'updated'],
  });

  switch (true) {
    case (!post):
       return { code: 404, data: { message: 'Post does not exist' } };
    case (post.userId !== userId):
      return { code: 401, data: { message: UNAUTHORIZED } };
    default:
      post.set(newPost);
      return { code: 200, data: post };
  }
};

module.exports = { create, getAll, getById, update };