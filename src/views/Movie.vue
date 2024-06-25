<template>
  <v-row>
    <p class="text-h5">Détails du film</p>
  </v-row>
  <v-row>
    <MovieDetailCard :movie="movie" />
  </v-row>
  <MovieReviewForm :movie-id="movie.id" />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import MovieDetailCard from '../components/MovieDetailCard.vue';
import MovieReviewForm from '../components/MovieReviewForm.vue';

const store = useStore();
const route = useRoute();

const movie = computed(() => store.state.movie);

onMounted(() => {
  store.dispatch('fetchMovie', route.params.id);
});
</script>

<style scoped>
.text-h5 {
  color: rgba(0, 0, 0, 0.87);
}
</style>
