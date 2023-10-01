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
      
        res.status(200).json(newUser);
});

routes.post('/login', (req, res) => {
    const{email, password} = req.body
    const user = users.find(user=>user.email === email && user.password === password)

    if(user){
        req.session.authenticated = true;
        req.session.user = {
            email: user.email
        };
        console.log(email)
        return res.status(200).json(user)
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });

});

routes.get('/perfil', requireAuth, (req, res) => {
    return res.json(req.session.user);
});

routes.get('/getUsers', (req, res) => {
    return res.status(200).json(users)
});

routes.post('/addPokemon', requireAuth, (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    const user = users.find(user => user.email === req.session.user.email);
    
    const novoPokemon = req.body.pokemon;
    novoPokemon.id = user.pokemons.length + 1;
    
    user.pokemons.push(novoPokemon);

    return res.status(200).json({ message: 'Pokémon adicionado com sucesso'});
});

routes.get('/getUserPokemons', requireAuth, (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    const user = users.find(user => user.email === req.session.user.email);

    res.status(200).json(user.pokemons)
});

module.exports = routes;    