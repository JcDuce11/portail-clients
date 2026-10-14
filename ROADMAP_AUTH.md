# ROADMAP_AUTH

# Authentification, Sécurité et Gestion des Utilisateurs

## Vision

Construire un système d'authentification robuste, sécurisé et entièrement administrable permettant :

- l'authentification multi-rôles
- l'authentification multi-sociétés
- l'authentification multi-sites
- l'auto-inscription contrôlée
- la validation administrative
- la gestion du MFA (OTP)
- la réinitialisation sécurisée des mots de passe
- la gestion SMTP et Microsoft Graph
- la traçabilité complète des utilisateurs

---

# Architecture Métier

## Société

Chaque utilisateur doit appartenir à :

- 1 société obligatoire

## Site principal

Chaque utilisateur doit appartenir à :

- 1 site principal obligatoire

Le site principal devient :

- Dashboard par défaut
- Site par défaut pour les tickets
- Site par défaut pour les interventions
- Site par défaut pour la documentation
- Site par défaut pour les actifs

## Sites secondaires

Chaque utilisateur peut appartenir à :

- 0 à N sites secondaires

Exemple :

DUPONT

Site principal :

- Paris

Sites secondaires :

- Lyon
- Marseille
- Toulouse

---

# Gestion Multi-Sites

## Connexion

Après authentification :

Email
↓
Mot de passe
↓
OTP
↓
Dashboard du site principal

## Sélecteur de site

Le bandeau supérieur contient :

Paris ▼

L'utilisateur peut sélectionner :

- Paris
- Lyon
- Marseille
- Toulouse

## Changement de site

Lors du changement :

- Dashboard rechargé
- Statistiques rechargées
- Modules rechargés
- Permissions recalculées
- Tickets filtrés

## Règle d'accès

Les accès dépendent de :

- Utilisateur
- Rôle
- Site actif
- Services activés

---

# Workflow de Connexion

## Identifiant inconnu

### Tentative 1

Affichage :

Identifiant inconnu

Animation :

Shake

### Tentative 2

Affichage :

Identifiant inconnu

Pas encore d'identifiant ?
C'est par ici.

Action :

Créer mon compte

---

# Workflow d'Inscription

## Étape 1 - Informations Personnelles

L'utilisateur renseigne :

- Nom
- Prénom
- Téléphone portable
- Téléphone fixe
- Adresse e-mail
- Mot de passe
- Confirmation du mot de passe

## Étape 2 - Informations Professionnelles

### Cas 1 - Société identifiée automatiquement

Exemple :

dupont@dupont.fr

Le portail identifie automatiquement :

Société : DUPONT

Le portail affiche :

Sélectionnez votre site :

- Siège Social
- Agence Lyon
- Entrepôt Lille

Actions :

- Utiliser ce site
- Mon site n'existe pas

Le champ société n'est jamais affiché.

### Cas 2 - Domaine générique

Exemples :

- gmail.com
- hotmail.com
- outlook.com
- free.fr
- orange.fr

Le portail affiche :

- Nom société
- Nom du site
- Adresse
- Code postal
- Ville
- Pays

Action :

Rechercher ma société

### Cas 3 - Domaine inconnu

Le portail affiche :

- Nom société
- Nom du site
- Adresse
- Code postal
- Ville
- Pays

Action :

Rechercher ma société

### Cas 4 - Création d'un nouveau site

L'utilisateur sélectionne :

Mon site n'existe pas

Le portail affiche :

- Nom du nouveau site
- Adresse
- Code postal
- Ville
- Pays

Action :

Envoyer la demande

Aucun site n'est créé automatiquement.

#### Société existante

La demande peut être validée par :

- REFERENT
- ADMIN
- SUPER_ADMIN

#### Société inexistante

La demande peut être validée par :

- ADMIN
- SUPER_ADMIN

Le REFERENT n'est pas disponible tant qu'aucune société n'a été identifiée.

---

# Validation de l'Adresse E-mail

Après création du compte :

- Envoi d'un email de validation

Validité du lien :

- 24 heures

## Validation réussie

email_verified = 1

status = PENDING_APPROVAL

## Important

La validation de l'adresse e-mail est recommandée mais non obligatoire.

Un ADMIN ou un SUPER_ADMIN peut activer un utilisateur même si son adresse e-mail n'est pas validée.

---

# Conséquences d'une Adresse E-mail Non Validée

L'utilisateur peut être ACTIVE.

Cependant il ne recevra pas :

- Notifications
- Emails Tickets
- Emails Interventions
- Emails Automatiques
- Emails de réinitialisation du mot de passe

---

# Validation Administrative

## Cas Société Existante

La validation peut être effectuée par :

- REFERENT
- ADMIN
- SUPER_ADMIN

## Cas Société Inexistante

La validation peut être effectuée par :

- ADMIN
- SUPER_ADMIN

## Fonctionnement

Le premier valideur ayant traité la demande devient le valideur officiel.

Les autres tentatives retournent :

Demande déjà traitée.

---

# Règles Métier Obligatoires

Pour être activé :

- company_id obligatoire
- primary_site_id obligatoire

## Interdiction Absolue

Même un SUPER_ADMIN ne peut pas activer un utilisateur si :

- company_id = NULL
- primary_site_id = NULL

---

# Gestion Manuelle

Un ADMIN ou un SUPER_ADMIN peut :

- Associer une société
- Associer un site principal
- Associer des sites secondaires
- Créer une société
- Créer un site
- Valider un utilisateur
- Refuser un utilisateur
- Débloquer un utilisateur

---

# Statuts Utilisateurs

## PENDING_EMAIL

Adresse e-mail non validée

## PENDING_APPROVAL

Validation administrative en attente

## PENDING_ASSIGNMENT

Société ou site principal manquant

## ACTIVE

Compte actif

## LOCKED

Compte bloqué

## REJECTED

Demande refusée

## DELETED

Suppression logique

## Workflow Normal

PENDING_EMAIL
↓
PENDING_APPROVAL
↓
ACTIVE

## Workflow Refus

PENDING_APPROVAL
↓
REJECTED

## Workflow Blocage

ACTIVE
↓
LOCKED

## Workflow Suppression

ACTIVE
↓
DELETED

---

# Administration des Utilisateurs

## Utilisateurs en attente

Visible pour :

- SUPER_ADMIN
- ADMIN
- REFERENT

Affichage :

- Nom
- Prénom
- Email
- Société
- Site
- Date d'inscription
- Statut

Actions :

- Consulter
- Valider
- Refuser

## Utilisateurs actifs

### SUPER_ADMIN

Accès à tous les utilisateurs.

### ADMIN

Accès aux utilisateurs de sa société.

### REFERENT

Accès aux utilisateurs de sa société.

Actions disponibles :

- Consulter
- Modifier
- Désactiver
- Réactiver

---

# Permissions

## ADMIN

Peut :

- Valider un utilisateur
- Refuser un utilisateur
- Supprimer une demande
- Supprimer un utilisateur
- Associer une société
- Associer un site
- Débloquer un compte

Ne peut pas :

- Modifier SMTP
- Modifier Microsoft Graph
- Modifier la configuration système

## SUPER_ADMIN

Peut :

- Valider un utilisateur
- Refuser un utilisateur
- Supprimer une demande
- Supprimer un utilisateur
- Créer une société
- Créer un site
- Associer les utilisateurs
- Débloquer les comptes
- Modifier toute la configuration

## REFERENT

Peut :

- Valider un utilisateur
- Refuser un utilisateur
- Valider un nouveau site
- Refuser un nouveau site
- Consulter les utilisateurs de sa société
- Consulter les demandes en attente de sa société

Ne peut pas :

- Modifier la configuration système
- Modifier SMTP
- Modifier Microsoft Graph
- Modifier les paramètres de sécurité globaux

---

# Authentification Multi-Facteur (OTP)

## Activation Utilisateur

Mon Profil
→ Sécurité
→ Activer OTP

## Forçage OTP Utilisateur

Le SUPER_ADMIN peut imposer la double authentification à un utilisateur.

## Forçage OTP Société

Le SUPER_ADMIN peut imposer la double authentification à toute une société.

## Priorité OTP

Le MFA est requis si :

- OTP imposé à l'utilisateur
- OTP imposé à la société
- OTP activé volontairement

## Désactivation OTP

Impossible si l'OTP est imposé.

## Applications Compatibles

- Microsoft Authenticator
- Google Authenticator
- Authy
- LockSelf
- Bitwarden
- Aegis
- 1Password
- Keeper

---

# Configuration

## Modules

- Authentification
- SMTP
- Microsoft Graph
- Sécurité
- Personnalisation

---

# Structure MariaDB Cible

## users

Nouvelles colonnes :

- primary_site_id
- status
- email_verified
- email_verification_token
- email_verification_expires
- failed_login_attempts
- locked_until
- two_factor_enabled
- require_two_factor
- two_factor_secret
- password_reset_token
- password_reset_expires

## companies

Nouvelles colonnes :

- require_two_factor

## user_sites

- user_id
- site_id

Permet :

- Site principal
- Sites secondaires

## app_settings

Configuration globale :

- Authentification
- SMTP
- Microsoft Graph
- OTP
- Notifications
- Branding
- Sécurité

---

# Ordre de Développement

1. Création table app_settings
2. Création table user_sites
3. Ajout primary_site_id
4. Ajout statut utilisateur
5. Ajout validation email
6. Ajout blocage compte
7. Ajout OTP
8. Création rôle REFERENT
9. Configuration Authentification
10. Configuration SMTP
11. Configuration Microsoft 365 Graph
12. Analyse domaine email
13. Sélection site
14. Création demande nouveau site
15. Recherche société
16. Inscription utilisateur
17. Validation utilisateur
18. Réinitialisation mot de passe
19. OTP réel
20. JWT
21. Authentification MariaDB complète