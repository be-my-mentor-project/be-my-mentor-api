import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

import db from './db';
import createAdmin from './utils/createAdmin';
import apiV1 from './api/v1';

import configurePassport from './api/v1/passport';

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
configurePassport();

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
