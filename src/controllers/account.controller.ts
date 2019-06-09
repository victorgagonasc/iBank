
import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import 'dotenv/config';
import Transference, { ITransference } from '../models/transference';

export default class UserController {

    static getStatement = async (req: Request, res: Response) => {
        try {
            const user: IUser = await User.findById(res.locals.userId);

            let statement: ITransference[] = await Transference.find().sort({ date: 1 });

            statement = statement.filter((transference: ITransference) => transference.from || transference.to === `${user.firstName} ${user.lastName}`);

            return res.status(200).json(statement);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static newTransfer = async (req: Request, res: Response) => {
        try {
            const user: IUser = await User.findById(res.locals.userId);

            if (user.balance < req.body.value) {
                return res.status(422).json({ message: 'Invalid value' });
            }

            const recipient: IUser = await User.findOne({ identification: req.body.destination });

            const transference: ITransference = new Transference({
                from: `${user.firstName} ${user.lastName}`,
                to: `${recipient.firstName} ${recipient.lastName}`,
                value: req.body.value
            });

            const result = await transference.save();

            user.balance = parseFloat((+user.balance - req.body.value).toFixed(2));
            await user.save();

            recipient.balance = parseFloat((+recipient.balance + req.body.value).toFixed(2));
            await recipient.save();

            return res.status(200).json({ data: result });
        } catch (error) {
            console.log(error.toString());
            return res.status(500).json(error);
        }
    }
}