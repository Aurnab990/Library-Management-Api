import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";
import { error } from "console";
import { totalCopies } from "../instances/book.instance";

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
    copies: { 
        type: Number, 
        required: true,
        min: [0, "Copies must be a positive number"]
    },
    available: { type: Boolean, default: true}
}, {timestamps: true});

booksSchema.methods.totalCopies = async function(this: IBook, quantity: number): Promise<void>{
    if(this.copies < quantity){
        throw new Error("Not enough books right now");
    }
    this.copies -= quantity;

    if(this.copies === 0){
        this.available = false;
    }
    await this.save();

}
booksSchema.methods.isAvailable = function (): boolean {
  return this.available;
};


export const Book = model<IBook>("Book", booksSchema);
