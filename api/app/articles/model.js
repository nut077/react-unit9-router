import Model from '../model'

const Articles = {
  ...Model,
  key: 'articles',
  permittedAttrs: ['title', 'authorId', 'content', 'categoryId']
};

export default Articles