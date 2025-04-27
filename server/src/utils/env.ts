import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4600;

export const DB_URL = process.env.DB_URL!;

export const ENVIRONMENT = process.env.ENVIRONMENT || "development";

export const EMAIL_SERVICE = process.env.EMAIL_SERVICE || "gmail";

export const EMAIL_USER = process.env.EMAIL_USER!;

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;
