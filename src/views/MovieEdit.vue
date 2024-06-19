<template>
    <v-row>
        <p class="text-h5">Détail du film</p>
    </v-row>
    <v-row>
        <v-card class="mx-auto" min-width="1000">
            <v-row>
                <v-col cols="12" lg="9" md="12" sm="12">
                    <v-textarea label="Description" variant="outlined" v-model="movie.description">
                    </v-textarea>
                </v-col>
                <v-col cols="12" lg="3" md="12" sm="12">
                    <v-card-text class="text-end">
                        <p class="font-weight-bold">Acteurs :</p>
                        <p v-for="actor in movie.actors" :key="actor.id">{{ actor }}</p>
                        <v-row align="center">
                            <v-text-field label="Prénom"></v-text-field>
                            <v-text-field label="Nom"></v-text-field>
                            <v-btn variant="tonal" color="medium-emphasis" icon="mdi-plus" size="small"></v-btn>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-icon v-if="movie.average_grade != null" icon="mdi-star"></v-icon>
                <p v-if="movie.average_grade != null" class="font-weight-thin"><span class="font-weight-bold">Note moyenne : </span>{{ avarageGrade }}</p>
                <v-spacer></v-spacer>
                <v-btn @click="sendEdit" variant="tonal" color="medium-emphasis" icon="mdi-check" size="small"></v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// Imports de useRoute() et useRouter(), usages dissociés
const route = useRoute();
const router = useRouter();
// On récupère l'ID du film depuis les paramètres d'URL
const id = ref(route.params.id);
// Movie récupéré par fetchData
const movie = ref([]);

const avarageGrade = computed(() => {
  return Math.floor(movie.value.average_grade * 100) / 100;
})

// On injecte les datas récupérés par fetchData
onMounted(async () => {
    movie.value = await fetchData();
});

// Requête axios | GET sur l'API pour récupérer les données du film
const fetchData = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${id.value}?format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// Requête axios | Envoie des modifications
const sendEdit = async () => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/movies/${id.value}/`, {
            title: movie.value.title,
            description: movie.value.description
        });
        //console.log('Response from server:', response.data); // Log
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
</script>

<style computed>
.text-h5 {
    color: rgba(0, 0, 0, 0.87);
}

.grade-input {
    color: rgba(0, 0, 0, 0.87);
}
</style>