
import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class UserController {

    static getAll = async (req: Request, res: Response) => {
        try {
            let users: IUser[] = await User.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static getById = async (req: Request, res: Response) => {
        try {
            const user: IUser = await User.findById(res.locals.userId);

            if (!user) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static add = async (req: Request, res: Response) => {
        try {
            const hasUser = await User.findOne({$or: [
                {email: req.body.email},
                {identification: req.body.identification}
            ]});

            if (hasUser) { return res.status(403).json({ message: 'A user already exists with this email / Identification' }); }

            const user: IUser = new User(req.body);

            const result = await user.save();

            return res.status(200).json({ data: result, token: jwt.sign({ id: result._id }, process.env.JWT_SECRET) });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}