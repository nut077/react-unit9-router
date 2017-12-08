import Serializer from '../serializer'

const UserSerializer = {
  ...Serializer,

  get(user) {
    return this.serializer(user)
  },

  getAll(users) {
    return users.map(user => this.serializer(user))
  },

  create(user) {
    return this.serializer(user)
  },

  serializer(user) {
    const { id, email, isAdmin } = user;
    return { id, email, isAdmin };
  }
};

export default UserSerializer