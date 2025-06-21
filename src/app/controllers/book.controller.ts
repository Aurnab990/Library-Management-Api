import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRoute = express.Router();

// GET ALL THE DATA
booksRoute.get("/books", async(req: Request, res: Response) => {
    const books = await Book.find();
    res.status(201).json({
        "success": true,
        "message": "Books retrieved successfully",
        "data": books
    });
});

// POST DATA
booksRoute.post("/books", async (req: Request, res: Response) => {
    const body = req.body;
    const books = await Book.create(body);
    res.status(201).json({
        "success": true,
        "message": "Book created successfully",
        "data": books
    });
});

// GET A SIGNLE DATA BY ID
booksRoute.get("/books/:bookId", async(req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(201).json({
        "success": true,
        "message": "Book retrieved successfully",
        "data": book
    });

});

// UPDATE A SINGLE DATA
booksRoute.patch("/books/:bookId", async(req:Request, res: Response) => {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true});

    res.status(201).json({
        "success": true,
        "message": "Book updated successfully",
        "data": book
    });
});

// DELETE DATA
booksRoute.delete("/books/:bookId", async(req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId, { new : true});

    res.status(201).json({
        "success": true,
        "message": "Book deleted successfully",
        "data": null
    });
});
