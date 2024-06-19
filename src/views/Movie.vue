<template>
    <p class="text-h5">Détails du film</p>
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
        <v-card-actions v-if="movie.average_grade != null">
            <v-spacer></v-spacer>
            <v-icon icon="mdi-star"></v-icon>
            <p class="font-weight-thin"><span class="font-weight-bold">Note moyenne : </span>{{ movie.average_grade }}</p>
            <!--<v-btn @click="redirectToMovie" color="medium-emphasis" icon="mdi-star" size="small"></v-btn>-->
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// On récupère l'ID du film depuis les paramètres d'URL
const route = useRoute();
const id = ref(route.params.id);

const fetchData = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${id.value}?format=json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const movie = ref([]);

onMounted(async () => {
    movie.value = await fetchData();
    console.log(movie.value)// Log
});

</script>

<style computed>
.text-h5 {
    color: rgba(0, 0, 0, 0.87);
}
</style>