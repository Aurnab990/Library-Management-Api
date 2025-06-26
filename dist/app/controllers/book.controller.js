"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.booksRoute = express_1.default.Router();
// GET ALL THE DATA
exports.booksRoute.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter.toString();
        }
        const sortOptions = {};
        sortOptions[sortBy.toString()] = sort.toString() === "asc" ? 1 : -1;
        let booksQuery = book_model_1.Book.find(query).sort(sortOptions);
        if (limit) {
            booksQuery = booksQuery.limit(parseInt(limit.toString(), 10));
        }
        const books = yield booksQuery;
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
// POST DATA
exports.booksRoute.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // console.log(body);
        const books = yield book_model_1.Book.create(body);
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            "data": books
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
// GET A SIGNLE DATA BY ID
exports.booksRoute.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(201).json({
            "success": true,
            "message": "Book retrieved successfully",
            "data": book
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
// UPDATE A SINGLE DATA
exports.booksRoute.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
        res.status(201).json({
            "success": true,
            "message": "Book updated successfully",
            "data": book
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
// DELETE DATA
exports.booksRoute.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId, { new: true });
        res.status(201).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
// BORROW BOOK METHOD
exports.booksRoute.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // console.log(body)
        const book = yield book_model_1.Book.findById(bookId);
        yield (book === null || book === void 0 ? void 0 : book.totalCopies(quantity));
        const borrowRecord = yield borrow_model_1.Borrow.create({
            book: book === null || book === void 0 ? void 0 : book._id,
            quantity,
            dueDate
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
}));
exports.booksRoute.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books", // must match your MongoDB collection name (lowercase plural)
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to borrow"
        });
    }
}));
