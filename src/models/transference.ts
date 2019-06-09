import { Document, Schema, model } from 'mongoose';

export interface ITransference extends Document {
    from: String,
    to: String,
    value: Number,
    date: Date
}

const TransferenceSchema = new Schema({
    from: {
        type: String,
        trim: true,
        required: true
    },
    to: {
        type: String,
        trim: true,
        required: true
    },
    value: {
        type: Number,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model<ITransference>('Transference', TransferenceSchema);