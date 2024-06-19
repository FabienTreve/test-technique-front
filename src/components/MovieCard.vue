<template>
    <v-card>
        <v-card-item>
            <v-card-title primary-title>{{ title }}</v-card-title>
            <v-card-subtitle class="font-weight-thin">{{ description }}</v-card-subtitle>
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

// Props
const props = defineProps(['id', 'title', 'description']);

// Router | Redirection vers le bon film
const redirectToMovie = () => {
  router.push('/movie/'+props.id);
};

</script>
