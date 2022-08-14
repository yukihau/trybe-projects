const port = process.env.PORT || 3001;
const App = require('./app');

const app = new App();

app.start(port);

console.log(`Api rodando na porta ${port}`);
