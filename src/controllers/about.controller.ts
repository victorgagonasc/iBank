
import { Request, Response } from 'express';
import About from '../interfaces/about.interface';

export default class AboutController {

    static getInfo = (req: Request, res: Response) => {
        const info: About = require('../../package.json');

        res.status(200).json({ name: info.name, description: info.description, version: info.description});
    }
}