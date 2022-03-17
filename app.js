import express from 'express';
import dotenv from 'dotenv';
import router from './router.js';

dotenv.config();

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.json({ limit: '50mb' }));

app.use(router);

app.listen(2207, () => {
  console.log('App is listening');
});
