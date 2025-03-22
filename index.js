const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Porta do servidor

// Rota para pegar os dados da API externa e remover o campo "mad6453"
app.get('/api/data', async (req, res) => {
  try {
    // URL da API externa
    const apiUrl = 'https://madkung.vercel.app/rekonise-api';

    // Sua chave de API
    const apiKey = 'XqzyaenZishd33axPYPz'; 

    // URL que você quer consultar via parâmetro (ou pode ser passado diretamente na query)
    const url = req.query.url; 

    if (!url) {
      return res.status(400).json({ error: 'A URL é necessária para consulta.' });
    }

    // Construa a URL da requisição incluindo a chave de API e o parâmetro URL
    const response = await axios.get(`${apiUrl}?url=${encodeURIComponent(url)}&api_key=${apiKey}`);

    // Cria uma cópia dos dados da resposta
    const modifiedData = { ...response.data };

    // Remove o campo "mad6453" se existir
    delete modifiedData.mad6453;

    // Retorna a resposta modificada
    res.json(modifiedData);

  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro
    console.error(error);
    res.status(500).json({ error: 'Erro ao acessar a API externa' });
  }
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
