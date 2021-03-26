// cadastrando as rotas
module.exports = (app) => {
  app.post('/signup', app.Controllers.ControllersUsers.save);
};
