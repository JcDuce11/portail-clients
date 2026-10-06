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

L'étape 2 dépend du résultat de l'analyse de l'adresse e-mail effectuée après l'étape 1.

---

### Cas 1 - Société identifiée automatiquement

Exemple :

dupont@dupont.fr

↓

Le portail identifie automatiquement :

Société :
DUPONT

Le portail affiche :

Sélectionnez votre site :

▼ Siège Social
▼ Agence Lyon
▼ Entrepôt Lille

[ Utiliser ce site ]

[ Mon site n'existe pas ]

Le champ société n'est jamais affiché à l'utilisateur.

---

### Cas 2 - Domaine générique

Exemples :

gmail.com
hotmail.com
outlook.com
free.fr
orange.fr

Le portail affiche :

Adresse e-mail générique détectée.

Nom société

Nom du site

Adresse

Code postal

Ville

Pays

[ Rechercher ma société ]

---

### Cas 3 - Domaine inconnu

Le domaine de l'adresse e-mail ne correspond à aucune société connue.

Le portail affiche :

Société non identifiée.

Nom société

Nom du site

Adresse

Code postal

Ville

Pays

[ Rechercher ma société ]

## Cas 2B - Mon site n'existe pas

Lorsque l'utilisateur sélectionne :

Mon site n'existe pas

Le portail affiche :

Nom du nouveau site

Adresse

Code postal

Ville

Pays

[ Envoyer la demande ]

Aucune création de site n'est effectuée automatiquement.

Une demande est créée et devra être validée par :

REFERENT

ADMIN

SUPER_ADMIN

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
   
    11A. Analyse du domaine de l'adresse e-mail

    11B. Sélection du site

    11C. Création de demande de nouveau site

    11D. Recherche société pour domaine générique

    11E. Gestion du cas société introuvable

12. Inscription utilisateur

13. Validation utilisateur

14. Réinitialisation mot de passe

15. OTP réel

16. JWT

17. Authentification MariaDB complète


# Analyse Automatique Société / Site

## Principe

Le portail ne crée jamais immédiatement un utilisateur lors de l'inscription.

Avant toute création de compte, le système doit :

- identifier la société
- identifier le site
- déterminer le workflow de validation
- déterminer les interlocuteurs concernés

Aucun utilisateur ne doit être créé tant que cette phase n'est pas terminée.

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

Action :

```txt
Continuer
```

---

## Étape 2 - Informations Professionnelles

### Cas standard

Si la société est identifiée automatiquement grâce au domaine de l'adresse e-mail :

```txt
Nom du site

Adresse

Code postal

Ville

Pays
```

Le champ société n'est pas affiché.

---

### Cas domaine générique ou société introuvable

Exemples :

```txt
gmail.com

hotmail.com

outlook.com

free.fr

orange.fr
```

Le domaine ne peut pas être utilisé.

Le portail affiche alors :

```txt
Nom société

Nom du site

Adresse

Code postal

Ville

Pays
```

Action :

```txt
Vérifier les informations
```

---

# Étape 3 - Analyse Automatique

Le portail effectue une recherche.

## Analyse primaire

Extraction du domaine :

```txt
alexandre@dupont.fr
```

↓

```txt
dupont.fr
```

↓

Recherche société.

---

# Cas 1 - Société et Site trouvés

Affichage :

```txt
✅ Société trouvée

✅ Site trouvé

Société :
DUPONT

Site :
PARIS

Est-ce correct ?
```

Actions :

```txt
Oui

Non
```

---

## Si Oui

Le workflow continue.

Aucun utilisateur n'est encore créé.

---

## Si Non

Retour à l'étape précédente.

---

# Cas 2 - Société trouvée mais Site introuvable

Affichage :

```txt
✅ Société trouvée

❌ Site introuvable
```

Puis :

```txt
Sites existants :

• Siège Social

• Agence Lyon

• ...
```

Actions :

```txt
Choisir un site existant

Créer un nouveau site
```

---

## Cas 2A - Site existant

L'utilisateur choisit un site.

Le workflow continue.

---

## Cas 2B - Création d'un nouveau site

Formulaire supplémentaire :

```txt
Nom du nouveau site

Adresse

Code postal

Ville

Pays
```

Une demande de création est envoyée.

---

# Cas 3 - Domaine Générique

Le portail ne peut pas identifier automatiquement la société.

L'utilisateur doit renseigner :

Nom société

Nom du site

Adresse

Code postal

Ville

Pays

Puis :

[ Rechercher ma société ]

---

## Société trouvée

Le portail affiche :

✅ Société détectée

Puis la liste des sites existants :

▼ Siège Social
▼ Agence Lyon
▼ ...

[ Utiliser ce site ]

[ Mon site n'existe pas ]

Le workflow devient alors identique au Cas 1.


---

# Cas 4 - Société introuvable

Aucune société n'a été trouvée.

Le portail affiche :

❌ Aucune société trouvée.

Votre demande sera transmise à un administrateur pour analyse.

Actions :

[ Envoyer ma demande ]

[ Retour ]

La demande est ensuite transmise à :

REFERENT

ADMIN

SUPER_ADMIN
---

# Création de la demande

Lorsque le workflow est validé :

Création :

```txt
status = PENDING_EMAIL

email_verified = 0

email_verification_token

email_verification_expires
```

Durée :

```txt
24 heures
```

---

# Validation de l'adresse e-mail

Un email est envoyé.

L'utilisateur clique sur :

```txt
Valider mon adresse e-mail
```

---

## Validation réussie

```txt
email_verified = 1

status = PENDING_APPROVAL
```

---

# Validation Administrative

Une notification est envoyée à :

```txt
REFERENT

ADMIN

SUPER_ADMIN
```

---

## Traitement

Le premier valideur ayant répondu :

```txt
Accepter

ou

Refuser
```

devient le valideur officiel.

Tous les autres liens deviennent invalides.

Message :

```txt
Demande déjà traitée.
```

---

# Activation du compte

Condition obligatoire :

```txt
company_id renseigné

ET

primary_site_id renseigné
```

---

# Interdiction Absolue

Même un :

```txt
SUPER_ADMIN
```

ne peut pas activer un utilisateur si :

```txt
company_id = NULL

ou

primary_site_id = NULL
```

---

# Adresse e-mail non validée

Un :

```txt
ADMIN

ou

SUPER_ADMIN
```

peut activer un utilisateur même si :

```txt
email_verified = 0
```

---

## Restrictions appliquées

L'utilisateur peut :

```txt
Se connecter
```

Mais ne peut pas :

```txt
Réinitialiser son mot de passe

Activer l'OTP

Recevoir les notifications

Recevoir les emails Tickets

Recevoir les emails Interventions

Recevoir les emails automatiques
```

---

## Message à la connexion

Affichage permanent :

```txt
Votre adresse e-mail n'est pas validée.

Certaines fonctionnalités sont désactivées tant que votre adresse e-mail n'a pas été validée.
```

---

# Règle métier fondamentale

```txt
Aucun utilisateur orphelin.
```

Obligatoire :

```txt
company_id

ET

primary_site_id
```

Cette règle s'applique :

```txt
Frontend

Backend

MariaDB

Validation administrative
```