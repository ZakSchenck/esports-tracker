<script setup>
import AuthButtons from './buttons/AuthButtons.vue'
</script>

<template>
  <header>
    <img src="../assets/logo.png" alt="logo" />
    <div class="header__auth-btns-container">
      <AuthButtons btnContent="Log In" btnBgColor="rgb(43, 43, 43)" />
      <AuthButtons btnContent="Sign Up" btnBgColor="#48278a" />
    </div>
  </header>
</template>

<style lang=scss scoped>
  header {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5%;
    border-bottom: 1px solid rgb(86, 86, 86);
    img {
      height: 45px;
      width: auto;
    }
  }

  .header__auth-btns-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
    gap: 12px;
  }
</style>