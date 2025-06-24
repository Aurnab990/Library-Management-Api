import { Document, Types } from "mongoose";

export default interface IBorrow{
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}