const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App information
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),

  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),

  // Add more APIs as needed for your application
  // For example, if you need to communicate with the backend:
  // makeBackendRequest: (endpoint, data) => ipcRenderer.invoke('backend-request', endpoint, data),

  // Listen for events from main process
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
  onUpdateDownloaded: (callback) => ipcRenderer.invoke('update-downloaded', callback),
});

// Expose utilities
contextBridge.exposeInMainWorld('electronUtils', {
  isElectron: true,
  platform: process.platform,
});