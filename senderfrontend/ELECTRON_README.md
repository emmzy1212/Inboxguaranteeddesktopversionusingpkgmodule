# Electron Desktop App Setup

This document explains how to run and build the SenderApp as a desktop application using Electron.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

### Option A: Run Electron with Vite Dev Server (Recommended)
This starts the Vite development server and launches Electron, allowing hot reloading.

```bash
npm run dev:electron
```

### Option B: Run Full Stack (Frontend + Backend + Electron)
If you want to run the backend locally as well:

```bash
npm run dev:full
```

### Option C: Manual Development
1. Start Vite dev server:
```bash
npm run dev
```

2. In another terminal, start Electron:
```bash
npm run electron-dev
```

## Production Build

### Build for Current Platform
```bash
npm run electron-build
```

### Build for Specific Platforms
```bash
# Windows
npm run electron-build-win

# macOS
npm run electron-build-mac

# Linux
npm run electron-build-linux
```

## Project Structure

```
senderfrontend/
├── electron/
│   ├── main.cjs          # Electron main process
│   ├── preload.cjs       # Secure bridge to renderer
│   └── config.js         # Electron configuration
├── src/
│   └── utils/
│       └── electron.js   # Electron utilities for React app
├── dist/                 # Built frontend (generated)
└── release/              # Packaged apps (generated)
```

## Configuration

### Backend Connection

The app automatically detects the environment:

- **Development**: Connects to `http://localhost:5000`
- **Production**: Connects to your Render backend URL

To change the production backend URL, update `vite.config.js`:

```javascript
target: 'https://your-actual-render-url'
```

### Window Settings

Window size and behavior can be configured in `electron/config.js`.

## Security

- `nodeIntegration: false` - Prevents direct Node.js access from renderer
- `contextIsolation: true` - Isolates renderer from main process
- Preload script provides secure API bridge

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure port 5173 is available for Vite
2. **Backend connection**: Ensure backend is running on port 5000 in development
3. **Build failures**: Clear `node_modules` and reinstall if build fails

### Development Tips

- Use `Ctrl+Shift+I` (or `Cmd+Option+I` on Mac) to open DevTools
- Hot reloading works for React changes
- Restart Electron for main process changes

## Distribution

Built applications are saved in the `release/` folder. The executables can be distributed directly to users.

## Backend Options

### Option A: Hosted Backend (Recommended)
- Backend remains on Render/Vercel
- Electron app communicates via HTTP API
- No local backend required

### Option B: Local Backend
- Backend runs inside Electron main process
- Useful for offline functionality
- Requires additional setup (not implemented yet)

## API Usage in React Components

```javascript
import { isElectron, minimizeWindow, getPlatform } from '../utils/electron';

// Check if running in Electron
if (isElectron()) {
  // Add window controls
  const handleMinimize = () => minimizeWindow();
}

// Get platform info
const platform = await getPlatform();
```