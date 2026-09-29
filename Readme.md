# 🌦️ Météo en direct

Une application météo en temps réel, avec recherche par ville ou géolocalisation automatique, prévisions sur 7 jours, et une interface colorée et animée.

## ✨ Fonctionnalités

- 🔍 Recherche de la météo par nom de ville
- 📍 Géolocalisation automatique au chargement de la page
- 🌡️ Météo actuelle : température, vent, humidité, indice UV
- 📅 Prévisions sur 7 jours (températures min/max)
- 🕐 Heure locale de la ville recherchée
- ⚠️ Gestion des erreurs (ville introuvable, service indisponible)
- 🎨 Interface colorée avec dégradé animé

## 🛠️ Stack technique

**Backend**
- [Python](https://www.python.org/) avec [FastAPI](https://fastapi.tiangolo.com/)
- [Requests](https://requests.readthedocs.io/) pour les appels à l'API météo
- [Uvicorn](https://www.uvicorn.org/) comme serveur ASGI

**Frontend**
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) comme outil de build

**API météo**
- [Open-Meteo](https://open-meteo.com/) — API gratuite, sans clé requise, pour le géocodage et les données météorologiques

## 📁 Structure du projet

```
Weather/
├── Backend/
│   └── main.py              # API FastAPI (géocodage + météo)
└── Frontend/
    └── weather-frontend/
        ├── index.html
        └── src/
            ├── main.ts       # Logique de l'application
            └── style.css     # Styles
```

## 🚀 Installation et lancement

### Prérequis

- [Python 3](https://www.python.org/downloads/) installé
- [Node.js](https://nodejs.org/) installé (inclut npm)

### Backend

```bash
cd Backend
pip install fastapi uvicorn requests
python3 -m uvicorn main:app --reload
```

Le serveur backend tourne sur `http://127.0.0.1:8000`.

### Frontend

Dans un second terminal :

```bash
cd Frontend/weather-frontend
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173` (le port peut varier selon disponibilité).

## 📡 Routes de l'API

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/weather/{ville}` | Météo actuelle et prévisions pour une ville donnée |
| `GET` | `/weather/coords?lat={lat}&lon={lon}` | Météo actuelle et prévisions pour des coordonnées données |

La documentation interactive complète de l'API est disponible sur `http://127.0.0.1:8000/docs` une fois le backend lancé.

## 📝 Notes

- L'API Open-Meteo ne nécessite aucune clé d'authentification, l'application fonctionne donc sans configuration de variables d'environnement.
- Le CORS doit être configuré côté backend pour autoriser l'origine du frontend (voir `main.py`).

## 👤 Auteur

Projet réalisé par Joshua Fournet-Fayard dans le cadre de l'apprentissage de Python, FastAPI et TypeScript.