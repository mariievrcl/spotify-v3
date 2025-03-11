<template>
  <div class="search-container">
    <!-- Bannière de recherche -->
    <div class="search-banner">
      <h1>Rechercher 🎵</h1>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Rechercher des playlists, artistes ou albums..." 
        @input="onSearch"
        class="search-input"
      />
    </div>

    <!-- Résultats de recherche -->
    <section v-if="searchResults.playlists.length > 0 || searchResults.artists.length > 0 || searchResults.albums.length > 0" class="section">
      <h2>Résultats pour "{{ searchQuery }}"</h2>

      <div v-if="searchResults.playlists.length > 0" class="grid">
        <h3>🎶 Playlists du Moment</h3>
        <div v-for="playlist in searchResults.playlists" :key="playlist.id" class="card">
          <img :src="playlist.image" alt="Playlist Cover" class="cover">
          <p class="title">{{ playlist.name }}</p>
        </div>
      </div>

      <div v-if="searchResults.artists.length > 0" class="grid">
        <h3>🔥 Artistes en Tendance</h3>
        <div v-for="artist in searchResults.artists" :key="artist.id" class="card">
          <img :src="artist.image" alt="Artist" class="cover rounded">
          <p class="title">{{ artist.name }}</p>
        </div>
      </div>

      <div v-if="searchResults.albums.length > 0" class="grid">
        <h3>💿 Albums Populaires</h3>
        <div v-for="album in searchResults.albums" :key="album.id" class="card">
          <img :src="album.cover" alt="Album Cover" class="cover">
          <p class="title">{{ album.name }}</p>
          <router-link :to="'/album/' + album.id" class="album-link">Voir l'album</router-link>
        </div>
      </div>
    </section>

    <!-- Message si aucun résultat -->
    <div v-else class="no-results">
      <p>Aucun résultat trouvé pour "{{ searchQuery }}".</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMusicStore } from '@/store/musicStore';

const musicStore = useMusicStore();

// Variable pour stocker la recherche de l'utilisateur
const searchQuery = ref('');

// Résultats de recherche
const searchResults = ref({
  playlists: [],
  artists: [],
  albums: []
});

// Filtrer les résultats en fonction de la recherche
const onSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = { playlists: [], artists: [], albums: [] };
    return;
  }

  console.log("🔍 Recherche en cours pour :", searchQuery.value);

  // Effectuer la recherche via le store
  await musicStore.search(searchQuery.value);

  // Mettre à jour les résultats
  searchResults.value = {
    playlists: musicStore.playlists,
    artists: musicStore.artists,
    albums: musicStore.albums
  };
};
</script>

<style scoped>
.search-container {
  background: linear-gradient(to bottom, #1e1e2e, #15151e);
  color: white;
  min-height: 100vh;
  padding: 2rem;
}

.search-banner {
  text-align: center;
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.search-input {
  padding: 0.5rem 1rem;
  width: 80%;
  max-width: 500px;
  margin-top: 1rem;
  border-radius: 8px;
  border: 1px solid #a65fdf;
  background: #2c2c34;
  color: white;
  font-size: 1rem;
}

.section {
  margin-top: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.title {
  margin-top: 0.5rem;
  font-size: 1rem;
}

.no-results {
  text-align: center;
  margin-top: 2rem;
  color: #ff5555;
}
</style>


