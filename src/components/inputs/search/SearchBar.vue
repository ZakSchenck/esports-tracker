<script setup>
import { ref, onMounted } from 'vue'
import { useToggleSearchBar } from '../../../stores/store.js'
import { useSwappedApiData } from '../../../stores/store.js'
const swappedApiData = useSwappedApiData();
const toggleSearchBar = useToggleSearchBar();

const searchBarContent = ref('')
const filteredTeamsResult = ref([])
const selectedTeam = ref('')

// Toggles search bar
function removeSearchBarToggle() {
  toggleSearchBar.toggle()
}


/**
 * Sets selected team from search to ref
 * @param {String} team 
 */
function setSelectedTeam(team) {
  selectedTeam.value = team;
  swappedApiData.setDataChangedTrue();
  swappedApiData.setSearchedTeam(team);
}
 
function onSearchType() {
  const teamKeys = [
    'Los Angeles Guerillas',
    'Miami Heretics',
    'Minnesota RØKKR',
    'Boston Breach',
    'Los Angeles Thieves',
    'Atlanta FaZe',
    'Toronto Ultra',
    'OpTic Texas',
    'Carolina Royal Ravens',
    'New York Subliners',
    'Las Vegas Legion',
    'Seattle Surge'
  ]
  const filteredTeams = teamKeys.filter((key) =>
    key.toLowerCase().includes(searchBarContent.value.toLowerCase())
  )
  filteredTeamsResult.value = filteredTeams
}
</script>

<template>
  <div @click="removeSearchBarToggle" v-if="toggleSearchBar.searchBar">
    <div class="search-bar__bg"></div>
    <input
      placeholder="Search for specific teams..."
      type="text"
      @click.stop
      v-model="searchBarContent"
      @input="onSearchType"
    />
    <div v-if="searchBarContent" class="search-bar__results-container">
      <div @click="setSelectedTeam(team)" v-for="team in filteredTeamsResult" :key="team">
        <p>{{ team }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input {
  position: fixed;
  z-index: 4;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #25262b;
  color: #5c5f65;
  border: none;
  outline: none;
  padding: 12px 12px 12px 52px;
  height: 52px;
  width: 600px;
  font-size: 26px;
  font-weight: 100px;
  background-image: url('https://img.icons8.com/?size=100&id=7695&format=png'); /* Replace 'icon.png' with the path to your image */
  background-repeat: no-repeat;
  background-position: 10px center; /* Adjust the position of the icon */
  background-size: 32px 32px;
  filter: invert(90%) grayscale(50%);
}

.search-bar__results-container {
  position: absolute;
  top: 172px;
  left: 50%;
  background-color: #25262b;
  transform: translateX(-50%);
  color: rgb(89, 89, 89);
  z-index: 100;
  background-color: rgb(149, 149, 149);
  width: 600px;
  padding: 12px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  pointer-events: none;
  hr {
    margin: 12px 0 12px 0;
    background-color: rgb(183, 183, 183);
    outline: none;
    border: none;
    height: 1px;
  }
  p {
    font-weight: 400;
    font-size: 20px;
  }
  div {
    pointer-events: auto;
    cursor: pointer;
    color: white;
    &:hover {
      color: rgb(220, 37, 37);
    }
  }
}

.search-bar__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(4px);
  z-index: 3;
}
</style>../../../stores/store.js