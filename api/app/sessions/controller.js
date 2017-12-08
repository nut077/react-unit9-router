import {Users} from '../users'
import SessionsSerializer from './serializer'

const SessionController = {
  create(req, res) {
    const {email, password} = req.body;
    const user = Users.findByEmail(email);
    if (typeof user !== 'undefined') {
      Users.verify(user, password).then(isValid => {
        if (isValid) {
          res
            .header({
              'Authorization': `Bearer ${Users.genToken(user)}`,
              'User': user.email,
              'Id': user.id
            })
            .status(201)
            .json({
              user: SessionsSerializer.for('create', user)
            })
        } else {
          res
            .status(401)
            .json({
              user: {
                errors: ['Invalid credentials.']
              }
            })
        }
      })
    } else {
      res
        .status(401)
        .json({
          user: {
            errors: ['Invalid credentials.']
          }
        })
    }
  }
};

export default SessionController