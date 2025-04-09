import express, { Request, Response } from 'express';
import 'dotenv/config';
import user from './router/user.router';
import login from './router/login.router';
import nail from './router/nail.router';
import cors from 'cors';
import path from 'path';

const app = express();

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(cors());

//Routes
app.use('/user', user);
app.use('/auth', login);
app.use('/nail', nail);
app.use('/public', express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// console.log(Object.keys(User));
// console.log(User.rawAttributes.name.allowNull);
// console.log(User.);

export default app;