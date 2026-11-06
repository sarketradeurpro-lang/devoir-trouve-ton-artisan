import { Sequelize } from 'sequelize';

const required = ['DB_HOST', 'DB_NAME', 'DB_USER'];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Configuration manquante : ${key}`);
}

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD ?? '',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
    define: { freezeTableName: true, timestamps: false },
    pool: { max: 5, min: 0, acquire: 10000, idle: 10000 },
  },
);
