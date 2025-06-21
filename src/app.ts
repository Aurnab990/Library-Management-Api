import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controllers/book.controller";
const app: Application = express();

app.use(express.json());

app.use("/api", booksRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("Server is running");
});

export default app;