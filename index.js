const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/api/data', async (req, res) => {
  try {
    const apiUrl = 'https://madkung.vercel.app/rekonise-api';
    const apiKey = 'XqzyaenZishd33axPYPz';
    const response = await axios.get(`${apiUrl}?url=&api_key=${apiKey}`);

    const modifiedData = { ...response.data };
    delete modifiedData.mad6453;

    res.json(modifiedData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar a API externa' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
