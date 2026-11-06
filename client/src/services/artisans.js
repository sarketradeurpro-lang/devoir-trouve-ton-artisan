const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

async function request(path, { signal, ...options } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { signal, ...options });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error("L'API est momentanément inaccessible.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'Une erreur est survenue.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export function getCategories(options) {
  return request('/categories', options);
}

export function getArtisans({ categorie = '', query = '', signal } = {}) {
  const params = new URLSearchParams();
  if (categorie) params.set('categorie', categorie);
  if (query.trim()) params.set('q', query.trim());
  const suffix = params.size ? `?${params}` : '';
  return request(`/artisans${suffix}`, { signal });
}

export function getArtisan(id, options) {
  return request(`/artisans/${encodeURIComponent(id)}`, options);
}

export function getFeaturedArtisans(options) {
  return request('/artisans/top', options);
}

export function sendContact(id, payload, options) {
  return request(`/artisans/${encodeURIComponent(id)}/contact`, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
