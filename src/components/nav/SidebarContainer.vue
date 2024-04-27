<script setup>
import SidebarNavlink from './SidebarNavlink.vue'
</script>

<template>
  <div class="sidebar-container__wrapper">
    <SidebarNavlink textContent="Home" navAsset="https://img.icons8.com/?size=100&id=2797&format=png" />
    <SidebarNavlink textContent="Search" navAsset="https://img.icons8.com/?size=100&id=7695&format=png" />
    <SidebarNavlink textContent="Favorites" navAsset="https://img.icons8.com/?size=100&id=7856&format=png" />
    <SidebarNavlink textContent="Community" navAsset="https://img.icons8.com/?size=100&id=122809&format=png" />
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