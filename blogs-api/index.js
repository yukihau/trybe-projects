const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const loginRouter = require('./routers/loginRouter');
const categoriesRouter = require('./routers/categoriesRouter');

// Routers
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);

// Extras
app.listen(3000, () => console.log('Ouvindo porta 3000!'));

app.get('/', (request, response) => {
  response.send();
});
