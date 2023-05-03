import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import cookieParser from "cookie-parser";
import "./config/config.js";
import {
	encryptPassword,
	verifyJWTCookie,
} from "./middleware/authMiddleware.js";
import { login, logout, register } from "./controller/clientController.js";
import { checkMailToken } from "./controller/authController.js";
import { validateSchema } from "./middleware/validationMiddleware.js";
import {
	addOrder,
	getOrders,
	removeOrder,
} from "./controller/ordersController.js";
import {
	addProduct,
	deleteProduct,
	getProducts,
} from "./controller/productsController.js";

const PORT = process.env.PORT || 3000;

const app = express();
const upload = multer();

app.use(morgan("tiny"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Register and Login Routes
app.post("/register", validateSchema, encryptPassword, register);
app.post("/login", encryptPassword, login);
app.post("/auth", checkMailToken);
app.post("/logout", verifyJWTCookie, logout);

//Order Routes
app.get("/orders", getOrders);
app.post("/orders", addOrder);
app.delete("/orders", removeOrder);

//Product Routes
app.get("/products", getProducts);
app.post("/products", addProduct);
app.delete("/products", deleteProduct);

//

app.listen(PORT, () => console.log("Server running on port", PORT));
