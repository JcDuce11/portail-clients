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