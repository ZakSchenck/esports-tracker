<script setup>
import { useToggleSearchBar } from '../../stores/store.js'
const toggleSearchBar = useToggleSearchBar();
import SidebarNavlink from './SidebarNavlink.vue'
import { useSwappedApiData } from '../../stores/store.js'
const swappedApiData = useSwappedApiData()


// Toggle search bar to on
function handleToggleSearchBar() {
  toggleSearchBar.toggle()
  swappedApiData.setDataChangedFalse()
}
</script>

<template>
  <div class="sidebar-container__wrapper">
    <SidebarNavlink textContent="Home" navAsset="https://img.icons8.com/?size=100&id=2797&format=png" />
    <SidebarNavlink @click="handleToggleSearchBar" textContent="Search" navAsset="https://img.icons8.com/?size=100&id=7695&format=png" />
    <SidebarNavlink textContent="Favorites" navAsset="https://img.icons8.com/?size=100&id=7856&format=png" />
    <SidebarNavlink textContent="Community" navAsset="https://img.icons8.com/?size=100&id=122809&format=png" />
    <SidebarNavlink textContent="Github" navAsset="https://img.icons8.com/?size=96&id=AZOZNnY73haj&format=png" />
    <SidebarNavlink textContent="LinkedIn" navAsset="https://img.icons8.com/?size=100&id=447&format=png" />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container__wrapper {
    width: 260px;
    background-color: #121212;
    height: 100vh;
    top: 60px;
    bottom: 60px;
    position: sticky;
    border-right: 1px solid rgb(71, 71, 71);
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 12px;
}
</style>