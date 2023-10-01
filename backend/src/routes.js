const express = require('express');

const routes = express.Router();

// const requireAuth = require('./middleware/requireAuth');

const users = [];

var authUser = undefined

routes.post('/signup', (req, res) => {
        const newUser = req.body;
      
        if (!newUser || !newUser.name || !newUser.email || !newUser.password) {
          return res.status(400).json({ error: 'Dados do usuário inválidos' });
        }
        const user = users.find(user=>user.email === newUser.email)
        if (user) {
            return res.status(409).json({ error: 'Email já cadastrado' });
          }

        newUser.id = users.length + 1;
        newUser.pokemons = [];
        users.push(newUser);
      
        res.status(200).json({ message: `Cadastro de ${newUser.email} feito com sucesso`});
});

routes.post('/login', (req, res) => {
    const{email, password} = req.body
    const user = users.find(user=>user.email === email && user.password === password)

    if(user){
        // req.session.authenticated = true;
        // req.session.cookie.login = user.email
        // console.log(req.session)
        authUser = user.email
        return res.status(200).json({ message: `Login de ${user.email} feito com sucesso`});
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });

});

routes.post('/logout', (req, res) => {
        authUser = undefined
        return res.status(200).json({ message: 'Logout feito com sucesso' })
});


//rota de teste
// routes.get('/perfil', requireAuth, (req, res) => {
routes.get('/perfil', (req, res) => {
    // console.log(req.session.user)
    // return res.status(200).json(req.session.user);
    return res.status(200).json(authUser);
});
//rota de teste
routes.get('/getUsers', (req, res) => {
    // console.log(req.session.authenticated)
    // console.log(req.session.cookie)
    return res.status(200).json(users)
});

// routes.post('/addPokemon', requireAuth, (req, res) => {
routes.post('/addPokemon', (req, res) => {
    // if (!req.session.user) {
    if (!authUser) {
        console.log("nao logado")
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    // const user = users.find(user => user.email === req.session.user.email);
    const user = users.find(user => user.email === authUser);
    const novoPokemon = req.body.pokemon;
    novoPokemon.id = user.pokemons.length + 1;
    
    user.pokemons.push(novoPokemon);

    return res.status(200).json({ message: 'Pokémon adicionado com sucesso'});
});

// routes.get('/getUserPokemons', requireAuth, (req, res) => {
routes.get('/getUserPokemons', (req, res) => {
    // if (!req.session.user) {
    if (!authUser) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    // const user = users.find(user => user.email === req.session.user.email);
    const user = users.find(user => user.email === authUser);

    res.status(200).json(user.pokemons)
});

module.exports = routes;    