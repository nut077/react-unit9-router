import db from '../db'
import Finder from './finder'
import Pagination from './pagination'

const Model = {
  ...Finder,
  ...Pagination,

  create(attrs) {
    const collection = this.collection();
    const length = collection.length;
    let id = 1;
    if (length > 0) {
      id = collection[length - 1].id + 1;
    }
    const record = this.withPermittedAttrs(attrs, {id});
    this.setCollection([...collection, record]);
    return record;
  },

  update(id, attrs) {
    const collection = this.collection();
    const index = this.findIndex(id);
    const updatedRecord = this.withPermittedAttrs(attrs, collection[index]);
    this.setCollection([
      ...collection.slice(0, index),
      updatedRecord,
      ...collection.slice(index + 1)
    ]);
    return updatedRecord;
  },

  delete(id) {
    const collection = this.collection();
    const index = this.findIndex(id);
    this.setCollection([
      ...collection.slice(0, index),
      ...collection.slice(index + 1)
    ]);
  },

  collection() {
    return db[this.key]
  },

  setCollection(collection) {
    db[this.key] = collection
  },

  withPermittedAttrs(attrs, init = {}) {
    return this.permittedAttrs.reduce(
      (result, item) =>
        attrs[item] ? {...result, [item]: attrs[item]} : result
      , init)
  }
};

export default Model