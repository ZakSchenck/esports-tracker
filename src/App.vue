<script setup>
import Header from './components/nav/Header.vue'
import MatchesSection from './components/matches/MatchesSection.vue'
import SidebarContainer from './components/nav/SidebarContainer.vue'
import SearchBar from './components/inputs/search/SearchBar.vue'
</script>

<template>
  <main>
    <Header />
    <div class="app__main-page-container">
      <SidebarContainer />
      <MatchesSection />
    </div>
    <SearchBar />
  </main>
</template>

<style lang="scss" scoped>
.app__main-page-container {
  display: flex;
  flex-direction: row;
  gap: 220px;
  width: 100%;
}
</style>
