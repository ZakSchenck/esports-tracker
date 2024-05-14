<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { getCodMatches } from '../../api/cod_matches.js'
import { useToggleMatches } from '../../stores/store.js'
import MatchesAccordion from './MatchesAccordion.vue'
import NoMatches from './NoMatches.vue'
import { useSwappedApiData } from '../../stores/store.js'
import Favorite from '../buttons/Favorite.vue'
const swappedApiData = useSwappedApiData()
const toggleMatches = useToggleMatches()
const matches = ref(null)
const openMatchId = ref(null)
const accordionOpenBool = ref(true)
const isMatchDataLoading = ref(true)

/**
 * Fetches match data
 */
const fetchCodMatchData = async () => {
  try {
    const returnedMatchData = await getCodMatches()
    matches.value = returnedMatchData.reverse()
    console.log(matches.value)
  } catch (err) {
    console.error(err)
  } finally {
    // Finally clause to handle loading screen
    isMatchDataLoading.value = false
  }
}

/**
 * Formats date string to match time
 * @param {String} date
 */
function formatMatchTime(date) {
  const datetime = new Date(date)
  datetime.setHours(datetime.getHours() - 12)
  const matchHours = datetime.getHours()
  let matchMins = datetime.getMinutes()

  return `${matchHours}:${matchMins === 0 ? '00' : matchMins} PM EST`
}

/**
 * Formats full date to long written out format
 * @param {String} dateInput
 */
function formatMatchDate(dateInput) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const date = new Date(dateInput)
  const dayOfWeek = days[date.getDay()]
  const month = months[date.getMonth()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  return `${dayOfWeek} - ${month} ${dayOfMonth}, ${year}`
}

/**
 * Toggles match data accordion
 * @param {Number} id
 */
function toggleMatch(id) {
  openMatchId.value = openMatchId.value === id ? null : id
}

// Computed property that reverses or de-reverses the API depending on the LiveBtn selection they're on
const orderedMatches = computed(() => {
  if (toggleMatches.completed) {
    return matches.value.slice().reverse()
  }
  return matches.value.filter((match) => match.status === 'not_started')
})

// Removes active accordion pop up with LiveBtns are interacted with
watch(
  () => toggleMatches.completed,
  () => {
    openMatchId.value = null
  },
  { immediate: true }
)

onMounted(fetchCodMatchData)
</script>

<template>
  <div v-if="isMatchDataLoading">
    <div class="matches-card__loading-wrapper"></div>
    <div id="loading-box-1"></div>
    <div id="loading-box-2"></div>
  </div>

  <div v-else>
    <ButtonPill
      v-if="swappedApiData.getDataChanged"
      btnContent="Reset Search Results"
      btnBgColor="red"
    />

    <template v-if="orderedMatches.length > 0">
      <div v-for="match in orderedMatches" :key="match.id" @click="toggleMatch(match.id)" class="x">
        <div class="matches-card__date">
          <hr />
          <p>{{ formatMatchDate(match.begin_at) }}</p>
          <hr />
        </div>
        <p id="matches-card__detail-text">
          {{ formatMatchTime(match.begin_at) }} | BO{{ match.games.length }} |
          <span>{{ match.serie.full_name }}</span>
        </p>
        <Favorite />

        <div class="matches-card__card-container">
          <div class="matches-card__team-wrapper" v-for="team in match.opponents" :key="team.id">
            <img :src="team.opponent.image_url" :alt="team.opponent.acronym" />
            <h3>{{ team.opponent.name }}</h3>
          </div>
        </div>

        <Transition name="slide-fade">
          <MatchesAccordion
            v-if="openMatchId === match.id"
            :id="match.id"
            :isAccordionOpen="accordionOpenBool"
          />
        </Transition>
      </div>
    </template>
    
    <div v-else>
      <NoMatches />
    </div>
  </div>
</template>


<style lang="scss" scoped>
#matches-card__detail-text {
  font-size: 13px;
  margin-top: 32px;
  margin-bottom: 12px;
  span {
    color: white;
    text-decoration: underline;
    text-transform: uppercase;
  }
}

.x {
  position: relative;
}

.slide-fade-enter-active {
  transition: opacity 0.95s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.matches-card__date {
  display: flex;
  flex-direction: row;
  margin: 16px 0px;
  align-items: center;
  justify-content: center;
  hr {
    height: 1px;
    width: 100%;
    background-color: rgb(149, 149, 149);
    border: none;
    outline: none;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88%;
    padding: 0;
    margin: 0;
    color: rgb(149, 149, 149);
    font-weight: bold;
  }
}

.matches-card__card-container {
  background-color: rgb(44, 44, 44);
  transition: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: rgb(20, 20, 20);
    transition: 0.4s;
  }
}

.matches-card__team-wrapper {
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  border-radius: 8px;
  gap: 12px;
  border: 1px solid rgb(83, 83, 83);
  img {
    height: 32px;
    width: auto;
  }
}

.matches-card__loading-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(7px);
  top: 0;
  left: 0;
  z-index: 3;
  h1 {
    z-index: 4;
  }
}

h3 {
  font-weight: 300;
}

#loading-box-1 {
  width: 150px;
  height: 150px;
  border: 6px solid rgb(55, 199, 105);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  animation: spinForward 1s infinite linear;
  transform-origin: center;
  z-index: 4;
}

@keyframes spinForward {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotate(90deg);
  }
}

#loading-box-2 {
  width: 150px;
  height: 150px;
  border: 6px solid rgb(85, 184, 255);
  position: absolute;
  background-color: black;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  animation: spinBackwards 2s infinite linear;
  transform-origin: center;
  z-index: 4;
}

@keyframes spinBackwards {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotate(-90deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(-180deg);
  }
  75% {
    transform: translate(-50%, -50%) rotate(-270deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}
</style>../../stores/store.js