🤖 **Api-Assistant** is a modern web application that allows you to discover, search, and save your favorite public APIs from GitHub. Instantly explore trending APIs, filter by keywords, and manage your personal list of favorites.

## Features

- 🔍 **Search & Discover:** Find public APIs from GitHub with powerful search and filtering.
- ⭐ **Favorites:** Save APIs to your personal favorites list.
- 🕑 **History:** Quickly access your recently viewed APIs.
- 🌓 **Dark/Light Theme:** Switch between light and dark mode.
- 🔐 **Authentication:** Sign up and log in with email, Google, or GitHub.
- 🧑 **Profile:** Manage your user profile and see your favorite APIs.

## Tech Stack

- **React 19**
- **Vite** (for fast development)
- **Tailwind CSS** (for styling)
- **Firebase** (authentication & storage)
- **React Router v7**
- **Lucide React** (icons)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Api-Assistant.git
cd Api-Assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password, Google, GitHub).
3. Copy your Firebase config and replace it in `src/firebase/firebase.js`.

### 4. Start the development server

```bash
npm run dev
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint the code

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Api-Assistant** is in active development. Feel free to contribute or suggest features!