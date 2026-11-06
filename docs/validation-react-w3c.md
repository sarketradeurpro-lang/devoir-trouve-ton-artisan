# Vérifier les pages React avec le validateur W3C

React construit une partie du contenu après le chargement. Le fichier `client/index.html` seul ne contient donc pas les pages complètes. Pour vérifier le HTML effectivement affiché, copier le DOM rendu depuis le navigateur et le coller dans le validateur HTML.

## Pour chaque page

1. Lancer l'API et le client comme décrit dans le README. Attendre que les données de la page soient affichées (par exemple les cartes d'artisans sur l'accueil).
2. Ouvrir une page dans Chrome ou Edge, puis ouvrir les outils de développement avec `F12`.
3. Dans l'onglet **Console**, saisir `copy(document.documentElement.outerHTML)` et appuyer sur Entrée. Cette commande intégrée aux DevTools copie le HTML rendu de la page dans le presse-papiers.
4. Ouvrir [validator.w3.org](https://validator.w3.org/), choisir **Validate by Direct Input**, coller le HTML dans le champ et cliquer sur **Check**.
5. Noter les erreurs séparément pour chaque URL. Corriger le code, reconstruire/recharger, puis répéter la vérification.

Faire ce contrôle pour :

- `/` (accueil, après chargement des artisans du mois);
- `/artisans`;
- `/artisans?categorie=Bâtiment`;
- `/artisans?q=Mont%20Blanc`;
- `/artisan/6` (après chargement de la fiche);
- `/mentions-legales`;
- `/donnees-personnelles`;
- `/accessibilite`;
- `/cookies`;
- `/nimporte-quoi` (exemple de chemin inconnu affichant la 404).

Les paramètres de recherche et de catégorie peuvent être saisis dans la barre du navigateur; utiliser l'adresse complète lorsque tu copies le DOM. Si une page affiche « chargement » ou une erreur réseau au lieu de ses données, rétablir l'API avant de conclure au résultat de validation.

## Vérifier le CSS

Pour contrôler les styles chargés par le navigateur, ouvrir le fichier CSS généré dans `client/dist/assets/` avec [le validateur CSS du W3C](https://jigsaw.w3.org/css-validator/) via **By file upload** ou **By direct input**. Le bundle contient Bootstrap et Sass; conserver les résultats complets avec leur profil de validation. Les styles personnalisés peuvent aussi être examinés séparément. Ne pas annoncer tout le bundle valide si des erreurs sont présentes.

## Limites

- Vérifier les pages React ainsi ne teste que la validité du balisage. Cela ne prouve pas la conformité WCAG 2.1, l'accessibilité clavier, les contrastes, les lecteurs d'écran ou le bon fonctionnement des interactions.
- Les pages locales sont vérifiables par **Direct Input**, même si `localhost` n'est pas accessible depuis le service W3C.
- Conserver les comptes d'erreurs/messages et l'URL contrôlée dans `docs/tests.md`.
