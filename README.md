# TP2 - API REST Express

## Lancer le serveur

```bash
cd backend
npm install
node server.js
```

Le serveur démarre sur `http://localhost:3001`.

## Routes

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/users` | Récupérer tous les utilisateurs |
| GET | `/api/users/:id` | Récupérer un utilisateur par id |
| POST | `/api/users` | Créer un utilisateur |
| PUT | `/api/users/:id` | Modifier un utilisateur |
| DELETE | `/api/users/:id` | Supprimer un utilisateur |

## Codes de réponse

- `200` — Succès
- `201` — Créé
- `204` — Supprimé
- `400` — Champs manquants (name ou email)
- `404` — Utilisateur non trouvé
- `409` — Email déjà utilisé
