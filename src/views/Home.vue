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
        </v-container>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies?format=json');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

//const { ref, onMounted } = Vue;
const movies = ref([]);

onMounted(async () => {
    movies.value = await fetchData();
});
</script>