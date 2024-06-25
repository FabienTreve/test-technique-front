<template>
  <v-row align="center">
    <v-col cols="10">
      <v-text-field
        class="grade-input"
        v-model="gradeValue"
        label="Note"
        placeholder="Entrez votre note"
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
import { useStore } from 'vuex';

const props = defineProps({
  movieId: Number,
});

const gradeValue = ref(null);
const store = useStore();

const handleButtonClick = () => {
  if (gradeValue.value !== null) {
    sendReview();
    gradeValue.value = null; // Optionally reset the input field after sending the review
  }
};

const sendReview = async () => {
  try {
    await store.dispatch('submitReview', { movieId: props.movieId, grade: gradeValue.value });
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};
</script>

<style scoped>
.grade-input {
  color: rgba(0, 0, 0, 0.87);
}
</style>
