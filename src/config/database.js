const { Sequelize } = require("sequelize");
const config = require("./config");

// Singleton Sequelize instance
let sequelize;

const buildSequelizeInstance = () => {
  const baseOptions = {
    dialect: config.db.dialect,
    pool: config.db.pool,
    logging: config.app.env === "dev" ? console.log : false,
    timezone: "+07:00",
    define: { underscored: true },
    dialectModule: require("pg"),
    dialectOptions: config.db.dialectOptions,
  };

  if (config.db.url) {
    return new Sequelize(config.db.url, baseOptions);
  }

  return new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
      ...baseOptions,
      host: config.db.host,
      port: config.db.port,
    }
  );
};

if (!sequelize) {
  sequelize = buildSequelizeInstance();
}

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

module.exports = { sequelize, connectDatabase };
