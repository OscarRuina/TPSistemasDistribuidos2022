import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

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

export const getAllProducts = async userId => {
  return await axios
    .get(`${BASE_URL}/product`, { params: { userId: userId } })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getAllProductsDiferent = async productForm => {
  return await axios
    .get(`${BASE_URL}/product`, {
      params: { ...productForm },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
};

export const getAllProductsSubastaByDistinctUserId = async userId => {
  console.log(userId);
  return await axios
    .get(`${BASE_URL}/auctions`, {
      params: { userId: userId },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
};

export const getAllProductsPurchased = async userIdPurchase => {
  return await axios
    .get(`${BASE_URL}/product`, {
      params: { userIdPurchase: userIdPurchase },
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getProductById = (userId, productId) => {
  return getAllProducts(userId)
    .then(res => {
      let prod = res.data.products.filter(product => product.id == productId);
      return prod[0];
    })
    .catch(err => {
      return err;
    });
};

export const updateProduct = async product => {
  return await axios.post(`${BASE_URL}/updproduct`, product).then(res => {
    return res;
  });
};


