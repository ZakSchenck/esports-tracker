import { defineStore } from 'pinia'

export const useToggleMatches = defineStore('matchToggle', {
  state: () => ({
    isCompletedMatches: false
  }),
  getters: {
    completed: (state) => state.isCompletedMatches,
  },
  actions: {
    toggle() {
      this.isCompletedMatches = !this.isCompletedMatches;
    },
  }
});