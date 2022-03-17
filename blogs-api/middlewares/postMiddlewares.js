const TITLE_DOES_NOT_EXIST = '"title" is required';
const CONTENT_DOES_NOT_EXIST = '"content" is required';
const CATEGORYIDS_DOES_NOT_EXIST = '"categoryIds" is required';
const CATEGORIES_CAN_NOT_BE_EDITED = 'Categories cannot be edited';

// Title
const titleExists = (title) => typeof title !== 'undefined' && title !== 'null';

const validateTitle = (req, res, next) => {
  const { title } = req.body;

  if (!titleExists(title)) {
    return res.status(400).json({ message: TITLE_DOES_NOT_EXIST });
  }

  next();
};

// Content
const contentExists = (content) => typeof content !== 'undefined' && content !== 'null';

const validateContent = (req, res, next) => {
  const { content } = req.body;

  if (!contentExists(content)) {
    return res.status(400).json({ message: CONTENT_DOES_NOT_EXIST });
  }

  next();
};

// categoryIds
const categoryIdsExists = (categoryIds) => (
  typeof categoryIds !== 'undefined' && categoryIds !== 'null'
);

const categoryIdsIsNotEmpty = (categoryIds) => (
  categoryIds.length > 0
);

const validateCategoryIds = (req, res, next) => {
  const { categoryIds } = req.body;

  switch (true) {
    case (!categoryIdsExists(categoryIds)):
      return res.status(400).json({ message: CATEGORYIDS_DOES_NOT_EXIST });
    case (!categoryIdsIsNotEmpty(categoryIds)):
      return res.status(400).json({ message: CATEGORYIDS_DOES_NOT_EXIST });
    default:
      next();
  }
};

const validateThatThereAreNoCategoryIds = (req, res, next) => {
  const { categoryIds } = req.body;

  switch (true) {
    case (!categoryIdsExists(categoryIds)):
      return next();
    default:
      return res.status(400).json({ message: CATEGORIES_CAN_NOT_BE_EDITED });
  }
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
  validateThatThereAreNoCategoryIds,
};
