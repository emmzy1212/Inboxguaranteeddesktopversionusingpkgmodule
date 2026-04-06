// Utility to detect if running in Electron
export const isElectron = () => {
  // Check if running in Electron
  return typeof window !== 'undefined' && window.electronAPI !== undefined;
};

// Get Electron API if available
export const electronAPI = () => {
  if (isElectron()) {
    return window.electronAPI;
  }
  return null;
};

// Platform detection
export const getPlatform = async () => {
  if (isElectron()) {
    return await window.electronAPI.getPlatform();
  }
  return navigator.platform;
};

// App version
export const getAppVersion = async () => {
  if (isElectron()) {
    return await window.electronAPI.getAppVersion();
  }
  return 'web';
};

// Window controls (only work in Electron)
export const minimizeWindow = () => {
  if (isElectron()) {
    window.electronAPI.minimizeWindow();
  }
};

export const maximizeWindow = () => {
  if (isElectron()) {
    window.electronAPI.maximizeWindow();
  }
};

export const closeWindow = () => {
  if (isElectron()) {
    window.electronAPI.closeWindow();
  }
};

// Check if running in Electron using the utils object
export const isRunningInElectron = () => {
  return typeof window !== 'undefined' && window.electronUtils?.isElectron === true;
};