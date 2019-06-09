import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT = 10;

export interface IUser extends Document {
    firstName: String;
    lastName: String;
    birthDate: Date;
    identification: String;
    email: String;
    password: String;
    balance: Number;
    createdDate: Date;
}

interface UserModelInterface extends Model<IUser> {
    comparePassword(password: string, correctPassword: String): boolean;
}

const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    birthDate: {
        type: Date,
        trim: true,
        required: true
    },
    identification: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    balance: {
        type: Number,
        trim: true,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    var user: any = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.comparePassword = function (candidatePassword, correctPassword) {
    return bcrypt.compareSync(candidatePassword, correctPassword);
};

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

export default model<IUser, UserModelInterface>('User', UserSchema);