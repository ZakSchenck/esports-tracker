<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    // Text content for each button
    btnContent: String,
    // Background color for each button
    btnBgColor: String,
});
</script>

<template>
  <button :style="`background-color: ${btnBgColor};`">{{ props.btnContent }}</button>
</template>

<style lang="scss" scoped>
button {
    font-size: 18px;
    color: white;
    border: 2px solid rgb(61, 61, 61);
    outline: none;
    font-weight: bold;
    padding: 10px 14px;
    border-radius: 6px;
}
</style>