import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
const port = 3000;

let server: Server;

async function main() {

    try {
        await mongoose.connect('mongodb+srv://nirobaurnab:wf66DRH1NywQbBMH@cluster0.sgokpvd.mongodb.net/newbooks?retryWrites=true&w=majority&appName=Cluster0');
        console.log("DB connected");
        server = app.listen(port, () => {
            console.log(`server listening from ${port}`);
        })
    } catch (error) {
        console.log("Error:", error);
    }

}

main();