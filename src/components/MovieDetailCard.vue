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
                    <p v-for="actor in movie.actors_display" :key="actor.id">{{ actor }}</p>
                </v-card-text>
            </v-col>
        </v-row>
        <v-card-actions>
            <v-icon v-if="averageGrade !== null" icon="mdi-star"></v-icon>
            <p v-if="averageGrade !== null" class="font-weight-thin">
                <span class="font-weight-bold">Note moyenne : </span>{{ formattedAverageGrade }}
            </p>
            <v-spacer></v-spacer>
            <v-btn @click="redirectToEdit" color="medium-emphasis" icon>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const movie = computed(() => store.state.movie);
const averageGrade = computed(() => store.state.averageGrade);

const formattedAverageGrade = computed(() => {
    return averageGrade.value !== null && !isNaN(averageGrade.value)
        ? Math.floor(averageGrade.value * 100) / 100
        : "N/A";
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