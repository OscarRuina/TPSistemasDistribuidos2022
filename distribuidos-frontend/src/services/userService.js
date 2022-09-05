import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:5000';

export const logInUser = async (username, password) => {
  return await axios
    .post(`${BASE_URL}/login`, {
      username: username,
      password: password,
    })
    .then(res => {
      console.log(res);
      return res;
    });
};

export const registerUser = async ({
  name,
  lastname,
  email,
  username,
  password,
}) => {
  console.log(name);
  return await axios
    .post(`${BASE_URL}/user`, {
      name: name,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
    })
    .then(res => {
      return res;
    });
};

export const disconnect = () => {
  window.localStorage.clear();
};
