import { server, io } from "./utils/server";
import dotenv from "dotenv";
dotenv.config();

io.on("connection", socket => {
    console.log("User connected:", socket); 
});

server.listen(3001, () => {
    console.log("Server running");
});