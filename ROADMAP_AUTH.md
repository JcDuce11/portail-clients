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