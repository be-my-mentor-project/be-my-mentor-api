import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import db from './db';
import createAdmin from './utils/createAdmin';
import apiV1 from './api/v1';

import configurePassport from './api/v1/passport';

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

configurePassport(app);

app.use('/api/v1', apiV1);

(async () => {
  await db.sync();
  // Seed default admin user
  // TODO: move it to seeders
  await createAdmin();

  createServer(app)
    .listen(port, () =>
      console.log(`Server listen on port ${port}`)
    );
})();
