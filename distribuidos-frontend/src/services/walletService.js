import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const getBalance = async userId => {
  let balance = 0;
  return await axios
    .post(`${BASE_URL}/addWallet`, {
      balance: balance,
      userId: userId,
    })
    .then(res => {
      console.log(res);
    });
};

export const addBalance = async (balance, userId) => {
  return await axios
    .post(`http://localhost:5000/addWallet`, {
      balance: balance,
      userId: userId,
    })
    .then(res => {
      return res.data;
    });
};
