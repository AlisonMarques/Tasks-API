const express = require('express');
const path = require('path');
const app = express();
const connection = require('./database/connection');
const consign = require('consign');

app.db = connection;
consign({ cwd: path.join('./src') })
  .include('./middleware/passport.js')
  .then('./config')
  .then('./Controllers')
  .then('./routes')
  .into(app);

app.listen(3000, () => console.log('Backend Executando'));
