import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const booksSchema = new Schema<IBook>({
    title: { type: String, required: true, trim: true},
    author: { type: String, required: true, trim: true},
    genre: {
        type: String,
        required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: { type: String, required: true, trim: true},
    description: { type: String, default: ''},
    copies: { type: Number, required: true},
    available: { type: Boolean, default: true}
}, {timestamps: true});

export const Book = model("Book", booksSchema);