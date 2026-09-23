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

## Services Souscrits

Implémentation backend terminée :

- services
- company_services
- GET /services
- GET /companies/:id/services
- PUT /companies/:id/services

---

# Principes d'architecture

Principes fondamentaux :

- Architecture modulaire.
- Les nouveaux modules ne doivent jamais casser le cœur du logiciel.
- Les identifiants sociétés ne sont jamais réutilisés.
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

## SUPER_ADMIN

Accès total.

Peut :

- Créer
- Modifier
- Archiver
- Restaurer
- Supprimer définitivement

Accès complet à toutes les sociétés.

---

## ADMIN

Gestion opérationnelle.

Peut :

- Gérer les sociétés
- Gérer les utilisateurs
- Gérer les tickets
- Gérer les interventions
- Gérer les devis

Ne peut pas supprimer définitivement.

---

## TECHNICIEN

Gestion technique.

Peut :

- Gérer les tickets
- Créer les interventions
- Alimenter la documentation
- Modifier les informations techniques
- Escalader les tickets
- Modifier les statuts

Ne peut pas :

- Modifier les offres souscrites
- Modifier les contrats
- Supprimer des devis

---

## COMMERCIAL

Accès en lecture.

Peut :

- Consulter les sociétés
- Consulter les tickets
- Consulter les interventions
- Consulter la documentation
- Déposer des devis PDF

Ne peut pas :

- Modifier les infrastructures
- Modifier les contrats techniques
- Modifier les offres souscrites

---

## CLIENT

Accès limité à sa société uniquement.

Peut :

- Consulter ses offres
- Ouvrir des tickets
- Consulter sa documentation
- Valider ses devis
- Valider ses interventions

---

# Module Sociétés

## État

✅ Terminé V1

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

# Module Utilisateurs

## V2 à développer

Champs :

- Nom
- Prénom
- Email
- Mot de passe
- Société associée
- Rôle
- Actif / Inactif

Relation :

Utilisateur

↓

Société

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