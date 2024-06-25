<template>
  <v-row>
    <p class="text-h5">Détails du film</p>
  </v-row>
  <v-row>
    <MovieDetailCard :movie="movie" />
  </v-row>
  <MovieReviewForm :movie-id="movie.id" @onReviewSubmitted="updateAverageGrade" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '../apiService';

import MovieDetailCard from '../components/MovieDetailCard.vue';
import MovieReviewForm from '../components/MovieReviewForm.vue';

const route = useRoute();
const movie = ref({});

const fetchData = async () => {
  try {
    const response = await ApiService.getMovie(route.params.id);
    movie.value = response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);

const updateAverageGrade = (newAverageGrade) => {
  movie.value.average_grade = newAverageGrade;
};
</script>

<style scoped>
.text-h5 {
  color: rgba(0, 0, 0, 0.87);
}
</style>