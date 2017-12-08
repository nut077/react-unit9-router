import Policy from '../policy'

const ArticlesPolicy = {
  ...Policy,

  create(user) {
    return !!user
  },

  update(user, article) {
    return user && (user.isAdmin || user.id === article.authorId)
  },

  delete(user, article) {
    return user && (user.isAdmin || user.id === article.authorId)
  }
};

export default ArticlesPolicy