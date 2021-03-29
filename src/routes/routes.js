// cadastrando as rotas
module.exports = (app) => {
  app.post('/signup', app.Controllers.UserController.save);
  app.post('/signin', app.Controllers.SessionController.signin);

  app
    .route('/tasks')
    .all(app.middleware.passport.authenticate())
    .get(app.Controllers.TaskController.getTasks)
    .post(app.Controllers.TaskController.save);

  app
    .route('/tasks/:id')
    .all(app.middleware.passport.authenticate())
    .delete(app.Controllers.TaskController.remove);

  app
    .route('/tasks/:id/toggle')
    .all(app.middleware.passport.authenticate())
    .put(app.Controllers.TaskController.toggleTask);
};
