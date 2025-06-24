import mongoose, { model } from "mongoose";
import { Book } from "./book.model";
import IBorrow from "../interfaces/borrow.interface";

const borrowSchema = new mongoose.Schema<IBorrow>({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {timestamps: true});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);