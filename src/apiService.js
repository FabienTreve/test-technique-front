import axiosInstance from './axios';

class ApiService {
    constructor() {
        this.api = axiosInstance;
    }

    // Méthode privée pour obtenir l'URL complète
    _getFullURL(endpoint) {
        return `${this.api.defaults.baseURL}${endpoint}`;
    }

    // ---------------- Méthode génériques, au besoin ----------------

    // Méthode pour récupérer des données
    async getData(endpoint) {
        try {
            const response = await this.api.get(this._getFullURL(endpoint));
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
            throw error;
        }
    }

    // Méthode pour ajouter des données
    async postData(endpoint, data) {
        try {
            const response = await this.api.post(this._getFullURL(endpoint), data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout des données', error);
            throw error;
        }
    }

    // Méthode pour mettre à jour des données
    async updateData(endpoint, data) {
        try {
            const response = await this.api.put(this._getFullURL(endpoint), data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données', error);
            throw error;
        }
    }

    // Méthode pour supprimer des données
    async deleteData(endpoint) {
        try {
            const response = await this.api.delete(this._getFullURL(endpoint))
        } catch (error) {
            console.error('Erreur lors de la suppression des données', error);
            throw error;
        }
    }

    // ---------------- Méthodes custom ----------------

    // Méthode pour récupérer les films
    async getMovies(page) {
        try {
            const response = await this.api.get(this._getFullURL(`/movies/?format=json&page=${page}`));
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des films', error);
            throw error;
        }
    }

    // Méthode pour récupérer un film spécifique
    async getMovie(id) {
        try {
            const response = await this.api.get(this._getFullURL(`/movies/${id}/?format=json`));
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération du film', error);
            throw error;
        }
    }

    // Méthode pour mettre à jour un film spécifique
    async updateMovie(id, data) {
        try {
            const response = await this.api.put(this._getFullURL(`/movies/${id}/?format=json`), data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du film', error);
            throw error;
        }
    }

    // Méthode pour ajouter une review
    async postReview(data) {
        try {
            const response = await this.api.post(this._getFullURL(`/reviews/?format=json`), data);
            console.log("DATA :" + response.data.results)
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'ajout de la review", error);
            throw error;
        }
    }
}

export default new ApiService();
