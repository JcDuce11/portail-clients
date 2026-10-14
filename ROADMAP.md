# ROADMAP - Portail MSP / ESN

# Vision du produit

Créer une plateforme de gestion client destinée aux :

- ESN
- MSP
- Prestataires informatiques
- Infogérants
- Intégrateurs

Objectif :

Centraliser l'ensemble des informations clients :

- Contrats
- Documentation
- Interventions
- Tickets
- Devis
- Services souscrits
- Utilisateurs

Le logiciel doit être :

- Modulaire
- Évolutif
- Multi-clients
- Multi-rôles
- Facilement maintenable
- Extensible sans modification du noyau

---

# Etat actuel du projet

## Backend

✅ MariaDB

✅ NodeJS

✅ API REST

✅ JWT (base)

---

## Modules

✅ Sociétés V1

✅ Archivage

✅ Restauration

✅ Utilisateurs V1

🔄 Utilisateurs V2

⏳ Tickets

⏳ Interventions

⏳ Documentation

⏳ Devis

---

## Architecture

✅ Multi-rôles

✅ Archivage logique

✅ Références uniques

🔄 Gestion des services souscrits

⏳ Menus dynamiques

⏳ Permissions avancées

---

## Services souscrits

✅ Table services

✅ Table company_services

✅ GET /services

✅ GET /companies/:id/services

✅ PUT /companies/:id/services

✅ Sauvegarde MariaDB

✅ Liaison Société ↔ Services

---

# Principes d'architecture

Principes fondamentaux :

- Architecture modulaire.
- Les nouveaux modules ne doivent jamais casser le cœur du logiciel.
- Les identifiants utilisateurs ne sont jamais réutilisés.
- Les identifiants sociétés ne sont jamais réutilisés.
- Les identifiants sites ne sont jamais réutilisés.
- Toute suppression définitive est journalisée.
- Aucun utilisateur ne peut être orphelin d'une société et d'un site principal.
- L'archivage d'une société archive automatiquement ses sites et désactive automatiquement ses utilisateurs.
- Archivage préféré à la suppression.
- Historique conservé.
- Traçabilité complète.
- Menus générés dynamiquement selon :
  - le rôle utilisateur
  - la société sélectionnée
  - les services souscrits

---
# Internationalisation (I18N)

Le portail doit être nativement multilingue.

Langues supportées :

- 🇫🇷 Français
- 🇬🇧 Anglais
- 🇪🇸 Espagnol
- 🇮🇹 Italien
- 🇩🇪 Allemand

---

## Principe

Aucun texte de l'interface ne doit être codé en dur.

Mauvais exemple :

```jsx
<h1>Sociétés</h1>
```

Bon exemple :

```jsx
<h1>{t("companies.title")}</h1>
```

---

## Architecture

Structure prévue :

```text
src
│
├── locales
│   ├── fr.json
│   ├── en.json
│   ├── es.json
│   ├── it.json
│   └── de.json
│
├── i18n
│   └── index.js
```

---

## Langue utilisateur

Chaque utilisateur possède une langue préférée :

- Français
- English
- Español
- Italiano
- Deutsch

La langue est enregistrée dans son profil.

---

## Interfaces concernées

Toutes les interfaces doivent être traduisibles :

- Administrateur
- Technicien
- Commercial
- Client

---

## Menus dynamiques

Les intitulés affichés doivent être traduits automatiquement.

Exemple :

Français :

```text
Sociétés
Tickets
Interventions
```

Anglais :

```text
Companies
Tickets
Interventions
```

Allemand :

```text
Unternehmen
Tickets
Interventionen
```

---

## Génération PDF

Les documents PDF doivent être générés dans la langue du client.

Documents concernés :

- Devis
- Bons d'intervention
- Exports PDF

Exemple :

Client allemand

↓

Bon d'intervention généré en allemand.

---

## Notifications

Les emails automatiques doivent être générés dans la langue du destinataire.

Exemples :

- Nouveau ticket
- Nouveau devis
- Validation intervention
- Refus intervention
- Notification système

---

## Priorité projet

L'internationalisation doit être intégrée dès les premières versions de l'interface afin d'éviter une refonte complète ultérieure.

---

# Architecture Générale

## Noyau obligatoire

Toutes les sociétés possèdent automatiquement :

- Informations générales
- Tickets
- Interventions
- Documentation
- Devis

Ces modules ne sont jamais désactivables.

--- 

# Nouvelle Architecture Multi-Sites

## Principe

Une société peut posséder un ou plusieurs sites.

Les services souscrits sont rattachés aux sites et non directement à la société.

---

## Société

Exemple :

CLI-000002

DUPONT

La société contient :

- Informations générales
- Contrat
- SLA
- Utilisateurs
- Sites

---

## Sites

Chaque site possède :

- Référence site
- Nom du site
- Rue
- Code postal
- Ville
- Pays
- Téléphone
- Email
- SIRET
- Notes

Exemple :

CLI-000002-01

Siège Paris

CLI-000002-02

Agence Lyon

CLI-000002-03

Entrepôt Lille

---

## Référence Site

Format :

CLI-000002-01

CLI-000002-02

CLI-000002-03

Règle :

Référence société
+
Numéro de site sur 2 chiffres

---

## Services Souscrits

Les services sont désormais associés à chaque site.

Services optionnels :

- Téléphonie
- Réseau
- Serveurs
- Sauvegardes
- Supervision

---

## Modules obligatoires

Tous les sites disposent automatiquement de :

- Documentation
- Interventions

Ces modules ne sont jamais désactivables.

---

## Application des services

Possibilité lors de la création ou de la modification :

[ Appliquer ces services à tous les sites ]

Cette action copie automatiquement les services sélectionnés sur chaque site de la société.

---

## Exemple

### Société

DUPONT

### Site Paris

✅ Téléphonie

✅ Réseau

✅ Serveurs

✅ Sauvegardes

✅ Supervision

---

### Site Lyon

✅ Téléphonie

✅ Réseau

---

### Site Lille

✅ Sauvegardes

✅ Supervision

---

# Impacts futurs

## Tickets

Les tickets seront rattachés à un site.

Exemple :

Ticket #123

Société :
DUPONT

Site :
Paris

---

## Interventions

Les interventions seront rattachées à un site.

Exemple :

BI-2026-000123

Société :
DUPONT

Site :
Lyon

---

## Documentation

La documentation sera rattachée à un site.

Les documents spécifiques au site seront isolés.

---

## Technicien

Sélection :

Société :
DUPONT

Site :
Paris ▼

Le menu dynamique sera construit à partir des services du site sélectionné.

---

## Client

Le client verra :

- Ses sites
- Les services de chaque site
- Les tickets par site
- Les interventions par site
- Les devis de la société

---

# Priorité d'architecture

La notion de site doit être implémentée avant :

- Tickets
- Interventions
- Documentation
- Menus dynamiques

afin d'éviter une refonte ultérieure du modèle de données.
---

## Services optionnels

Services réellement souscrits.

- Téléphonie
- Réseau
- Serveurs
- Sauvegardes
- Supervision

Ces modules déterminent :

- les menus affichés
- les onglets visibles
- les informations exploitables

---

# Gestion des rôles

Le portail repose sur deux niveaux de rôles :

## Rôles métier

Les rôles métier définissent l'utilisation quotidienne de la plateforme.

### CLIENT

Peut :

- Consulter ses sites
- Ouvrir des tickets
- Consulter ses tickets
- Consulter la documentation
- Consulter ses interventions
- Consulter ses devis
- Accepter ou refuser ses devis
- Accepter ou refuser ses interventions

### TECHNICIEN

Peut :

- Gérer les tickets
- Gérer les interventions
- Alimenter la documentation
- Escalader les tickets
- Modifier les statuts
- Ajouter des commentaires
- Consulter les informations techniques

### COMMERCIAL

Peut :

- Consulter les sociétés
- Consulter les tickets
- Consulter les interventions
- Consulter la documentation
- Déposer des devis PDF
- Suivre les validations clients

---

## Rôles de gouvernance

Les rôles de gouvernance définissent qui administre la plateforme.

### REFERENT

Le référent représente une société cliente.

Conditions :

- Obligatoirement associé à une société
- Obligatoirement associé à un compte CLIENT

Combinaison autorisée :

CLIENT + REFERENT

Combinaisons interdites :

TECHNICIEN + REFERENT
COMMERCIAL + REFERENT

Peut :

- Consulter les utilisateurs de sa société
- Modifier les utilisateurs de sa société
- Inviter des utilisateurs dans sa société
- Valider les demandes utilisateurs de sa société
- Refuser les demandes utilisateurs de sa société
- Valider les demandes de création de site
- Refuser les demandes de création de site
- Réactiver les utilisateurs désactivés de sa société
- Demander la suppression d'un utilisateur

Ne peut pas :

- Nommer un référent
- Créer un ADMIN
- Créer un SUPER_ADMIN
- Supprimer définitivement un utilisateur
- Modifier la configuration globale

### ADMIN

Rôle interne à la plateforme.

Un ADMIN n'appartient à aucune société cliente.

Peut :

- Voir tous les utilisateurs
- Voir toutes les sociétés
- Voir tous les sites
- Créer des sociétés
- Modifier des sociétés
- Archiver des sociétés
- Restaurer des sociétés
- Créer des sites
- Modifier des sites
- Archiver des sites
- Restaurer des sites
- Gérer tous les utilisateurs
- Nommer des REFERENTS
- Supprimer définitivement des utilisateurs

Ne peut pas :

- Supprimer définitivement une société
- Modifier SMTP
- Modifier Microsoft Graph
- Modifier la sécurité globale
- Modifier la configuration globale

### SUPER_ADMIN

Le SUPER_ADMIN est le gestionnaire principal de la plateforme.

Il possède tous les droits.

Peut :

- Tout voir
- Tout modifier
- Tout archiver
- Tout restaurer
- Tout supprimer
- Gérer SMTP
- Gérer Microsoft Graph
- Gérer l'authentification
- Gérer la sécurité
- Gérer les paramètres globaux
- Nommer ou révoquer des ADMIN
- Nommer ou révoquer des SUPER_ADMIN

Toutes les suppressions définitives sont journalisées.

---

# Module Utilisateurs

## Objectif

Mettre en place une gestion complète des utilisateurs :

- Multi-rôles
- Multi-sociétés
- Multi-sites
- Validation administrative
- Invitations
- Gestion des référents
- Suppression contrôlée
- Traçabilité complète

---

## Architecture des rôles

Chaque utilisateur possède :

- Un rôle métier
- Un éventuel rôle de gouvernance

Exemples :

CLIENT + REFERENT
TECHNICIEN + ADMIN
COMMERCIAL + ADMIN
TECHNICIEN + SUPER_ADMIN

---

## États des utilisateurs

PENDING_EMAIL

Adresse e-mail non validée.

PENDING_APPROVAL

Validation administrative en attente.

ACTIVE

Utilisateur actif.

DISABLED

Utilisateur désactivé.

PENDING_DELETION

Suppression demandée et en attente de validation.

DELETED

Utilisateur supprimé définitivement.

---

## Cycle de vie

PENDING_EMAIL
↓
PENDING_APPROVAL
↓
ACTIVE
↓
DISABLED
↓
PENDING_DELETION
↓
DELETED

Transition interdite :

ACTIVE
↓
DELETED

---

## Gestion des utilisateurs actifs

### SUPER_ADMIN

- Accès à tous les utilisateurs

### ADMIN

- Accès à tous les utilisateurs

### REFERENT

- Accès uniquement aux utilisateurs de sa société

Actions disponibles :

- Consulter
- Modifier
- Désactiver

---

## Gestion des utilisateurs désactivés

### SUPER_ADMIN

- Consulter
- Réactiver
- Supprimer définitivement

### ADMIN

- Consulter
- Réactiver
- Supprimer définitivement

### REFERENT

- Consulter
- Réactiver
- Demander la suppression

---

## Demande de suppression

Workflow :

DISABLED
↓
Demande de suppression
↓
Commentaire obligatoire
↓
PENDING_DELETION
↓
Validation ADMIN ou SUPER_ADMIN
↓
DELETED

---

## Suppression définitive

Une suppression définitive :

- Est irréversible
- Ne peut pas être restaurée
- Génère obligatoirement un log

Informations enregistrées :

- Date
- Heure
- Utilisateur supprimé
- Auteur de la suppression
- Rôle de l'auteur
- Motif

---

## Invitations

Peuvent inviter :

- REFERENT
- ADMIN
- SUPER_ADMIN

Workflow :

Invitation
↓
Envoi e-mail
↓
Création du mot de passe
↓
Validation automatique de l'adresse e-mail
↓
Compte actif

Une invitation n'entre pas dans le workflow PENDING_APPROVAL.

---

## Gestion des adresses e-mail

Une modification d'adresse e-mail par :

- L'utilisateur
- Le REFERENT
- L'ADMIN
- Le SUPER_ADMIN

déclenche automatiquement :

email_verified = false

et

l'envoi d'un nouvel e-mail de validation.

---

## Protection contre les erreurs d'adresse e-mail

Lors d'un changement d'adresse :

- L'ancienne adresse reste utilisable temporairement
- La nouvelle adresse doit être validée

La bascule définitive est effectuée après validation de la nouvelle adresse.

---

## Demande de promotion REFERENT

Un CLIENT peut demander à devenir REFERENT.

Workflow :

CLIENT
↓
Demande REFERENT
↓
Commentaire obligatoire
↓
PENDING_REFERENT_APPROVAL
↓
Validation ADMIN ou SUPER_ADMIN
↓
Acceptation ou refus

En cas d'acceptation :

CLIENT + REFERENT

Un log est obligatoirement créé.

---

## Gestion des sociétés

Archivage d'une société :

SOCIETE
↓
ARCHIVED

Déclenche automatiquement :

- Archivage de tous les sites
- Désactivation de tous les utilisateurs associés

Aucun utilisateur ne doit devenir orphelin.

---

## Références

Les identifiants suivants ne sont jamais réutilisés :

- user_id
- company_id
- site_id

Cette règle reste valable même après suppression définitive.

---

## Journalisation obligatoire

Les opérations suivantes génèrent obligatoirement un log :

- Suppression utilisateur
- Nomination REFERENT
- Révocation REFERENT
- Nomination ADMIN
- Révocation ADMIN
- Nomination SUPER_ADMIN
- Révocation SUPER_ADMIN
- Suppression société
- Suppression site
- Changement d'adresse e-mail
- Validation de demande REFERENT
- Refus de demande REFERENT

# Module Sociétés

## État

✅ Terminé V1

---
## Contrat

Champs :

- contract_type
- sla_level

Types de contrat :

- AUCUN
- MSP
- FORFAIT
- REGIE
- PROJET

Niveaux SLA :

- STANDARD
- PREMIUM
- CRITIQUE

---

## Informations générales

- Référence client
- Nom
- Téléphone
- Email
- Rue
- Code postal
- Ville
- Pays
- SIRET
- Site Web
- Notes

---

## Archivage

Cycle de vie :

ACTIVE

↓

ARCHIVED

↓

RESTAURATION

Une référence client n'est jamais réutilisée.

Exemple :

CLI-000001

CLI-000002

CLI-000003

CLI-000004 (archivé)

CLI-000005

---

## Offres souscrites

Cases à cocher :

- Téléphonie
- Réseau
- Serveurs
- Sauvegardes
- Supervision

Modules obligatoires :

- Tickets
- Documentation
- Interventions
- Devis

---

# Module Tickets

Workflow :

NOUVEAU

↓

ACCEPTÉ

↓

EN COURS

↓

EN ATTENTE CLIENT

↓

EN ATTENTE FOURNISSEUR

↓

ESCALADÉ

↓

RÉSOLU

↓

CLOTURÉ

↓

REFUSÉ

Actions :

- Réaffectation
- Escalade
- Changement de statut
- Priorité
- Commentaires

---

# Module Interventions

## Objectif

Créer des bons d'intervention juridiquement traçables.

---

## Saisie technicien

Le technicien renseigne :

- Société
- Date intervention
- Heure début
- Heure fin
- Compte-rendu libre

Durée calculée automatiquement.

---

## Facturation

Champ obligatoire :

- Compris dans le contrat
- Facturable

---

## Workflow

BROUILLON

↓

EN ATTENTE CLIENT

↓

ACCEPTÉ

ou

REFUSÉ

↓

ARCHIVÉ

---

## Validation client

Le client reçoit une notification.

Peut :

- Accepter
- Refuser
- Mettre en attente

Le refus nécessite un commentaire.

---

## PDF

Création automatique :

Contient :

- Société
- Technicien
- Date
- Heure début
- Heure fin
- Durée
- Compte-rendu
- Statut
- Mode de facturation

---

## Traçabilité

Chaque bon possède :

- UUID
- Horodatage
- SHA256

Stockés définitivement.

---

## Archivage

Catégories :

- En attente
- Acceptées
- Refusées
- Archivées

Suppression interdite sauf SUPER_ADMIN.

---

# Module Documentation

Documentation = Coffre documentaire client.

Peut contenir :

- PDF
- Word
- Excel
- PowerPoint
- ZIP
- Scripts
- Programmes
- Contrats
- Configurations
- Exports
- Photos

---

## Arborescence libre

Exemples :

- Réseau
- Téléphonie
- Contrats
- Scripts
- Procédures
- Microsoft 365
- Mailinblack
- RG System

---

# Module Devis

Module obligatoire.

---

## Gestion

Responsable principal :

COMMERCIAL

---

## Dépôt

PDF directement dans la société.

---

## Notification client

Envoi automatique d'un email.

---

## Actions client

- Accepter
- Refuser
- Mettre en attente

---

## Workflow

BROUILLON

↓

ENVOYÉ

↓

CONSULTÉ

↓

EN ATTENTE

↓

ACCEPTÉ

↓

REFUSÉ

↓

ARCHIVÉ

---

## Droits de suppression

CLIENT

- Aucun

TECHNICIEN

- Aucun

COMMERCIAL

- Suppression uniquement des brouillons

SUPER_ADMIN

- Suppression complète autorisée

---

# Interface Administrateur

Vue CRM.

Disposition :

- Liste à gauche
- Fiche à droite

Zones :

- Informations générales
- Offres souscrites
- Sociétés archivées
- Archivage
- Restauration

---

# Interface Technicien

Sélection société :

Société :
[ Dupont Informatique ▼ ]

Le menu est généré automatiquement.

Exemple :

Dashboard

Tickets

Téléphonie

Réseau

Sauvegardes

Documentation

Interventions

Les services non souscrits sont masqués.

---

# Interface Commercial

Accès :

- Lecture
- Devis

Peut :

- Déposer un devis PDF
- Suivre son état
- Consulter l'historique

---

# Interface Client

Menu généré selon :

- Société associée
- Services souscrits

Exemple :

Mes services

Téléphonie

Documentation

Mes tickets

Mes interventions

Mes devis

---

# Sécurité

À développer

- JWT
- Middleware Auth
- Contrôle des rôles
- Permissions fines
- Menus dynamiques

---

# Priorités de développement

## Phase 1

✅ Sociétés

✅ Archivage

✅ Restauration

✅ Utilisateurs lecture

---

## Phase 2

- JWT
- Authentification
- Gestion des rôles
- Menus dynamiques

---

## Phase 3

- Offres souscrites
- Table company_services

---

## Phase 4

- Utilisateurs V2

Champs supplémentaires :

- language
- theme
- force_password_change
- last_login
- is_active

---

## Phase 5

- Tickets

---

## Phase 6

- Interventions

---

## Phase 7

- Devis

---

## Phase 8

- Documentation

---

# Vision Long Terme

Modules futurs :

- Microsoft 365
- Azure
- AWS
- PRA / PCA
- Cybersécurité
- Gestion de parc
- Inventaire matériel
- Gestion licences
- CMDB
- Téléphonie Teams
- Gestion fournisseurs
- KPI MSP

Le cœur du logiciel ne doit jamais être modifié pour ajouter un nouveau module.

# Authentification

## Compte racine

Lors de l'installation de la plateforme :

- Un compte SUPER_ADMIN initial est créé.
- Un mot de passe temporaire est généré.
- Le changement du mot de passe est obligatoire à la première connexion.
- Une adresse e-mail valide doit obligatoirement être renseignée.
- L'activation OTP est fortement recommandée.

Ce compte permet ensuite de créer les autres ADMIN et SUPER_ADMIN.

## Login V2

- [ ] Fond personnalisé administrable
- [ ] Logo personnalisable
- [ ] Vérification adresse e-mail
- [ ] Vérification mot de passe
- [ ] Gestion des tentatives échouées
- [ ] Blocage automatique après plusieurs échecs
- [ ] Support OTP
- [ ] Support Google Authenticator
- [ ] Support MFA optionnelle
- [ ] Authentification JWT
- [ ] Déconnexion automatique
- [ ] Gestion des sessions

## Interface Login V3

- [ ] Fond personnalisé administrable
- [ ] Logo personnalisable
- [ ] Écran e-mail
- [ ] Vérification email MariaDB
- [ ] Animation email → mot de passe
- [ ] Vérification mot de passe
- [ ] Affichage tentatives restantes
- [ ] Blocage après plusieurs échecs
- [ ] Animation shake sur erreur
- [ ] OTP conditionnel
- [ ] Animation OTP → Dashboard
- [ ] Responsive mobile
- [ ] Compatible i18n

# Interface utilisateur

## Sidebar

- [x] Mode réduit
- [x] Icônes Lucide
- [x] Badge rôle utilisateur
- [x] Design modernisé
- [ ] Upload logo
- [ ] Gestion du logo depuis Configuration
- [ ] État actif avancé
- [ ] Tooltips en mode réduit

## Dashboard

- [ ] Dashboard Super Admin
- [ ] Dashboard Admin
- [ ] Dashboard Commercial
- [ ] Dashboard Technicien
- [ ] Dashboard Client


## [En développement]

### Ajouté

- Refonte complète de la sidebar
- Support du mode réduit
- Intégration Lucide React
- Nouveau badge de rôle utilisateur
- Ajout du bouton de repli de la navigation
- Modernisation du design global
- Préparation du système de rôles dynamiques

### Modifié

- Refonte visuelle de la navigation principale
- Amélioration de l'expérience utilisateur
- Préparation de l'authentification multi-étapes

### Prévu

- Nouvelle interface de connexion animée
- Support OTP
- Support MFA
- Fond personnalisable
- Tableau de bord dynamique selon le rôle

## Validation nouveau site

Si la société existe :

- REFERENT
- ADMIN
- SUPER_ADMIN

peuvent valider.

Si la société n'existe pas :

- ADMIN
- SUPER_ADMIN

peuvent valider.

# Administration des utilisateurs

## Utilisateurs en attente

Visible pour :

- REFERENT
- ADMIN
- SUPER_ADMIN

Actions :

- Consulter
- Valider
- Refuser

## Utilisateurs actifs

Visible selon les permissions.

Actions :

- Consulter
- Modifier
- Désactiver

## Utilisateurs désactivés

Visible selon les permissions.

Actions :

- Réactiver
- Demander suppression
- Supprimer définitivement

