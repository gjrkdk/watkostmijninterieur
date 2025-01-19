import express from "express";
import { greetingController } from "../controllers/greetingController";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Greeting endpoint
app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  const response = greetingController.handleGreeting(name);
  res.json(response);
});

// Default greeting
app.get("/hello", (req, res) => {
  const response = greetingController.handleGreeting("World");
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Try: http://localhost:${port}/hello/John`);
});
