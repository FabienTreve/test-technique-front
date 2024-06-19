<template>
    <v-row>
        <p class="text-h5">Détails du film</p>
    </v-row>
    <v-row>
        <v-card class="mx-auto" min-width="1000">
            <v-row>
                <v-col cols="12" lg="9" md="12" sm="12">
                    <v-card-text class="font-weight-thin">
                        {{ movie.description }}
                    </v-card-text>
                </v-col>
                <v-col cols="12" lg="3" md="12" sm="12">
                    <v-card-text class="text-end">
                        <p class="font-weight-bold">Acteurs :</p>
                        <p v-for="actor in movie.actors" :key="actor.id">{{ actor }}</p>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-icon v-if="movie.average_grade != null" icon="mdi-star"></v-icon>
                <p v-if="movie.average_grade != null" class="font-weight-thin"><span class="font-weight-bold">Note moyenne : </span>{{ avarageGrade }}</p>
                <v-spacer></v-spacer>
                <v-btn @click="redirectToEdit" color="medium-emphasis" icon="mdi-pencil" size="small"></v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
    <v-row align="center">
        <v-col cols="10">
            <v-text-field class="grade-input" v-model="gradeValue" label="Note" placeholder="Entrez votre texte"
                type="number" min="1" max="5">
            </v-text-field>
        </v-col>
        <v-col cols="2">
            <v-btn @click="handleButtonClick">
                Envoyer
            </v-btn>
        </v-col>
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
const gradeValue = ref(null);

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

// Gestion du click
const handleButtonClick = () => {
    //alert(`The number entered is: ${gradeValue.value}`); // Log
    if(gradeValue.value !== null) {
        sendReview();
        gradeValue.value = null;
    }
};

// Requête axios | Envoie de la review
const sendReview = async () => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/reviews/`, {
            movie: movie.value.id,
            grade: gradeValue.value
        });
        //console.log('Response from server:', response.data); //log
        if (response.status === 201) {
            // Mettre à jour la note moyenne dans movie.value
            movie.value.average_grade = response.data.movie.average_grade
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Router | Envoie à la page d'édition
const redirectToEdit = () => {
    router.push(`/movie/${id.value}/edit`);
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