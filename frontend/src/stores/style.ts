import { defineStore } from 'pinia';

export const useStyleStore = defineStore('style', {
  state: () => ({
    showTitle: <boolean>true,
    showLyrics: <boolean>true,
    showButtons: <boolean>true,
  }),
});
