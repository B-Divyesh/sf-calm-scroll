import { defineBackground } from 'wxt/utils/define-background';

export default defineBackground(() => {
  // The service worker intentionally has no remote work. Its presence keeps
  // extension lifecycle and browser-level tests observable without tracking.
});
