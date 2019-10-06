import express from 'express';
import { createServer } from 'http';
import { json } from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import db from './db';
import createAdmin from './utils/createAdmin';
import apiV1 from './api/v1';

const port = process.env.PORT || 9000;
const app = express();

app.use(json());

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/v1', apiV1);

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/secret', function(req, res) {
  res.send('The password is potato');
});

(async () => {
  await db.sync();
  await createAdmin();

  createServer(app)
    .listen(port, () => console.log(`Server listen on port ${port}`));
})();
