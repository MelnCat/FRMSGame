import express from "express";
const app = express();
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const http = createServer(app);
app.use(express.json());
app.use(express.static(join(__dirname, "./public/")));
app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "./views/index.html"));
});
app.put("/api/saves", (req, res) => {
	console.log(req.body);
	res.sendStatus(200);
});
http.listen(8080, () => {
	console.log("Site hosted on *:8080");
});
export { http, app };
