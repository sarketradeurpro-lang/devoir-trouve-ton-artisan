import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './routes/apiRoutes.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json({ limit: '10kb' }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-8', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
  const clientDist = fileURLToPath(new URL('../../client/dist/', import.meta.url));
  app.use(express.static(clientDist));
  app.get(/.*/, (req, res, next) => {
    if (req.path === '/api' || req.path.startsWith('/api/') || !req.headers.accept?.includes('text/html')) {
      return next();
    }

    res.sendFile(path.join(clientDist, 'index.html'), (error) => {
      if (error) next(error);
    });
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
