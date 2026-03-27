# Guide d'Installation - PREFCI-BAT SARL

Ce guide explique comment configurer et lancer le projet (Backend NestJS + Admin React) avec **MySQL**.

## 1. Prérequis
- **Node.js** (v18 ou plus)
- **MySQL Server** (installé et actif sur le port 3306)
- **Git** (optionnel)

---

## 2. Configuration Rapide

### Étape 1 : Configuration MySQL
1. Créez une base de données vide nommée `prefci_bat_db`.
2. Ouvrez le fichier `back/.env`.
3. Modifiez la ligne `DATABASE_URL` avec vos identifiants MySQL :
   `DATABASE_URL="mysql://VOTRE_USER:VOTRE_MOT_DE_PASSE@localhost:3306/prefci_bat_db"`

### Étape 2 : Initialisation de la Base de Données
Ouvrez un terminal dans le dossier `back` et lancez :
```powershell
npx prisma db push
npx prisma db seed
```
*Note : J'ai déjà installé les dépendances et généré le client Prisma dans votre environnement actuel.*

---

## 3. Lancement du Projet

Vous devez lancer le Backend et l'Admin Frontend en parallèle.

### Lancer le Backend (API)
1. Ouvrez un terminal dans `back`.
2. Lancez : `npm run start:dev`
3. L'API sera accessible sur `http://localhost:3000`.

### Lancer l'Admin Frontend (Dashboard)
1. Ouvrez un terminal dans `admin`.
2. Lancez : `npm run dev`
3. Le site admin sera accessible sur `http://localhost:5173` (ou `http://localhost:5174` si le port 5173 est déjà utilisé).

---

## 4. Accès Admin par Défaut
- **URL** : `http://localhost:5173/login` (ou `http://localhost:5174/login` si Vite a changé de port)
- **Email** : `admin@prefci.com`
- **Mot de passe** : `admin123`

---

## 5. Dépannage
- **Erreur de Client Prisma** : Si vous changez de machine, relancez `npx prisma generate` dans le dossier `back`.
- **Port déjà utilisé** : Si le port 3000 est pris, changez-le dans `back/src/main.ts`.
- **Connexion admin impossible** :
  1. Vérifiez que le backend tourne bien sur `http://localhost:3000` (`npm run start:dev` dans `back`).
  2. Relancez le seed si besoin : `npx prisma db seed`.
  3. Utilisez les identifiants par défaut ci-dessus (`admin@prefci.com` / `admin123`).
- **Erreur Prisma `P1001: Can't reach database server at localhost:3306`** :
  1. Démarrez le service MySQL.
  2. Vérifiez la valeur `DATABASE_URL` dans `back/.env`.
  3. Relancez `npx prisma db push`, puis `npx prisma db seed`.
  4. Redémarrez l'API (`npm run start:dev`).
