const PORT = 5500;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/login', async (req, res) => {
  let userCompare = {
    id: 1,
    user: 'nico',
    password: 'a',
  };
  let user = {
    user: 'nico',
    password: 'a',
  };

  if (
    userCompare.user === user.user &&
    userCompare.password === user.password
  ) {
    return res.json(user);
  }
});

app.get('/getProduct', async (req, res) => {
  let payload = JSON.parse(req.query.payload);
  console.log(payload);
  return res.json(payload);
});

app.post('/create/', async (req, res) => {
  let product = req.params.product;
  return res.json(product);
});

app.get('/balance/', async (req, res) => {
  let balance = 100;
  return res.json(balance);
});

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});
