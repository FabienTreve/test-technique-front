<template>
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
            <p v-if="movie.average_grade != null" class="font-weight-thin">
                <span class="font-weight-bold">Note moyenne : </span>{{ averageGrade }}
            </p>
            <v-spacer></v-spacer>
            <v-btn @click="redirectToEdit" color="medium-emphasis" icon="mdi-pencil" size="small"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    movie: Object,
});

const { movie } = toRefs(props);
const router = useRouter();

const averageGrade = computed(() => {
    return Math.floor(movie.value.average_grade * 100) / 100;
});

const redirectToEdit = () => {
    router.push(`/movie/${movie.value.id}/edit`);
};
</script>

<style scoped>
.text-end {
    text-align: right;
}

.font-weight-thin {
    font-weight: 300;
}

.font-weight-bold {
    font-weight: 700;
}
</style>