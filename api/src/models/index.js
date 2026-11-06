import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Categorie = sequelize.define('Categorie', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(50), allowNull: false, unique: true },
}, { tableName: 'categorie' });

export const Specialite = sequelize.define('Specialite', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  id_categorie: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { tableName: 'specialite' });

export const Artisan = sequelize.define('Artisan', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(100), allowNull: false },
  note: { type: DataTypes.DECIMAL(2, 1), allowNull: false },
  ville: { type: DataTypes.STRING(100), allowNull: false },
  a_propos: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  site_web: { type: DataTypes.STRING(255), allowNull: true },
  image: { type: DataTypes.STRING(255), allowNull: true },
  top: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  id_specialite: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { tableName: 'artisan' });

Categorie.hasMany(Specialite, { foreignKey: 'id_categorie', as: 'specialites' });
Specialite.belongsTo(Categorie, { foreignKey: 'id_categorie', as: 'categorie' });
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite', as: 'artisans' });
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite', as: 'specialite' });

export { sequelize };
