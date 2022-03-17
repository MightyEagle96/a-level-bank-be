/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import router from './router.js';

dotenv.config();

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.json({ limit: '50mb' }));

app.use(router);

const PORT = process.env.PORT || 2207;

app.listen(PORT, () => {
  console.log('App is listening');
});
