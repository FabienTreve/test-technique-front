<template>
    <v-card class="mx-auto" max-width="500">
        <v-container fluid>
            <v-row>
                <!--<v-col v-for="item in items" :key="item.title" :cols="item.flex">-->
                <v-col v-for="movie in movies" :key="movie.id" cols="12" lg="12" md="6" sm="4">
                    <MovieCard
                        :key="movie.id"
                        :id="movie.id"
                        :title="movie.title"
                        :description="movie.description"
                    />
                </v-col>
            </v-row>
            <v-row>
                <button @click="fetchData(currentPage - 1)" v-if="currentPage != 1">Précédent</button>
                <v-spacer></v-spacer>
                <button @click="fetchData(currentPage + 1)" :disabled="!nextPage">Suivant</button>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import ApiService from '../apiService';

const movies = ref([]);
const currentPage = ref(1);
const nextPage = ref(null);
const previousPage = ref(null);

const fetchData = async (page) => {
    try {
        const response = await ApiService.getMovies(page);
        movies.value = response.results;
        currentPage.value = page;
        nextPage.value = response.next !== null;
        previousPage.value = response.previous !== null;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(async () => {
    fetchData(currentPage.value);
});
</script>