<script setup>
import {ref} from 'vue';
import LiveBtn from '../buttons/LiveBtn.vue';
import MatchesCard from './MatchesCard.vue';
import { useToggleMatches } from '../../stores/toggleMatches.js';
const toggleMatches = useToggleMatches()

// Selected ID ref to be updated on click
const selectedId = ref(1)

// List of content for each LiveBtn instance
const buttonList = [
  { id: 1, content: 'Upcoming/Live', bgColor: 'transparent'},
  { id: 2, content: 'Completed', bgColor: 'transparent'},
]

/**
 * updates the selected button ID value, and updates api filter
 * @param {Number} id 
 */
const handleUpdate = (id) => {
  selectedId.value = id
  toggleMatches.toggle()
  console.log(toggleMatches.completed)
}
</script>

<template>
  <section>
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
    <MatchesCard />
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: rgb(18, 18, 18);
  color: rgb(161, 161, 161);
  max-width: 750px;
  border-radius: 8px;
  margin: 28px auto;
  padding: 16px;
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
</style>