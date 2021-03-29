// cadastrando as rotas
module.exports = (app) => {
  app.post('/signup', app.Controllers.UserController.save);
  app.post('/signin', app.Controllers.SessionController.signin);
};
