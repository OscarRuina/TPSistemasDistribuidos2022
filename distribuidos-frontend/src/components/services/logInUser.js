import axios from 'axios';
import { useQuery } from 'react-query';

const URL = 'http://localhost:5500/login';

export const logInUser = async () => {
  const resp = await axios.get(URL);
  return await resp.data;
};
