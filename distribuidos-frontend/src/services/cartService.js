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

export const enviarInvoicesAKafka = async invoices => {
  return await axios
    .post(`${BASE_URL}/messages`, {topic: "invoice", message: invoices})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const enviarServerConsumaInvoices = async () => {
  return await axios
    .get(`http://127.0.0.1:8080/api/consumer/messages`, {
      params: {groupId: "default", topic: "invoice"}})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};