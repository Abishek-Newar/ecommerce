import dotenv from "dotenv";

dotenv.config();
type envType = {
  MONGO_URL: string,
  JWT_SECRET: string,
  APPPORT: number ,
  DB_HOST: string,
  DB_PORT: number,
  DB_NAME: string,
  DB_USER: string,
  DB_PASS: string,
  MAILER_EMAIL: any,
  MAILER_PASS: any,
  ADMIN_EMAIL: any,
  ADMIN_PASS: any,
  FIREBASE_API_KEY: any,
  FIREBASE_AUTH_DOMAIN: any,
  FIREBASE_PROJECT_ID: any,
  FIREBASE_STORAGE_BUCKET: any,
  FIREBASE_MESSAGING_SENDER_ID: any,
  FIREBASE_APP_ID: any,
  FIREBASE_MEASUREMENT_ID: any
}

export const env:envType = {
  MONGO_URL: process.env.MONGO_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  APPPORT: parseInt(process.env.PORT || ""),
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: parseInt(process.env.DB_PORT || ""),
  DB_NAME: process.env.DB_NAME || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASS: process.env.DB_PASS || "",
  MAILER_EMAIL: process.env.MAILER_EMAIL || "",
  MAILER_PASS: process.env.MAILER_PASS || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
  ADMIN_PASS: process.env.ADMIN_PASS || "",
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "",
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || "",
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || "",
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || "",
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID || "",

};
