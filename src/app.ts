import express, { Application, NextFunction, Request, Response } from "express";
import { booksRoute } from "./app/controllers/book.controller";
const app: Application = express();

app.use(express.json());

app.use("/api", booksRoute);



app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(error){
        res.status(400).json({
            message: error.message ||"Something went wrong",
            success: false,
            error: error
        })
    }
})
app.get('/', (req: Request, res: Response) => {
    res.send("Server is running");
});
app.use((req, res, next) => {
    res.status(404).json({message: "Route not found"})
});

export default app;