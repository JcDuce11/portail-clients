# CHANGELOG

## v0.1.0 - Fondation du projet

### Base technique

- Initialisation du projet React + Vite
- Mise en place du backend NodeJS + Express
- Configuration MariaDB
- Configuration Git et GitHub

---

### Authentification

- Création des rôles
- Création des utilisateurs
- Mise en place JWT V1
- Développement de la connexion utilisateur

---

### Module Sociétés V1

#### Création

- Création des sociétés
- Génération automatique des références client

Exemple :

CLI-000001

CLI-000002

CLI-000003

---

#### Informations générales

Ajout des champs :

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

#### Gestion

- Liste des sociétés
- Fiche société
- Modification des données
- Sauvegarde MariaDB

---

#### Archivage

- Archivage logique
- Conservation de l'historique
- Statut ACTIVE / ARCHIVED
- Références jamais réutilisées

---

#### Restauration

- Liste des sociétés archivées
- Restauration d'une société
- Retour automatique dans la liste active

---

### Module Utilisateurs V1

- API utilisateurs
- Liste des utilisateurs
- Liaison société ↔ utilisateur

---

### Documentation Projet

Ajout :

- README.md
- ROADMAP.md
- CHANGELOG.md

---

# v0.2.0 - En préparation

## Sécurité

À développer :

- JWT complet
- Middleware Auth
- Sessions utilisateurs
- Gestion avancée des rôles
- Contrôle des permissions

---

## Services Souscrits

À développer :

- Téléphonie
- Réseau
- Serveurs
- Sauvegardes
- Supervision

Gestion dynamique des menus selon :

- la société sélectionnée
- les services souscrits
- le rôle utilisateur

---

## Utilisateurs V2

Prévu :

- Création utilisateur
- Modification utilisateur
- Activation / Désactivation
- Gestion des rôles
- Rattachement société

---

## Tickets

Prévu :

- Création
- Attribution
- Priorité
- Escalade
- Historique
- Statuts

---

## Interventions

Prévu :

- Bon d'intervention
- Validation technicien
- Validation client
- PDF automatique
- Horodatage
- UUID
- SHA256
- Gestion Accepté / Refusé

---

## Documentation

Prévu :

- Coffre documentaire client
- Gestion des dossiers
- Upload de documents
- Versionning

---

## Devis

Prévu :

- Dépôt PDF
- Notification client
- Validation
- Refus
- Mise en attente
- Historique

---

# Vision produit

Plateforme modulaire MSP / ESN destinée à gérer :

- Sociétés
- Utilisateurs
- Tickets
- Interventions
- Documentation
- Devis
- Services souscrits

Architecture :

- Modulaire
- Évolutive
- Multi-clients
- Multi-rôles
- Facilement extensible

## v0.1.1

### Services souscrits

Ajout :

- table services
- table company_services

Services :

- Téléphonie
- Réseau
- Serveurs
- Sauvegardes
- Supervision

API :

- GET /services
- GET /companies/:id/services
- PUT /companies/:id/services

Objectif :

Préparer les menus dynamiques
Technicien / Commercial / Client.