const moment = require('moment');

module.exports = (app) => {
  const getTasks = (req, res) => {
    // verificando se tem uma data passando pela query, se nao, adicionar a data e o horário do fim do dia
    const date = req.query.date
      ? req.query.date
      : moment().endOf('day').toDate();

    app
      .db('tasks')
      //pegando o usuário na requisição a partir do passport
      .where({ userId: req.user.id })
      //verificando se a data estimada é menor que a data passada na query
      .where('estimateAt', '<=', date)
      //ordenando pela data estimada
      .orderBy('estimateAt')
      //passando todas as tasks e convertendo para json e voltando como resposta
      .then((tasks) => res.json(tasks))
      .catch((err) => res.status(500).json(err));
  };

  const save = (req, res) => {
    if (!req.body.desc.trim()) {
      return res.status(400).send('Descrição é um campo obrigatório!');
    }

    req.body.userId = req.user.id;

    app
      .db('tasks')
      .insert(req.body)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).json(err));
  };

  const remove = (req, res) => {
    app
      .db('tasks')
      //verificando se a task pertence ao usuário logado
      .where({ id: req.params.id, userId: req.user.id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(204).send('Task deletada com sucesso!');
        } else {
          const msg = `Não foi encontrada task com id ${req.params.id}.`;
          res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(400).json(err));
  };

  return { getTasks, save, remove };
};
