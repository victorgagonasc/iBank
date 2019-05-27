
import { Request, Response } from 'express';

export default class AboutController {

    static getInfo = (req: Request, res: Response) => {
        const { name, description, version } = require('../../package.json');

        return res.status(200).json({ name, description, version });
    }
}