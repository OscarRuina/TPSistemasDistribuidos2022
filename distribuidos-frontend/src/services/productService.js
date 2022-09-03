import axios from 'axios';
const URL = 'http://localhost:5500';

export const getProduct = async product => {
  let payload = JSON.stringify(product);

  const res = await axios.get('http://localhost:5500/getProduct', {
    params: { payload },
  });
  return await res.data;
};
