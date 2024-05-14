<script setup>
import { defineProps } from 'vue';
import { useSwappedApiData } from '../../stores/store.js'
const swappedApiData = useSwappedApiData()

const props = defineProps({
    // Text content for each button
    btnContent: String,
    // Background color for each button
    btnBgColor: String,
});

function handleResetSearchRes() {
  swappedApiData.setDataChangedFalse()
}
</script>

<template>
  <button @click="handleResetSearchRes" :style="`background-color: ${btnBgColor};`">{{ props.btnContent }}</button>
</template>

<style lang="scss" scoped>
button {
    font-size: 18px;
    color: white;
    border: 4px solid rgb(123, 36, 36);
    outline: none;
    font-weight: bold;
    padding: 10px 14px;
    border-radius: 50px;
    margin-top: 18px;
    &:hover {
      background-color: rgb(128, 32, 32);
      cursor: pointer;
    }
}
</style>