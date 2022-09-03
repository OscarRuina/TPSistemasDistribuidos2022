import axios from 'axios';
const URL = 'http://localhost:5500/login';

export const logInUser = async () => {
  const resp = await axios.get(URL);
  return await resp.data;
};

export const registerUser = loginForm => {
  let payload = {
    user: loginForm.user,
    password: loginForm.password,
  };
  console.log(payload);
};

export const disconnect = () => {
  window.localStorage.clear();
};
