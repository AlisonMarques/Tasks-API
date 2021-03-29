const { authSecret } = require('../../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  const signin = async (req, res) => {
    // verificando se o email ou senha existem
    if (!req.body.email || !req.body.password) {
      return res.status(400).send('Dados incompletos');
    }

    // obtendo o usuário no banco de dados
    const user = await app.db('users').where({ email: req.body.email }).first();

    // validando as senhas
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).send('Email ou senha inválido!');
        }

        const payload = { id: user.id };

        // gerando o token para fazer o login
        res.json({
          name: user.name,
          email: user.email,
          token: jwt.encode(payload, authSecret),
        });
      });
    } else {
      res.status(400).send('Usuário não cadastrado!');
    }
  };

  return { signin };
};
