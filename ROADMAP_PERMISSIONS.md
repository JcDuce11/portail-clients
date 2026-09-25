# Portail MSP - Rôles et Permissions

⚠️ Les modules système (Contrats, Documentation, Interventions, Tickets, Devis, Services souscrits, Utilisateurs) ne doivent jamais être désactivables.

## Modules système (toujours présents)

Ces modules sont obligatoires pour toutes les sociétés.

- Contrats
- Documentation
- Interventions
- Tickets
- Devis
- Services souscrits
- Utilisateurs

Règles :

✅ Toujours actifs

❌ Impossible à désactiver

❌ Impossible à supprimer

❌ N'apparaissent pas dans les services souscrits

---

## Modules métier (activables)

Ces modules sont liés à un site.

- Téléphonie
- Réseau
- Serveurs
- Sauvegardes
- Supervision

Règles :

✅ Activables

✅ Désactivables

✅ Gérés par ADMIN et SUPER_ADMIN

❌ Non gérés par les techniciens

---

# Rôles

## SUPER_ADMIN

Accès total.

### Sociétés

✅ Créer

✅ Modifier

✅ Archiver

✅ Restaurer

✅ Supprimer définitivement

### Sites

✅ Créer

✅ Modifier

✅ Archiver

✅ Restaurer

✅ Supprimer définitivement

### Utilisateurs

✅ Gestion complète

### Modules

✅ Activer

✅ Désactiver

### Sécurité

✅ Paramètres globaux

✅ Politique de mot de passe

✅ Authentification

✅ Traductions

---

## ADMIN

Gestion opérationnelle.

### Sociétés

✅ Créer

✅ Modifier

✅ Archiver

✅ Restaurer

### Sites

✅ Créer

✅ Modifier

✅ Archiver

✅ Restaurer

### Modules

✅ Activer

✅ Désactiver

### Contrats / SLA

✅ Modifier

### Utilisateurs

✅ Gérer

Restrictions :

❌ Suppression définitive

❌ Paramètres globaux

❌ Configuration sécurité

---

## TECHNICIEN

Travaille dans les modules activés.

### Modules système

✅ Documentation

✅ Interventions

✅ Tickets

### Modules métier

✅ Téléphonie

✅ Réseau

✅ Serveurs

✅ Sauvegardes

✅ Supervision

Restrictions :

❌ Activer un module

❌ Désactiver un module

❌ Modifier les contrats

❌ Modifier les SLA

❌ Gestion des utilisateurs

Important :

Le technicien travaille dans les modules activés.

Le technicien ne décide jamais si un module est souscrit par le client ou non.

---

## COMMERCIAL

Gestion commerciale.

### Accès

✅ Sociétés

✅ Sites

✅ Contrats

✅ Devis

✅ Services souscrits

✅ Tickets (consultation)

Restrictions :

❌ Documentation

❌ Téléphonie

❌ Réseau

❌ Serveurs

❌ Sauvegardes

❌ Supervision

❌ Utilisateurs

---

## CLIENT

Accès limité à sa société.

### Accès

✅ Contrats

✅ Devis

✅ Tickets

✅ Interventions

✅ Services souscrits

Restrictions :

❌ Documentation

❌ Utilisateurs

❌ Administration

❌ Archivage

❌ Paramètres

Important :

Le client ne doit jamais voir :

- Documentation technique
- Mots de passe
- Adresses IP
- VLAN
- VPN
- Firewall
- Schémas d'infrastructure
- Procédures internes
- Informations réservées aux techniciens

---

# Permissions futures

## Gestion des modules

Permission :

MANAGE_SITE_MODULES

Attribuée à :

- SUPER_ADMIN
- ADMIN

---

## Utilisation des modules

Permissions :

- USE_TELEPHONY
- USE_NETWORK
- USE_SERVERS
- USE_BACKUP
- USE_SUPERVISION

Attribuées selon les compétences du technicien.

---

# Règles métier

## Archivage société

Archiver une société archive automatiquement tous ses sites.

---

## Restauration société

Restaurer une société restaure automatiquement tous ses sites.

---

## Archivage site

Possible uniquement si la société est active.

---

## Restauration site

Possible uniquement si la société est active.

---

## Société archivée

Un site appartenant à une société archivée ne peut pas être restauré.

Affichage :

🔒 Société archivée

---

# Architecture cible

Société

- Contrats
- Documentation
- Interventions
- Tickets
- Devis
- Services souscrits
- Utilisateurs

Sites

- Coordonnées
- Téléphonie
- Réseau
- Serveurs
- Sauvegardes
- Supervision

---

# Roadmap

1. Authentification

2. Utilisateurs

3. Rôles

4. Permissions

5. Menus dynamiques

6. Tickets

7. Téléphonie

8. Réseau

9. Serveurs

10. Sauvegardes

11. Supervision

---

# Authentification (future)

Connexion :

- Identifiant ou email
- Mot de passe
- Mot de passe oublié
- Se souvenir de moi

Politique configurable :

- Longueur minimale
- Majuscule obligatoire
- Minuscule obligatoire
- Chiffre obligatoire
- Caractère spécial obligatoire
- Expiration du mot de passe

Gestion par :

SUPER_ADMIN