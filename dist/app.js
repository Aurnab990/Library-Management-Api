"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", book_controller_1.booksRoute);
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error
        });
    }
});
app.get('/', (req, res) => {
    res.send("Server is running");
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = app;
