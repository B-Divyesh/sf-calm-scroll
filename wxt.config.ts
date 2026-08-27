import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: '.',
  outDir: '.output',
  publicDir: 'extension-public',
  manifest: {
    name: 'Calm Scroll',
    description: 'Freeze distracting page motion and keep ordinary web pages readable.',
    version: '1.0.0',
    permissions: ['storage', 'activeTab'],
    host_permissions: ['http://*/*', 'https://*/*'],
    action: {
      default_title: 'Calm Scroll'
    },
    icons: {
      16: 'icons/icon-16.png',
      32: 'icons/icon-32.png',
      48: 'icons/icon-48.png',
      128: 'icons/icon-128.png'
    },
    browser_specific_settings: {
      gecko: {
        id: 'calm-scroll@sociobot.in',
        strict_min_version: '109.0'
      }
    }
  },
  vite: () => ({
    build: { target: 'es2022' }
  })
});
