import express, { Application } from 'express';
import sequelize from './sequelize';
import routes from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true });

app.use('/', routes);

app.listen(8000, () => {
  console.log('start');
})