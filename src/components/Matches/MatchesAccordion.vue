<script setup>
import { getSingleCodMatch } from '../../api/cod_matches.js'
import { ref, onMounted, defineProps } from 'vue'
import { useToggleMatches } from '../../stores/toggleMatches.js'
import AccordionCompletedSec from './AccordionCompletedSec.vue'
const toggleMatches = useToggleMatches()

const match = ref(null)
const isMatchDataLoading = ref(true)

const props = defineProps({
  // ID for single match
  id: Number
})

/**
 * Final processing of cod match when component is mounted
 */
async function processSingleCodMatch() {
  try {
    const returnedMatch = await getSingleCodMatch(props.id)
    match.value = returnedMatch
    console.log(match.value)
  } catch (err) {
    console.error('Error fetch match: ', err)
  } finally {
    isMatchDataLoading.value = false;
  }
}

onMounted(processSingleCodMatch)
</script>

<template>
  <div v-if="isMatchDataLoading" class="matches-accordion__loading" ><p>Loading...</p></div>
  <div v-else class="matches-accordion__container">
    <div v-for="details in match" :key="details.id">
      <div class="matches-accordion__title-container">
        <p id="matches-accordion__title">{{ details.videogame_title.name }}</p>
        <p id="matches-accordion__qualifiers">{{ details.tournament.name }}</p>
      </div>
      <hr />
      <p>
        Stream Link:
        <span
          ><a href="https://www.youtube.com/@CODLeague" target="_blank"
            >Call of Duty League</a
          ></span
        >
      </p>
      <p>Prize Pool: {{ toggleMatches.completed ? details.tournament.prizepool : 'N/A' }}</p>
      <AccordionCompletedSec v-if="toggleMatches.completed" :matchData="match" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.matches-accordion__loading {
    margin: 0 auto;
    color: white;
    font-weight: 500;
    animation: none !important;
    transition: none !important;
    display: flex;
    justify-content: center;
    margin-top: 6px;
}

a {
  color: rgb(76, 76, 255);
  text-decoration: underline;
}

.matches-accordion__container {
  width: 100%;
  background-color: rgb(37, 37, 37);
  padding: 12px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  div {
    gap: 8px;
    display: flex;
    flex-direction: column;
  }
}

.matches-accordion__title-container {
  margin-bottom: 16px;
  #matches-accordion__title {
    font-weight: bold;
    color: white;
  }
  p {
    color: rgb(219, 219, 219);
  }
}

hr {
  margin-bottom: 16px;
  background-color: rgb(84, 84, 84);
}
</style>