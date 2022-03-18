/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import router from './router.js';

import morgan from 'morgan';
import { ConnectDatabase } from './database.js';

ConnectDatabase();
dotenv.config();

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.json({ limit: '50mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(router);

const PORT = process.env.PORT || 2207;

app.listen(PORT, () => {
  console.log('App is listening');
});
