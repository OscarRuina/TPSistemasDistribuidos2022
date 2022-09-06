import axios from 'axios';
import React, { useEffect } from 'react';

const BASE_URL = 'http://127.0.0.1:5000';

export default function useGetBalance(userId) {
  const [balance, setBalance] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const getBalance = async () => {
    setLoading(true);
    try {
      const resp = await axios.post(`${BASE_URL}/addWallet`, {
        balance: 0,
        userId: userId,
      });
      const data = await resp.data.balance;
      setBalance(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return { balance, loading, error };
}
