import axios from 'axios';

export const getBalance = async user => {
  return await axios.get(`http://localhost:5500/balance/`).then(res => {
    return res.data;
  });
};
