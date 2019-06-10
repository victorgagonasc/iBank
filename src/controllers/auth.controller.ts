
import { Request, Response } from 'express';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class AuthController {

    static signIn = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) return res.status(403).json({ message: 'Authentication failed. User not found' });

            if (!User.comparePassword(req.body.password, user.password)) return res.status(403).json({ message: 'Authentication failed. Wrong password' });

            return res.status(200).json({ data: user, token: jwt.sign({ id: user._id }, process.env.JWT_SECRET) });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static signOut = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ data: null, token: null });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}