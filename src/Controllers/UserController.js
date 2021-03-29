const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  //Gerando o hash da senha e verificando se bate
  const obterHash = (password, callback) => {
    //gerando o hash do usuário
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
  };

  // Salvando usuário no banco de dados
  const save = (req, res) => {
    obterHash(req.body.password, (hash) => {
      const password = hash;
      app
        .db('users')
        .insert({ name: req.body.name, email: req.body.email, password })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).json(err));
    });
  };
  // retornando a função de salvar
  return { save };
};
