import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import cookieParser from "cookie-parser";
import "./config/config.js";

const PORT = process.env.PORT || 3000;

const app = express();
const upload = multer();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Register and Login Routes
app.get("/register");
app.get("login");
app.get("logout");

//Order Routes

//Product Routes

//

app.listen(PORT, () => console.log("Server running on port", PORT));
