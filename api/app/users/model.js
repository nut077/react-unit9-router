import Model from '../model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'

const User = {
  ...Model,
  key: 'users',
  permittedAttrs: ['email', 'isAdmin'],

  create(email, password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, (err, hash) => {
        if (err) return reject(err);
        const collection = this.collection();
        const length = collection.length;
        let id = 1;
        if (length > 0) {
          id = collection[length - 1].id + 1
        }
        const user = {
          id,
          email,
          password: hash,
          isAdmin: false
        };
        this.setCollection([...collection, user]);
        return resolve(user);
      })
    });
  },

  genToken(user) {
    return jwt.sign({ sub: user.id }, config.secretKey, { expiresIn: '3day' })
  },

  findByEmail(email) {
    return this.collection().find(({email: mail}) => mail === email)
  },

  verify(user, password) {
    return new Promise((resolve, reject) => {
      const hash = user.password;

      bcrypt.compare(password, hash, (err, isValid) => {
        if (err) return reject(err);
        return resolve(isValid)
      })
    })
  }
};

export default User;