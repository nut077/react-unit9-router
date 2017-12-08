import Cookies from 'js-cookie'

function setToken(header) {
  const authorization = header.get('Authorization');
  const user = header.get('User');
  const id = header.get('Id');
  if (!!authorization && !!user) {
    Cookies.set('access-token', authorization);
    Cookies.set('user', user);
    Cookies.set('id', id);
  }
}

function getToken() {
  return Cookies.get('access-token');
}

function removeToken() {
  Cookies.remove('access-token');
  Cookies.remove('user');
  Cookies.remove('id');
}

function getUser() {
  return Cookies.get('user');
}

function getUserId() {
  return Cookies.get('id');
}

export default {
  setToken,
  getToken,
  removeToken,
  getUser,
  getUserId
}