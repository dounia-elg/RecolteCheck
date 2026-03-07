# 🌾 RécolteCheck

Application mobile développée avec **React Native** et **Firebase** permettant aux agriculteurs de gérer leurs parcelles et de suivre leurs récoltes de manière simple et centralisée.

---

## 📋 Description du projet

Le secteur agricole repose encore largement sur des méthodes traditionnelles (cahiers papier, notes informelles). RécolteCheck digitalise cette gestion en proposant une application mobile intuitive, utilisable sur **Android et iOS**, adaptée aux utilisateurs peu technophiles.

### Fonctionnalités principales

- 🔐 **Authentification** — Inscription et connexion via Firebase Authentication
- 🗺️ **Gestion des parcelles** — Ajout, consultation et suppression des parcelles agricoles (nom, surface, culture, période de récolte)
- 🌾 **Suivi des récoltes** — Enregistrement des récoltes par zone avec date et poids
- 👤 **Profil agriculteur** — Visualisation du compte et déconnexion
- ☁️ **Synchronisation cloud** — Toutes les données sont stockées et synchronisées via Firebase Firestore

---

## 🏗️ Architecture de l'application

```
RecolteCheck/
├── app/                          # Écrans de l'application (routing basé sur les fichiers)
│   ├── _layout.tsx               # Layout racine + garde d'authentification Firebase
│   ├── login.tsx                 # Écran de connexion
│   ├── register.tsx              # Écran d'inscription
│   ├── ajouterParcelle.tsx       # Formulaire d'ajout d'une parcelle
│   ├── ajouterRecolte.tsx        # Formulaire d'ajout d'une récolte
│   └── (tabs)/                   # Écrans principaux avec barre de navigation
│       ├── _layout.tsx           # Configuration de la barre d'onglets
│       ├── parcelles.tsx         # Liste des parcelles
│       ├── recoltes.tsx          # Liste des récoltes
│       └── profil.tsx            # Profil utilisateur + déconnexion
│
├── src/
│   ├── config/
│   │   └── firebase.ts           # Initialisation Firebase (Auth + Firestore)
│   └── services/
│       ├── authService.ts        # Fonctions : register, login, logout
│       ├── parcelleService.ts    # Fonctions Firestore : getParcelles, addParcelle, deleteParcelle
│       └── recolteService.ts     # Fonctions Firestore : getRecoltes, addRecolte, deleteRecolte
│
└── assets/                       # Images et icônes de l'application
```

### Flux de navigation

```
Lancement de l'app
       │
       ▼
  _layout.tsx  ──── utilisateur connecté ? ──── OUI ──▶ (tabs)/parcelles
       │
      NON
       │
       ▼
  register.tsx  ◀──────────────────────▶  login.tsx
       │                                      │
       └──────────────────────────────────────┘
                          │
                          ▼
                  (tabs)/parcelles  ──▶  ajouterParcelle
                  (tabs)/recoltes   ──▶  ajouterRecolte
                  (tabs)/profil     ──▶  déconnexion
```

---

## 🧰 Dépendances externes et leur rôle

| Dépendance | Version | Rôle |
|---|---|---|
| `expo` | ~54.0 | Framework principal pour le développement React Native multiplateforme |
| `expo-router` | ~6.0 | Navigation basée sur les fichiers (comme Next.js mais pour mobile) |
| `firebase` | ^12.9 | Backend cloud : authentification (Firebase Auth) + base de données (Firestore) |
| `@expo/vector-icons` | ^15.0 | Bibliothèque d'icônes (Ionicons utilisé dans toute l'app) |
| `react-native` | 0.81.5 | Framework de base pour créer des interfaces mobiles natives |
| `react-native-screens` | ~4.16 | Optimisation des performances de navigation |
| `react-native-safe-area-context` | ~5.6 | Gestion des zones sécurisées (encoche, barre de statut) |
| `react-native-gesture-handler` | ~2.28 | Gestion des gestes tactiles pour la navigation |
| `react-native-reanimated` | ~4.1 | Animations fluides |
| `@react-navigation/native` | ^7.1 | Système de navigation sous-jacent utilisé par expo-router |

---

## ⚙️ Guide d'installation et de configuration

### Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [Expo Go](https://expo.dev/go) installé sur votre téléphone **ou** un émulateur Android/iOS configuré
- Un compte [Firebase](https://firebase.google.com/)

### Étape 1 — Cloner et installer les dépendances

```bash
git clone <url-du-repo>
cd RecolteCheck
npm install
```

### Étape 2 — Configurer Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet
3. Activez **Authentication** → méthode **Email/Mot de passe**
4. Activez **Firestore Database**
5. Copiez la configuration Firebase dans `src/config/firebase.ts`

```ts
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  storageBucket: "VOTRE_PROJET.appspot.com",
  messagingSenderId: "VOTRE_ID",
  appId: "VOTRE_APP_ID",
};
```

### Étape 3 — Configurer les règles Firestore

Dans Firebase Console → Firestore Database → **Rules**, collez :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /parcelles/{id} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    match /recoltes/{id} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

### Étape 4 — Démarrer l'application

```bash
npx expo start
```

Puis :
- **Sur téléphone** : scannez le QR code avec l'application Expo Go
- **Sur émulateur Android** : appuyez sur `a` dans le terminal
- **Sur simulateur iOS** : appuyez sur `i` dans le terminal (macOS uniquement)

---

## 📱 Captures d'écran

| Inscription | Parcelles | Récoltes | Profil |
|---|---|---|---|
| Formulaire d'inscription avec validation | Liste des parcelles avec ajout/suppression | Historique des récoltes par zone | Informations du compte + déconnexion |

---

## 👨‍💻 Développé avec

- **React Native** + **Expo** — Application mobile cross-platform
- **Firebase** — Authentification et stockage des données cloud
- **TypeScript** — Typage statique pour un code plus fiable
- **Expo Router** — Navigation déclarative basée sur les fichiers
