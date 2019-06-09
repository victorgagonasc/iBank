import { Router, Request, Response } from 'express';
import about from './about';
import user from './user';
import auth from './auth';
import account from './account';

const routes = Router();

routes.use('/', about);
routes.use('/users', user);
routes.use('/auth', auth);
routes.use('/account', account);

export default routes;