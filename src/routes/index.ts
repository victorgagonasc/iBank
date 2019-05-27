import { Router, Request, Response } from 'express';
import about from './about';
import user from './user';
import auth from './auth';

const routes = Router();

routes.use('/', about);
routes.use('/users', user);
routes.use('/auth', auth);

export default routes;