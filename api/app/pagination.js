const Pagination = {
  pagination(conditons, page = 1, perPage = 5) {
    const queryResult = this.where(conditons);

    return {
      [this.key]: queryResult.slice((page - 1) * perPage, page * perPage),
      meta: {
        page,
        perPage,
        totalPages: Math.ceil(queryResult.length / perPage)
      }
    }
  }
};

export default Pagination