import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const toBuyShoppingCart = async shoppingCart => {
  return await axios
    .post(`${BASE_URL}/shoppingcart`, shoppingCart)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};