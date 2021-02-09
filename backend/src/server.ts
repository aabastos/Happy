import express from 'express';
import 'express-async-errors';

import path from 'path';
import cors from 'cors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errorHandler)

app.listen(process.env.PORT || 3333);