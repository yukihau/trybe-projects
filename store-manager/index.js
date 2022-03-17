require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');

// Rotas
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// Extras
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
