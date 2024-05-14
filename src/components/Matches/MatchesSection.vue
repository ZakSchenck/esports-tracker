<script setup>
import { ref } from 'vue'
import LiveBtn from '../buttons/LiveBtn.vue'
import MatchesCard from './MatchesCard.vue'
import { useToggleMatches } from '../../stores/store.js'
const toggleMatches = useToggleMatches();


// Selected ID ref to be updated on click
const selectedId = ref(1)

// List of content for each LiveBtn component instance
const buttonList = [
  { id: 1, content: 'Upcoming/Live', bgColor: 'transparent' },
  { id: 2, content: 'Completed', bgColor: 'transparent' }
]

/**
 * updates the selected button ID value, and updates api filter
 * @param {Number} id
 */
const handleUpdate = (id) => {
  selectedId.value = id
  toggleMatches.toggle()
}
</script>

<template>
  <div class="a">
    <h1>Matches</h1>
    <p>Season</p>
    <p id="matches-container__game">2024 Season (MWIII)</p>
    <hr />
    <div class="matches-container__select-btns">
      <LiveBtn
        v-for="button in buttonList"
        :key="button.id"
        :btnContent="button.content"
        :btnBgColor="button.bgColor"
        :isSelected="selectedId === button.id"
        @update="handleUpdate(button.id)"
      />
    </div>
    <Transition name="slide-fade">
      <MatchesCard />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.a {
  background-color: rgb(18, 18, 18);
  color: rgb(161, 161, 161);
  border-radius: 8px;
  margin: 28px 0 !important;
  padding: 16px;
  width: 750px;
  h1 {
    font-size: 32px;
    margin-bottom: 12px;
  }
  #matches-container__game {
    color: white;
    font-weight: bold;
  }
  hr {
    color: rgb(86, 86, 86);
    margin: 32px 0 32px 0;
    height: 1px;
  }

  .matches-container__select-btns {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
}

.slide-fade-enter-active {
  transition: opacity 0.95s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>../../stores/store.js