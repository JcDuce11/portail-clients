# ROADMAP_AUTH.md

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

```txt
1 société obligatoire
```

---

## Site principal

Chaque utilisateur doit appartenir à :

```txt
1 site principal obligatoire
```

Le site principal devient :

```txt
Dashboard par défaut

Site par défaut pour les tickets

Site par défaut pour les interventions

Site par défaut pour la documentation

Site par défaut pour les actifs
```

---

## Sites secondaires

Chaque utilisateur peut appartenir à :

```txt
0 à N sites secondaires
```

Exemple :

```txt
DUPONT

Site principal :
Paris

Sites secondaires :
Lyon
Marseille
Toulouse
```

---

# Gestion Multi-sites

## Connexion

Après authentification :

```txt
Email
↓
Mot de passe
↓
OTP
↓
Dashboard du site principal
```

---

## Sélecteur de site

Le bandeau supérieur contient :

```txt
Paris ▼
```

L'utilisateur peut sélectionner :

```txt
Paris
Lyon
Marseille
Toulouse
```

---

## Changement de site

Lors du changement :

```txt
Dashboard rechargé

Statistiques rechargées

Modules rechargés

Permissions recalculées

Tickets filtrés
```

---

## Règle d'accès

Les accès dépendent de :

```txt
Utilisateur

+
Rôle

+
Site actif

+
Services activés
```

---

# Workflow de Connexion

## Identifiant Inconnu

### Tentative 1

Affichage :

```txt
Identifiant inconnu
```

Animation :

```txt
Shake
```

---

### Tentative 2

Affichage :

```txt
Identifiant inconnu

Pas encore d'identifiant ?
C'est par ici.
```

Action :

```txt
Créer mon compte
```

---

# Workflow d'Inscription

## Étape 1 - Informations Personnelles

L'utilisateur renseigne :

```txt
Nom

Prénom

Téléphone portable

Téléphone fixe

Adresse e-mail

Mot de passe

Confirmation du mot de passe
```

---

## Étape 2 - Informations Professionnelles

L'utilisateur renseigne :

```txt
Nom société

Nom du site

Adresse du site

Code postal

Ville

Pays
```

---

# Recherche Automatique

Le système tente d'identifier :

```txt
Société
```

et :

```txt
Site
```

à partir :

```txt
Domaine de l'adresse e-mail
```

ou :

```txt
Nom société

Adresse

Ville

Code postal
```

---

# Cas 1 - Société et Site Trouvés

Le système affiche :

```txt
Nous avons trouvé :

Société :
XXX

Site :
XXX

Est-ce correct ?
```

Choix :

```txt
Oui

Non
```

---

# Cas 2 - Société Trouvée mais Site Introuvable

Le système affiche :

```txt
Nous avons trouvé votre société.

Aucun site correspondant n'a été trouvé.
```

Choix :

```txt
Sélectionner un site existant

Créer un nouveau site
```

---

# Création d'un Nouveau Site

L'utilisateur renseigne :

```txt
Nom du site

Adresse

Code postal

Ville

Pays
```

Une demande est envoyée :

```txt
Référent

ADMIN

SUPER_ADMIN
```

pour validation.

---

# Cas 3 - Domaine Générique

Exemples :

```txt
gmail.com

hotmail.com

outlook.com

free.fr

orange.fr
```

Le domaine n'est pas exploitable.

Le système utilise :

```txt
Nom société

Adresse

Ville

Code postal
```

pour identifier l'entreprise.

---

# Validation de l'Adresse E-mail

Après création du compte :

```txt
Envoi d'un email de validation
```

Durée du lien :

```txt
24 heures
```

---

## Important

La validation de l'adresse e-mail est recommandée mais n'est pas obligatoire.

Un :

```txt
ADMIN

ou

SUPER_ADMIN
```

peut activer un utilisateur même si l'adresse e-mail n'est pas validée.

---

# Conséquences d'une Adresse E-mail Non Validée

L'utilisateur peut être :

```txt
ACTIVE
```

mais ne recevra pas :

```txt
Notifications

Relances

Emails Tickets

Emails Interventions

Emails Automatiques

Réinitialisation automatique du mot de passe
```

---

# Règle Métier Obligatoire

Pour être activé :

```txt
Société obligatoire

ET

Site principal obligatoire
```

---

# Interdiction Absolue

Même un :

```txt
SUPER_ADMIN
```

ne peut pas activer un utilisateur si :

```txt
Aucune société
```

ou :

```txt
Aucun site principal
```

n'est défini.

---

# Validation Administrative

Peut être effectuée par :

```txt
ADMIN

SUPER_ADMIN
```

---

# Gestion Manuelle

Un ADMIN ou un SUPER_ADMIN peut :

```txt
Associer une société

Associer un site principal

Associer des sites secondaires

Créer une société

Créer un site

Valider un utilisateur

Refuser un utilisateur

Débloquer un utilisateur
```

---

# Statuts Utilisateurs

## PENDING_EMAIL

```txt
Adresse e-mail non validée
```

---

## PENDING_APPROVAL

```txt
Validation administrative en attente
```

---

## PENDING_ASSIGNMENT

```txt
Société ou site principal manquant
```

---

## ACTIVE

```txt
Compte actif
```

---

## LOCKED

```txt
Compte bloqué
```

---

## REJECTED

```txt
Demande refusée
```

---

## DELETED

```txt
Suppression logique
```

---

# Suppression

Les utilisateurs ne sont jamais supprimés physiquement.

Le statut utilisé est :

```txt
DELETED
```

afin de conserver :

```txt
Historique

Tickets

Interventions

Documents

Logs

Traçabilité
```

---

# Permissions

## ADMIN

Peut :

```txt
Valider un utilisateur

Refuser un utilisateur

Supprimer une demande

Supprimer un utilisateur

Associer une société

Associer un site

Débloquer un compte
```

Ne peut pas :

```txt
Modifier SMTP

Modifier Microsoft Graph

Modifier la configuration système
```

---

## SUPER_ADMIN

Peut :

```txt
Valider un utilisateur

Refuser un utilisateur

Supprimer une demande

Supprimer un utilisateur

Créer une société

Créer un site

Associer les utilisateurs

Débloquer les comptes

Modifier toute la configuration
```

---

## REFERENT

Peut :

```txt
Valider un utilisateur

Refuser un utilisateur

Valider un nouveau site

Refuser un nouveau site
```

Ne peut pas :

```txt
Modifier la configuration système

Modifier SMTP

Modifier Microsoft Graph

Modifier les paramètres de sécurité globaux
```

---

# Authentification Multi-Facteur (OTP)

## Activation Utilisateur

Disponible via :

```txt
Mon Profil
↓
Sécurité
↓
Activer OTP
```

---

## Forçage OTP Utilisateur

Le SUPER_ADMIN peut imposer :

```txt
Forcer la double authentification
```

sur un utilisateur.

---

## Forçage OTP Société

Le SUPER_ADMIN peut imposer :

```txt
Double authentification obligatoire
```

sur toute une société.

---

# Priorité OTP

Le MFA est requis si :

```txt
OTP imposé à l'utilisateur

OU

OTP imposé à la société

OU

OTP activé volontairement
```

---

# Désactivation OTP

Impossible si l'OTP est imposé :

```txt
Par un administrateur

Ou

Par la société
```

---

# Applications Compatibles

Utilisation du standard :

```txt
TOTP RFC6238
```

Compatible :

```txt
Microsoft Authenticator

Google Authenticator

Authy

LockSelf

Bitwarden

Aegis

1Password

Keeper
```

---

# Activation OTP

Workflow :

```txt
QR Code

↓

Scan

↓

Code à 6 chiffres

↓

Validation

↓

OTP activé
```

---

# Configuration SUPER_ADMIN

Menu :

```txt
Configuration
```

Accessible uniquement au :

```txt
SUPER_ADMIN
```

---

# Modules de Configuration

```txt
Authentification

SMTP

Microsoft 365 Graph

Sécurité

Personnalisation
```

---

# Configuration Authentification

Paramètres :

```txt
Nombre maximum de tentatives

Durée de verrouillage

Règles OTP

Expiration des sessions

Validation automatique

Validation manuelle
```

---

# Configuration SMTP

Paramètres :

```txt
Serveur SMTP

Port

SSL/TLS

Compte

Mot de passe

Nom expéditeur

Adresse expéditeur

Test de connexion
```

---

# Configuration Microsoft 365 Graph

Paramètres :

```txt
Tenant ID

Client ID

Client Secret

Adresse expéditeur

Test de connexion
```

---

# Structure MariaDB Cible

## users

Nouvelles colonnes prévues :

```txt
primary_site_id

status

email_verified

email_verification_token

email_verification_expires

failed_login_attempts

locked_until

two_factor_enabled

require_two_factor

two_factor_secret

password_reset_token

password_reset_expires
```

---

## companies

Nouvelles colonnes prévues :

```txt
require_two_factor
```

---

## user_sites

Nouvelle table :

```txt
user_id

site_id
```

Permet la gestion :

```txt
Site principal

+

Sites secondaires
```

---

## app_settings

Nouvelle table de configuration globale :

```txt
Authentification

SMTP

Microsoft Graph

OTP

Notifications

Branding

Sécurité
```

---

# Ordre de Développement

```txt
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

12. Inscription utilisateur

13. Validation utilisateur

14. Réinitialisation mot de passe

15. OTP réel

16. JWT

17. Authentification MariaDB complète


# Analyse Automatique Société / Site

## Principe

Le portail ne doit jamais créer immédiatement un utilisateur lors de l'inscription.

Avant toute création de compte, le système doit effectuer une analyse automatique permettant d'identifier :

- la société
- le site
- le référent potentiel
- le workflow de validation à appliquer

---

# Workflow d'Inscription

## Étape 1 - Informations Personnelles

L'utilisateur renseigne :

```txt
Prénom

Nom

Téléphone portable

Téléphone fixe

Adresse e-mail

Mot de passe

Confirmation du mot de passe
```

Puis :

```txt
Continuer
```

---

## Étape 2 - Informations Professionnelles

L'utilisateur renseigne :

```txt
Nom de la société

Nom du site

Adresse

Code postal

Ville

Pays
```

Puis :

```txt
Vérifier les informations
```

---

# Étape 3 - Analyse Automatique

Le système ne crée pas encore l'utilisateur.

Le portail lance une recherche automatique.

---

## Analyse du domaine de l'adresse e-mail

Exemple :

```txt
alexandre@dupont.fr
```

↓

Extraction :

```txt
dupont.fr
```

↓

Recherche :

```txt
Société

Site
```

---

# Cas 1 - Société et Site trouvés

Le portail affiche :

```txt
Nous avons trouvé :

Société :
DUPONT

Site :
PARIS

Est-ce correct ?
```

Choix :

```txt
Oui

Non
```

---

## Si Oui

Le workflow continue.

Aucune création immédiate.

Le système prépare :

```txt
PENDING_EMAIL

email_verification_token

email_verification_expires
```

---

## Si Non

Le portail permet une correction manuelle.

---

# Cas 2 - Société trouvée mais Site introuvable

Le portail affiche :

```txt
Nous avons trouvé votre société.

Aucun site correspondant n'a 