import React from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export default function useProducts(userId) {
  const [products, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const getAllProducts = async userId => {
      setLoading(true);
      const resp = await axios.get(`${BASE_URL}/product`, {
        params: { userId: userId },
      });
      if (resp.data.products) {
        setProduct(resp.data.products);
      }
      setLoading(false);
    };

    getAllProducts(userId);
  }, []);

  return { products, loading, error };
}

export function useGetProductsPurchased(userIdPurchase) {
  const [products, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const getAllProductsPurchased = async userIdPurchase => {
      setLoading(true);
      const resp = await axios.get(`${BASE_URL}/product`, {
        params: { userIdPurchase: userIdPurchase },
      });
      if (resp.data.products) {
        setProduct(resp.data.products);
      }
      setLoading(false);
    };

    getAllProductsPurchased(userIdPurchase);
  }, []);

  return { products, loading, error };
}

export function useGetProductsDiferent(userIdDistinct) {
  const [products, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const getAllProductsDiferent = async userIdDistinct => {
      setLoading(true);
      const resp = await axios.get(`${BASE_URL}/product`, {
        params: { userIdDistinct: userIdDistinct },
      });
      if (resp.data.products) {
        setProduct(resp.data.products);
      }
      setLoading(false);
    };

    getAllProductsDiferent(userIdDistinct);
  }, []);

  return { products, loading, error };
}
