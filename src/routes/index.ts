import { Router, Request, Response } from 'express';
import about from './about';

const routes = Router();

routes.use('/', about);

export default routes;