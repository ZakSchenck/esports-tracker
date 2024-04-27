<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  matchData: Array
})
</script>

<template>
  <div class="accordion-completed-section__container">
    <div
      class="accordion-completed-section__container-loop"
      v-for="details in props.matchData"
      :key="details.id"
    >
      <div class="accordion-completed-section__team-container">
        <img :src="details.opponents[0].opponent.image_url" :alt="details.opponents[0].opponent.name" />
        <h3>{{ details.opponents[0].opponent.name}} - {{ details.results[0].score }}</h3>
      </div>
      <h2 id="accordion-completed-section__vs-txt">VS</h2>
      <div class="accordion-completed-section__team-container">
        <img :src="details.opponents[1].opponent.image_url" :alt="details.opponents[1].opponent.name" />
        <h3>{{ details.opponents[1].opponent.name}} - {{ details.results[1].score }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion-completed-section__container {
  background-color: rgb(44, 44, 44);
  padding: 8px;
}

.accordion-completed-section__team-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  h3 {
    color: rgb(220, 220, 220);
  }
}

.accordion-completed-section__container-loop {
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
}

img {
  height: 40px;
  width: auto;
}

#accordion-completed-section__vs-txt {
    margin: 0 auto;
    color: white;
}
</style>