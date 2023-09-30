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

routes.post('/login', (req, res) => {
    const{email, password} = req.body
    const user = users.find(user=>user.email === email && user.password === password)
    console.log(req)
    console.log(req.body)

    if(user){
        req.session.authenticated = true;
        req.session.user = {
            email: user.email
          };
        return res.status(200).json(user)
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });

});

routes.get('/perfil', requireAuth, (req, res) => {
    res.json(req.session.user);
  });

routes.get('/getUsers', (req, res) => {
    return res.status(200).json(users)
});


module.exports = routes;