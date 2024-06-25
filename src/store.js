import { createStore } from 'vuex';
import ApiService from './apiService';

const store = createStore({
    state: {
        movie: {},
        averageGrade: null,
    },
    mutations: {
        setMovie(state, movie) {
            state.movie = movie;
            state.averageGrade = movie.average_grade;
        },
        setAverageGrade(state, averageGrade) {
            console.log('Setting average grade:', averageGrade); // Log the average grade
            state.averageGrade = averageGrade;
        },
    },
    actions: {
        async fetchMovie({ commit }, movieId) {
            try {
                const response = await ApiService.getMovie(movieId);
                commit('setMovie', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async submitReview({ dispatch }, { movieId, grade }) {
            try {
                await ApiService.postReview({ movie: movieId, grade });
                // Fetch the movie data again to get the updated average_grade
                dispatch('fetchMovie', movieId);
            } catch (error) {
                console.error('Error submitting review:', error);
            }
        },
    },
});

export default store;
