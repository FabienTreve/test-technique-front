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
                        <p v-for="actor in movie.actors_display" :key="actor.id">{{ actor }}</p>
                        <v-row align="center">
                            <v-text-field v-model="firstName" label="Prénom"></v-text-field>
                            <v-text-field v-model="lastName" label="Nom"></v-text-field>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-icon v-if="movie.average_grade != null" icon="mdi-star"></v-icon>
                <p v-if="movie.average_grade != null" class="font-weight-thin"><span class="font-weight-bold">Note
                        moyenne : </span>{{ averageGrade }}</p>
                <v-spacer></v-spacer>
                <v-btn @click="sendEdit" variant="tonal" color="medium-emphasis" icon="mdi-check" size="small"></v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '../apiService';

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const movie = ref([]);
const averageGrade = computed(() => {
    return Math.floor(movie.value.average_grade * 100) / 100;
});

// Déclarer les refs pour Prénom et Nom
const firstName = ref('');
const lastName = ref('');

onMounted(async () => {
    movie.value = await fetchData();
});

const fetchData = async () => {
    try {
        const response = await ApiService.getMovie(route.params.id);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const sendEdit = async () => {
    try {
        const actors_data = [];
        if (firstName.value && lastName.value) {
            actors_data.push({
                "first_name": firstName.value,
                "last_name": lastName.value
            });
        }
        const response = await ApiService.updateMovie(id.value, {
            title: movie.value.title,
            description: movie.value.description,
            actors: actors_data
        });
        router.push(`/movie/${movie.value.id}`);
    } catch (error) {
        console.error('Error updating movie:', error);
    }
};
</script>

<style scoped>
.text-h5 {
    color: rgba(0, 0, 0, 0.87);
}

.grade-input {
    color: rgba(0, 0, 0, 0.87);
}
</style>
