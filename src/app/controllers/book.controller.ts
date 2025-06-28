import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const booksRoute = express.Router();

// GET ALL THE DATA
booksRoute.get("/books", async (req: Request, res: Response) => {
    try {
       const { filter, sortBy = "createdAt", sort = "desc", limit } = req.query;

        const query: any = {};

        if (filter) {
            query.genre = filter.toString(); 
        }
        const sortOptions: any = {};
        sortOptions[sortBy.toString()] = sort.toString() === "asc" ? 1 : -1;

        let booksQuery = Book.find(query).sort(sortOptions);

        if (limit) {
            booksQuery = booksQuery.limit(parseInt(limit.toString(),10));
        }

        const books = await booksQuery;

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        })
    }
});

// POST DATA
booksRoute.post("/books", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        // console.log(body);
        const books = await Book.create(body);
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            "data": books
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

// GET A SIGNLE DATA BY ID
booksRoute.get("/books/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        res.status(201).json({
            "success": true,
            "message": "Book retrieved successfully",
            "data": book
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }

});

// UPDATE A SINGLE DATA
booksRoute.put("/books/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

        res.status(200).json({
            "success": true,
            "message": "Book updated successfully",
            "data": book
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

// DELETE DATA
booksRoute.delete("/books/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndDelete(bookId, { new: true });

        res.status(201).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

// BORROW BOOK METHOD
booksRoute.post("/borrow", async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // console.log(body)

        const book = await Book.findById(bookId);
        await book?.totalCopies(quantity);

        const borrowRecord = await Borrow.create({
            book: book?._id,
            quantity,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
});

booksRoute.get("/borrow", async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { 
                $unwind: "$book" 
            },
            
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: '$book.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to borrow"

        })
    }
});
