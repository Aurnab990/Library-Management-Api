import { IBook } from "../interfaces/book.interface";


export async function totalCopies(this: IBook, quantity: number): Promise<void> {
    if(this.copies === 0){
        this.available = false;
    };
    if(this.copies < quantity){
        throw new Error("Not enough books");
    }
    this.copies -= quantity;
    await this.save();
}