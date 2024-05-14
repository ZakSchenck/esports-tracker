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

export const useSwappedApiData = defineStore('reloadData', {
  state: () => ({
    isDataChanged: false,
    searchedTeam: null,
  }),
  getters: {
    getDataChanged: (state) => state.isDataChanged,
    getSearchedTeam: (state) => state.searchedTeam
  },
  actions: {
    setDataChangedTrue() {
      this.isDataChanged =  true;
    },
    setDataChangedFalse() {
      this.isDataChanged =  false;
    },
    setSearchedTeam(team) {
      this.searchedTeam =  team;
    }
  }
})