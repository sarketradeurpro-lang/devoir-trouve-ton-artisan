import { Op } from 'sequelize';
import nodemailer from 'nodemailer';
import { Artisan, Categorie, Specialite } from '../models/index.js';
import { HttpError } from '../middleware/errors.js';

const artisanIncludes = [
  { model: Specialite, as: 'specialite', attributes: ['id', 'nom', 'id_categorie'],
    include: [{ model: Categorie, as: 'categorie', attributes: ['id', 'nom'] }] },
];

function publicArtisan(row) {
  const artisan = row.toJSON();
  const specialite = artisan.specialite;
  const categorie = specialite?.categorie;
  return {
    id: artisan.id,
    nom: artisan.nom,
    note: Number(artisan.note),
    ville: artisan.ville,
    aPropos: artisan.a_propos,
    siteWeb: artisan.site_web,
    image: artisan.image,
    top: Boolean(artisan.top),
    specialite: specialite?.nom ?? null,
    categorie: categorie?.nom ?? null,
    categorieId: categorie?.id ?? null,
  };
}

function positiveId(value) {
  if (!/^\d+$/.test(String(value)) || Number(value) < 1) throw new HttpError(400, 'Identifiant invalide.');
  return Number(value);
}

export async function getCategories(_req, res) {
  const rows = await Categorie.findAll({
    attributes: ['id', 'nom'], order: [['nom', 'ASC']],
    include: [{ model: Specialite, as: 'specialites', attributes: ['id', 'nom'], required: false }],
  });
  res.json(rows);
}

export async function getArtisans(req, res) {
  const where = {};
  const { categorie, q } = req.query;
  if (categorie !== undefined && categorie !== '') {
    if (/^\d+$/.test(String(categorie))) {
      where['$specialite.id_categorie$'] = positiveId(categorie);
    } else if (typeof categorie === 'string' && categorie.trim().length <= 50) {
      where['$specialite.categorie.nom$'] = categorie.trim();
    } else throw new HttpError(400, 'La catégorie doit être un identifiant ou un nom valide.');
  }
  if (q !== undefined) {
    if (typeof q !== 'string' || q.trim().length > 100) throw new HttpError(400, 'La recherche doit contenir au maximum 100 caractères.');
    if (q.trim()) where.nom = { [Op.like]: `%${q.trim()}%` };
  }
  const rows = await Artisan.findAll({ where, include: artisanIncludes, order: [['nom', 'ASC']] });
  res.json(rows.map(publicArtisan));
}

export async function getTopArtisans(_req, res) {
  const rows = await Artisan.findAll({ where: { top: true }, include: artisanIncludes, order: [['nom', 'ASC']] });
  res.json(rows.map(publicArtisan));
}

export async function getArtisan(req, res) {
  const row = await Artisan.findByPk(positiveId(req.params.id), { include: artisanIncludes });
  if (!row) throw new HttpError(404, 'Artisan introuvable.');
  res.json(publicArtisan(row));
}

function isEmail(value) {
  return typeof value === 'string' && value.length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function postContact(req, res) {
  const id = positiveId(req.params.id);
  const { nom, email, objet, message } = req.body ?? {};
  if (typeof nom !== 'string' || !nom.trim() || nom.trim().length > 100
      || !isEmail(email)
      || typeof objet !== 'string' || !objet.trim() || objet.trim().length > 150
      || typeof message !== 'string' || !message.trim() || message.trim().length > 3000) {
    throw new HttpError(400, 'Vérifiez les champs : nom (100 caractères), e-mail valide, objet (150 caractères) et message (3 000 caractères).');
  }

  const artisan = await Artisan.findByPk(id, { attributes: ['id', 'nom'] });
  if (!artisan) throw new HttpError(404, 'Artisan introuvable.');

  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, CONTACT_TEST_RECIPIENT } = process.env;
  const deliveryMode = process.env.CONTACT_MAIL_MODE || 'test';
  const recipient = deliveryMode === 'artisan' ? artisan.email : CONTACT_TEST_RECIPIENT;
  if (!['test', 'artisan'].includes(deliveryMode)
      || !SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !isEmail(recipient)) {
    throw new HttpError(503, 'Le service de contact est momentanément indisponible.');
  }
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST, port, secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
  await transporter.sendMail({
    from: process.env.CONTACT_FROM || SMTP_USER,
    to: recipient,
    replyTo: email.trim(),
    subject: `[Demande de test] ${objet.trim()} — ${artisan.nom}`,
    text: `Artisan : ${artisan.nom} (ID ${artisan.id})\nNom : ${nom.trim()}\nE-mail : ${email.trim()}\n\n${message.trim()}`,
  });
  res.status(202).json({ message: 'Votre demande a été transmise.' });
}
