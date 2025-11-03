require("dotenv").config();

const appEnv = process.env.APP_ENV || "uat";
const isProd = appEnv === "production";

const config = {
  app: {
    env: appEnv,
    port: Number(process.env.APP_PORT || 8080),
  },
  db: {
    url: process.env.DATABASE_URL || undefined,
    host: process.env.DB_HOST || "ep-shiny-rain-a1vyox6r-pooler.ap-southeast-1.aws.neon.tech",
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "loykrathong",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: Number(process.env.DB_POOL_MAX || (isProd ? 10 : 5)),
      min: Number(process.env.DB_POOL_MIN || 0),
      acquire: Number(process.env.DB_POOL_ACQUIRE || 30000),
      idle: Number(process.env.DB_POOL_IDLE || 10000),
    },
  },
};

module.exports = config;
