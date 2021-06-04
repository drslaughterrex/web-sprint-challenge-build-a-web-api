const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use((err, req, res, next) => {
	res.status(500).json({
		error: err.message,
		message: "Something happened with the server",
	});
});

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use("/api", (_, res) => {
	res.json({ data: "API is accounted for" });
});

server.use("/", (req, res) => {
	res.send(`<h2>Welcome to our API!</h2>`);
});

module.exports = server;
