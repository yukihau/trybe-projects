const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers, updateTalkers } = require('./helpers');
const {
  validateEmail,
  validatePassword,
  sendToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRating,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(
  '/talker/search',
  validateToken,
  async (req, res) => {
    const { searchTerm } = req.query;
    const talkers = await getTalkers();

    if (!searchTerm) return res.status(200).json(talkers);
    const filteredTalkers = talkers.filter((person) => person.name.includes(searchTerm));

    if (filteredTalkers.length === 0) return res.status(200).send([]);
    res.status(200).json(filteredTalkers);
  },
);

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  if (talkers.length === 0) return res.status(200).send([]);
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const requestedTalker = await talkers.find((person) => person.id === Number(id));

  if (!requestedTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  res.status(200).json(requestedTalker);
});

app.post('/login', validateEmail, validatePassword, sendToken);

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRating,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const newTalker = { id: talkers.length + 1, name, age, talk };

    talkers.push(newTalker);
    updateTalkers(talkers);
    res.status(201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRating,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const id = Number(req.params.id);
    const talkers = await getTalkers();
    const updatedTalker = { id, name, age, talk };

    talkers.push(updatedTalker);
    talkers.sort((a, b) => a.id - b.id);

    updateTalkers(talkers);
    res.status(200).json(updatedTalker);
  },
);

app.delete(
  '/talker/:id',
  validateToken,
  async (req, res) => {
    const id = Number(req.params.id);
    const talkers = await getTalkers();
    const filteredTalkers = talkers.filter((person) => person.id !== id);
    updateTalkers(filteredTalkers);
    res.status(204).send();
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
