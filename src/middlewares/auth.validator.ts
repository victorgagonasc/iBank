import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) return res.status(401).send({ message: 'No token provided' });

        await jwt.verify(token.toString(), process.env.JWT_SECRET);

        next();

    } catch (error) {
        return res.status(500).send(error);
    }
}

export default verifyJWT;