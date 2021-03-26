const express = require('express');
const path = require('path');
const app = express();
const connection = require('./database/connection');
const consign = require('consign');

app.connection = connection;
consign({ cwd: path.join('./src') })
  .then('./config')
  .then('./Controllers')
  .then('./routes')
  .into(app);

app.listen(3000, () => console.log('Backend Executando'));
