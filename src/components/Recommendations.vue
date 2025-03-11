<template>
    <div>
      <h2>Recommandations basées sur vos morceaux récents</h2>
      <div v-if="loading">Chargement...</div>
      <ul v-else>
        <li v-for="track in recommendedTracks" :key="track.id">
          <p>{{ track.name }} - {{ track.artists[0].name }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getRecentTracks, getRecommendations } from '@/services/spotify.js'; // Import des fonctions
  
  export default {
    name: 'Recommendations',
    setup() {
      const recommendedTracks = ref([]); // Variable pour stocker les morceaux recommandés
      const loading = ref(true); // Variable pour gérer l'état de chargement
  
      // Fonction pour obtenir les recommandations basées sur les morceaux récents
      const fetchRecommendations = async () => {
        try {
          const recentTracks = await getRecentTracks(); // Récupérer les morceaux récents
          const trackIds = recentTracks.map(track => track.id); // Extraire les ID des morceaux
          const recommendations = await getRecommendations(trackIds); // Obtenir les recommandations
          recommendedTracks.value = recommendations; // Mettre à jour la liste des morceaux recommandés
        } catch (error) {
          console.error('Erreur lors de la récupération des recommandations:', error);
        } finally {
          loading.value = false; // Fin du chargement
        }
      };
  
      // Appel de la fonction lors du montage du composant
      onMounted(() => {
        fetchRecommendations();
      });
  
      return {
        recommendedTracks,
        loading,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Ajoute des styles ici */
  </style>
  
  