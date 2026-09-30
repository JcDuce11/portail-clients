# Authentification

## Base existante

### users

- email
- password_hash
- firstname
- lastname
- role_id
- company_id
- active
- force_password_change
- last_login
- language
- theme

### roles

- SUPER_ADMIN
- ADMIN
- TECHNICIEN
- COMMERCIAL
- CLIENT

---

## Ecran de connexion

- Email
- Mot de passe
- Se souvenir de moi
- Mot de passe oublié

---

## API

POST /auth/login

GET /auth/me

POST /auth/logout

---

## Sécurité

bcrypt

JWT

Expiration configurable

---

## Premier login

force_password_change = 1

↓

Modification obligatoire du mot de passe

---

## Politique de mot de passe

Configurable par SUPER_ADMIN

- longueur minimale
- majuscule
- minuscule
- chiffre
- caractère spécial

---

## Menus dynamiques

Les menus sont générés suivant :

role_id

+

permissions

+

modules actifs
# Authentification V5 - Double authentification (2FA)

## Objectif

Ajouter une authentification à double facteur basée sur TOTP.

Compatible avec :

- Microsoft Authenticator
- Google Authenticator
- Authy
- FreeOTP
- Aegis

---

## Base de données

Ajouter dans users :

two_factor_enabled

two_factor_secret

two_factor_backup_codes

Exemple :

ALTER TABLE users
ADD COLUMN two_factor_enabled TINYINT(1) DEFAULT 0;

ALTER TABLE users
ADD COLUMN two_factor_secret VARCHAR(255) NULL;

---

## Activation

Utilisateur

↓

Mon profil

↓

Sécurité

↓

Activer la double authentification

↓

Génération QR Code

↓

Scan avec l'application OTP

↓

Saisie du code

↓

Validation

---

## Connexion

Email

Mot de passe

↓

Validation mot de passe

↓

Code OTP

↓

Accès portail

---

## Gestion

SUPER_ADMIN

Peut :

- Réinitialiser le 2FA
- Désactiver le 2FA d'un utilisateur

Utilisateur

Peut :

- Activer le 2FA
- Désactiver le 2FA
- Régénérer les codes de secours

---

## Codes de secours

Générer 10 codes uniques.

Exemple :

AB45-XZ91
QW28-TY74
...

Usage unique.

---

## Niveaux de sécurité

Phase 1

2FA facultatif.

---

Phase 2

2FA obligatoire pour :

- SUPER_ADMIN

---

Phase 3

2FA obligatoire pour :

- SUPER_ADMIN
- ADMIN

---

Phase 4

2FA obligatoire configurable
par le SUPER_ADMIN.

# Interface de connexion nouvelle génération

## Design

- [ ] Fond personnalisable depuis la configuration Super Admin
- [ ] Support image d'arrière-plan
- [ ] Support logo personnalisable
- [ ] Animation fluide entre les étapes
- [ ] Responsive mobile / tablette
- [ ] Compatible i18n

## Authentification

### Vérification e-mail

- [ ] Saisie e-mail
- [ ] Vérification existence utilisateur MariaDB
- [ ] Animation erreur utilisateur inconnu
- [ ] Lien création de compte

### Vérification mot de passe

- [ ] Validation du mot de passe
- [ ] Gestion des erreurs
- [ ] Affichage du nombre de tentatives restantes
- [ ] Blocage automatique après 5 échecs

### OTP

- [ ] Option OTP configurable
- [ ] Intégration Google Authenticator
- [ ] Vérification TOTP
- [ ] Écran OTP animé

### Session

- [ ] JWT
- [ ] Refresh Token
- [ ] Déconnexion sécurisée
- [ ] Protection des routes React

## Authentification progressive

Objectif :

Remplacer l'écran de connexion classique par une authentification
étape par étape avec animations.

Workflow :

EMAIL
↓
PASSWORD
↓
OTP (si activé)
↓
DASHBOARD

---

### Écran Email

- [ ] Vérification immédiate de l'existence du compte
- [ ] Animation de transition vers le mot de passe
- [ ] Affichage d'erreur utilisateur inconnu
- [ ] Proposition de création de compte

Message :

"Votre identifiant n'existe pas."

Lien :

"Créer un compte"

---

### Écran Mot de passe

- [ ] Validation du mot de passe
- [ ] Animation d'erreur shake
- [ ] Affichage du nombre de tentatives restantes
- [ ] Blocage automatique configurable

Message :

"Mot de passe incorrect"

"Il vous reste 4 tentatives."

---

### Écran OTP

- [ ] Affichage uniquement si 2FA activé
- [ ] Vérification TOTP
- [ ] Animation d'erreur

---

### Animations

- [ ] Slide Up à chaque étape validée
- [ ] Fade In du panneau suivant
- [ ] Shake sur erreur
- [ ] Transitions fluides

---

### Personnalisation

Configuration Super Admin

- [ ] Logo affiché sur la page de connexion
- [ ] Fond d'écran personnalisable
- [ ] Couleurs de connexion personnalisables
- [ ] Message d'accueil personnalisable