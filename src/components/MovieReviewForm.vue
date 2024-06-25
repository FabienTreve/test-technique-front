<template>
    <v-row align="center">
      <v-col cols="10">
        <v-text-field
          class="grade-input"
          v-model="gradeValue"
          label="Note"
          placeholder="Entrez votre texte"
          type="number"
          min="1"
          max="5"
        />
      </v-col>
      <v-col cols="2">
        <v-btn @click="handleButtonClick">
          Envoyer
        </v-btn>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ApiService from '../apiService';
  
  const props = defineProps({
    movieId: Number,
    onReviewSubmitted: Function,
  });
  
  const gradeValue = ref(null);
  
  const handleButtonClick = () => {
    if (gradeValue.value !== null) {
      sendReview();
      //gradeValue.value = null;
    }
  };
  
  const sendReview = async () => {
    try {
      console.log(props.movieId)
      const response = await ApiService.postReview({
        movie: props.movieId,
        grade: gradeValue.value
      });
      props.onReviewSubmitted(response.movie.average_grade);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  </script>
  
  <style scoped>
  .grade-input {
    color: rgba(0, 0, 0, 0.87);
  }
  </style>
  