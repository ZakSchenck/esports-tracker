<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  // Text content for each button
  btnContent: String,
  // Background color for each button
  btnBgColor: {
    type: String,
    default: 'transparent'
  },
  // Checks if button is selected
  isSelected: Boolean
})

const usePointerEvents = computed(() => (props.isSelected ? 'none' : 'auto'));
const selectedBtnBgColor = computed(() => (props.isSelected ? '#ACB5BD' : props.btnBgColor));

const emits = defineEmits(['update'])

const updateMatches = () => {
  emits('update')
}
</script>

<template>
  <button
    class="live-btn__btn"
    @click="updateMatches"
    :style="`background-color: ${selectedBtnBgColor}; pointer-events: ${usePointerEvents}`"
  >
    {{ props.btnContent }}
  </button>
</template>

<style lang="scss" scoped>
button {
  height: 40px;
  border-radius: 8px;
  width: 100%;
  border: 2px solid #acb5bd;
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
}
</style>
