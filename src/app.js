import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/api.routes.js';
const app = express();
app.use(cors(), morgan('dev'));
app.use('/', routes);
export default app;
