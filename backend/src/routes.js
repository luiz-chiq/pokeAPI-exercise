const express = require('express');

const routes = express.Router();

const requireAuth = require('./middleware/requireAuth');

const users = [];

routes.post('/signup', (req, res) => {
        const newUser = req.body;
      
        if (!newUser || !newUser.name || !newUser.email || !newUser.password) {
          return res.status(400).json({ error: 'Dados do usuário inválidos' });
        }
        newUser.id = users.length + 1;
        newUser.pokemons = [];
        users.push(newUser);
      
        res.status(201).json(newUser);
});



module.exports = routes;