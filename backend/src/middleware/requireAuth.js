function requireAuth(req, res, next) {
    // Verifique se o objeto req.session existe
    if (req.session) {
      if (req.session.authenticated) {
        next();
      } else {
        res.status(401).send('Acesso não autorizado');
      }
    } else {
      res.status(500).send('Erro interno do servidor');
    }
  }
  
  module.exports = requireAuth;
  