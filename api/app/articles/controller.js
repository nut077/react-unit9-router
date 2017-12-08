import Articles from './model'
import ArticlesPolicy from './policy'

const ArticleController = {
  getAll(req, res) {
    const { page, perPage, categoryId } = req.query;
    let condition = {};
    !!categoryId ? condition['categoryId'] = categoryId : '';
    res.json({
      articles: Articles.pagination(condition, page, perPage)
    })
  },

  get(req, res) {
    res.json({
      article: Articles.find(req.params.id)
    })
  },

  create(req, res) {
    if (ArticlesPolicy.for('create', req.user)) {
      const data = {
        ...req.body,
        authorId: req.user.id
      };
      const article = Articles.create(data);
      res
        .status(201)
        .json({article})
    } else {
      res
        .status(401)
        .json({
          error: ['You are not allowed to create the article.']
        })
    }
  },

  update(req, res) {
    const id = req.params.id;
    if (ArticlesPolicy.for('update', req.user, Articles.find(id))) {
      const article = Articles.update(id, req.body);
      res
        .status(200)
        .json({article})
    } else {
      res
        .status(401)
        .json({
          error: ['You are not allowed to update the article.']
        })
    }

  },

  delete(req, res) {
    const id = req.params.id;
    if (ArticlesPolicy.for('delete', req.user, Articles.find(id))) {
      Articles.delete(id);
      res
        .status(204)
        .json({id: `delete article id: ${id}`})
    } else {
      res
        .status(401)
        .json({
          error: ['You are not allowed to delete the article.']
        })
    }
  }

};

export default ArticleController