import Users from './model'
import UserSerializer from './serializer'

const UserController = {
  getAll(req, res) {
    res.json({
      users: UserSerializer.for('getAll', Users.findAll())
    })
  },

  get(req, res) {
    res.json({
      user: UserSerializer.for('get', Users.find(req.params.id))
    })
  },

  create(req, res) {
    const {email, password} = req.body;
    Users.create(email, password).then(
      user =>
        res
          .header({
            'Authorization': `Bearer ${Users.genToken(user)}`,
            'User': user.email,
            'Id': user.id
          })
          .status(201)
          .json({user: UserSerializer.for('create', user)})
    )
  }
};

export default UserController