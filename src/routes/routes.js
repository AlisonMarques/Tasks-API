// cadastrando as rotas
module.exports = (app) => {
  app.post('/signup', app.Controllers.ControllersUsers.save);
  app.post('/signin', app.Controllers.ControllersSessions.signin);
};
