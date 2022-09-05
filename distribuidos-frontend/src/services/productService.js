import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const getProduct = async product => {
  let payload = JSON.stringify(product);

  const res = await axios.get(`${BASE_URL}/getProduct`, {
    params: { payload },
  });
  return await res.data;
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
