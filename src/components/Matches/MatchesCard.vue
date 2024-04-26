<script setup>
import { ref, onMounted, computed } from 'vue'
import { getCodMatches } from '../../api/cod_matches.js'
import { useToggleMatches } from '../../stores/toggleMatches.js'
const toggleMatches = useToggleMatches()

const matches = ref(null)

// Extended acronyms for each team key
const acronyms = {
  LAT: 'Los Angeles Thieves',
  TEX: 'Optic Texas',
  CRR: 'Carolina Royal Ravens',
  LAG: 'Los Angeles Guerillas',
  BOS: 'Boston Breach',
  LVL: 'Las Vegas Legion',
  MH: 'Miami Heretics'
}

/**
 * Fetches match data
 */
const fetchCodMatchData = async () => {
  try {
    const returnedMatchData = await getCodMatches()
    matches.value = returnedMatchData.reverse()
  } catch (err) {
    console.error(err)
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
 * Switches which way the API loop looks
 * @param {Number} index 
 */
function switchIndexTraverse(index) {
    return !toggleMatches.completed ? index - 1  : index + 1;
}

onMounted(fetchCodMatchData)
</script>

<template>
  <div>
    <div v-for="(match, i) in matches" :key="match.id">
      <div
        v-if="
          (match.status === 'not_started' && !toggleMatches.completed) ||
          (match.status === 'finished' && toggleMatches.completed)
        "
      >
        <div
          v-if="matches[switchIndexTraverse(i)].begin_at.slice(0, 10) !== match.begin_at.slice(0, 10)"
          class="matches-card__date"
        >
          <hr />
          <p>{{ formatMatchDate(match.begin_at) }}</p>
          <hr />
        </div>
        <p id="matches-card__detail-text">
          {{ formatMatchTime(match.begin_at) }} | BO{{ match.games.length }} |
          <span>{{ match.serie.full_name }}</span>
        </p>

        <div class="g">
          <div class="matches-card__team-wrapper" v-for="team in match.opponents" :key="team.id">
            <img :src="team.opponent.image_url" :alt="team.opponent.acronym" />
            <h3>
              {{
                acronyms[team.opponent.acronym]
                  ? acronyms[team.opponent.acronym]
                  : team.opponent.acronym
              }}
            </h3>
          </div>
        </div>
      </div>
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

.g {
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
</style>