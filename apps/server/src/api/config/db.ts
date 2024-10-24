import mongoose from "mongoose";
import { env } from "../../infrastructure/env";
import { Sequelize } from "sequelize";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase connection
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID, 
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// MongoDB connection using mongoose
export const dbconnection = (): void => {
  const options = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 20000, 
  };
  mongoose
    .connect(env.MONGO_URL!, options)
    .then((res) => {
      console.log(`Mongo DB Connected Successfully. ` + env.MONGO_URL);
    })
    .catch((err) => {
      console.error(`Something went wrong in Mongo DB Connection`, err);
    });

  mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });

  const db = mongoose.connection;
};

// MySQL (AivenCloud) connection using Sequelize
const retry = {
  max: Infinity,
  report: (msg: string | Record<string, unknown>) => {
    console.log("Unable to connect to database; retrying.");
    console.log(msg);
  },
  match: [
    /ConnectionError/,
    /SequelizeConnectionError/,
    /SequelizeConnectionRefusedError/,
    /SequelizeHostNotFoundError/,
    /SequelizeHostNotReachableError/,
    /SequelizeInvalidConnectionError/,
    /SequelizeConnectionTimedOutError/,
    /SequelizeConnectionAcquireTimeoutError/,
    /Connection terminated unexpectedly/,
  ],
};

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false, 
  },
};

const db = env.DB_NAME != undefined ? env.DB_NAME : "";
const username = env.DB_USER != undefined ? env.DB_USER : "";
const password = env.DB_PASS != undefined ? env.DB_PASS : "";

export const sequelize: Sequelize = new Sequelize(db, username, password, {
  host: env.DB_HOST,
  port: env.DB_PORT ,
  dialect: 'mysql',
  retry,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  logging: (msg) => console.log(msg),
  dialectOptions,
});

export { storage };
