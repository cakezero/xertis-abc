import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const DB_URI = process.env.DB_URI;

export const ENVIRONMENT = process.env.NODE_ENV || "development";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const EMAIL_SERVICE = process.env.EMAIL_SERVICE || "gmail";

export const EMAIL_USER = process.env.EMAIL_USER || "tondotfun@gmail.com";

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "demoaccount";

export const PINATA_SECRET = process.env.PINATA_SECRET;

export const PINATA_API_KEY = process.env.PINATA_API_KEY;