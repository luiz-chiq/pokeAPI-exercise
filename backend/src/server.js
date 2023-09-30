const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Worlad!');
});


app.listen(3004, () => {
  console.log(`Servidor rodando na porta 3004`);
});