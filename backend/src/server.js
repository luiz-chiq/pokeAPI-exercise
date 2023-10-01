const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(cookieParser());
app.use(session({
  secret: 'fa61#%sc&w2q@#o3s*%ugbBd3I#G',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello Worlad!');
});


app.listen(3004, () => {
  console.log(`Servidor rodando na porta 3004`);
});