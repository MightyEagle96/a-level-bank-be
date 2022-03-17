import express from 'express';
import router from './router.js';

const app = express();

app.use(router);

app.listen(2207, () => {
  console.log('App is listening');
});
