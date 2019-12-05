"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
exports.app = app;
const http_1 = require("http");
const path_1 = require("path");
const http = http_1.createServer(app);
exports.http = http;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.join(__dirname, "./public/")));
app.get("/", (req, res) => {
    res.sendFile(path_1.join(__dirname, "./views/index.html"));
});
app.put("/api/saves", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});
http.listen(3000, () => {
    console.log("Site hosted on *:3000");
});
