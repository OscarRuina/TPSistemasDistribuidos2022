import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const addBalance = async (userId, balance) => {
  return await axios
    .post(`${BASE_URL}/addWallet`, {
      balance: balance,
      userId: userId,
    })
    .then(res => {
      return res.data.balance;
    });
};
