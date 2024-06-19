<template>
    <v-card>
        <v-card-item>
            <v-card-title primary-title>{{ title }}</v-card-title>
            <v-card-subtitle>{{ description }}</v-card-subtitle>
        </v-card-item>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="redirectToMovie" color="medium-emphasis" icon="mdi-eye" size="small"></v-btn>
        </v-card-actions>
    </v-card>
</template>


<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps(['id', 'title', 'description']);

const redirectToMovie = () => {
  router.push('/movie/'+props.id);
};

</script>