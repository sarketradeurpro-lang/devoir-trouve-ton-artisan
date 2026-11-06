import 'dotenv/config';
import app from './app.js';
import { sequelize } from './models/index.js';

const port = Number(process.env.PORT || 3000);

try {
  await sequelize.authenticate();
  console.log('Connexion MySQL établie.');
  app.listen(port, '0.0.0.0', () => console.log(`API disponible sur http://localhost:${port}`));
} catch (error) {
  console.error('Impossible de démarrer l’API. Vérifiez le fichier api/.env et la connexion MySQL.');
  if (process.env.NODE_ENV !== 'production') console.error(error.message);
  process.exit(1);
}
