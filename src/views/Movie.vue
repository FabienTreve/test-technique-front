<template>
    <div>
        <h2>Détails du film {{ id }}</h2>
        <!-- Contenu des détails du film ici -->
    </div>
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
        const response = await axios.get('http://127.0.0.1:8000/movies/'+id+'?format=json');
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

