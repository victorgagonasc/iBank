import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];

        if (!token) return res.status(401).send({ message: 'No token provided' });

        const decoded: any = await jwt.verify(token.toString(), process.env.JWT_SECRET);

        res.locals.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}

export default verifyJWT;