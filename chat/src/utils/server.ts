import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
export const server = http.createServer(app);
export const io = new Server(server);