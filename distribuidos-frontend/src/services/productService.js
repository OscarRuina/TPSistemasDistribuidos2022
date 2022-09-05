import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const getAllProducts = async userId => {
  return await axios
    .get(`${BASE_URL}/product?userId=${userId}`)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const createProduct = async product => {
  axios
    .post(`${BASE_URL}/product`, product)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
