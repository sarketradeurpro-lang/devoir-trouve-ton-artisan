export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function notFound(_req, _res, next) {
  next(new HttpError(404, 'Ressource introuvable.'));
}

export function errorHandler(error, _req, res, _next) {
  if (res.headersSent) return;
  const knownError = error instanceof HttpError;
  const status = knownError ? error.status : 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error: knownError && status !== 500 ? error.message : 'Une erreur interne est survenue.',
  });
}
