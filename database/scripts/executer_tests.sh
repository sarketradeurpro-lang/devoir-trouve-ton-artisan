#!/bin/bash
# Script pour exécuter les tests sur la base MySQL
# À exécuter uniquement sur la base de test : trouve_ton_artisan_test

echo "=========================================="
echo "EXÉCUTION DES TESTS SQL"
echo "Base de données: trouve_ton_artisan_test"
echo "=========================================="
echo ""

# Vérifier que mysql est disponible
if ! command -v mysql &> /dev/null; then
    echo "ERREUR: mysql n'est pas installé ou n'est pas dans le PATH"
    exit 1
fi

# Demander les informations de connexion
read -p "Nom d'utilisateur MySQL: " mysql_user
read -s -p "Mot de passe MySQL: " mysql_password
echo ""

# Créer la base de test
echo "1. Création de la base de test..."
mysql -u "$mysql_user" -p"$mysql_password" -e "CREATE DATABASE IF NOT EXISTS trouve_ton_artisan_test;"

# Sélectionner la base
echo "2. Sélection de la base trouve_ton_artisan_test..."
mysql -u "$mysql_user" -p"$mysql_password" -e "USE trouve_ton_artisan_test;"

# Exécuter le script de création
echo "3. Exécution de creation.sql..."
mysql -u "$mysql_user" -p"$mysql_password" trouve_ton_artisan_test < creation.sql

# Exécuter le script d'alimentation
echo "4. Exécution de alimentation.sql..."
mysql -u "$mysql_user" -p"$mysql_password" trouve_ton_artisan_test < alimentation.sql

# Exécuter les tests
echo "5. Exécution des tests..."
echo ""
mysql -u "$mysql_user" -p"$mysql_password" trouve_ton_artisan_test < test_scripts.sql

echo ""
echo "=========================================="
echo "TESTS TERMINÉS"
echo "=========================================="

# Option: Nettoyer la base de test
# read -p "Voulez-vous supprimer la base de test? (o/n): " answer
# if [ "$answer" = "o" ]; then
#     mysql -u "$mysql_user" -p"$mysql_password" -e "DROP DATABASE IF EXISTS trouve_ton_artisan_test;"
#     echo "Base de test supprimée."
# fi
