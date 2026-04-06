// Electron configuration
const config = {
  // Window settings
  window: {
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
  },

  // Development settings
  development: {
    vitePort: 5173,
    backendPort: 5000,
  },

  // Security settings
  security: {
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
  },

  // Build settings
  build: {
    appId: 'com.senderapp.desktop',
    productName: 'SenderApp',
    outputDir: 'release',
  },
};

module.exports = config;