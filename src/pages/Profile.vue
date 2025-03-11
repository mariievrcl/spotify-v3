<template>
  <div class="profile-container">
    <!-- Bannière du Profil -->
    <div class="banner">
      <img :src="user.profilePicture" alt="Profile Picture" class="profile-img" />
      <h1>{{ user.name }}</h1>
      <p>{{ user.bio }}</p>
      <button @click="playMix" class="mix-button">Écouter mon mix</button>
    </div>

    <!-- Statistiques musicales -->
    <section class="user-stats">
      <h2>🎧 Statistiques musicales</h2>
      <div class="stat-card">
        <p>📈 Nombre de morceaux écoutés : {{ user.totalTracks }}</p>
        <p>🎵 Playlist la plus écoutée : {{ user.favoritePlaylist }}</p>
        <p>🎼 Genres favoris : {{ user.favoriteGenres.join(', ') }}</p>
      </div>
    </section>

    <!-- Top Artistes et Morceaux -->
    <section class="top-music">
      <h2>🏆 Top artistes & morceaux</h2>
      <div class="top-lists">
        <div>
          <h3>🎤 Artistes</h3>
          <ul>
            <li v-for="artist in user.topArtists" :key="artist">{{ artist }}</li>
          </ul>
        </div>
        <div>
          <h3>🎶 Morceaux</h3>
          <ul>
            <li v-for="track in user.topTracks" :key="track">{{ track }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Historique d'écoute récent -->
    <section class="recent-listens">
      <h2>🔄 Historique récent</h2>
      <ul>
        <li v-for="track in user.recentTracks" :key="track">{{ track }}</li>
      </ul>
    </section>

    <!-- Playlists créées -->
    <section class="created-playlists-section">
      <h2>🎶 Playlists créées par {{ user.name }}</h2>
      <div v-if="user.playlists.length > 0" class="playlists-grid">
        <div v-for="playlist in user.playlists" :key="playlist.id" class="card" @click="viewPlaylist(playlist)">
          <img :src="playlist.image" alt="Playlist Cover" class="favoris-cover" />
          <p class="title">{{ playlist.name }}</p>
        </div>
      </div>
      <p v-else class="no-playlists">Aucune playlist créée pour le moment.</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
  name: "Marie Viricel",
  profilePicture: "https://i.pinimg.com/736x/e7/83/4b/e7834b5fa7473b9793d256433096f86a.jpg",
  bio: "Musique, voyages et découvertes.",
  totalTracks: 5234,
  favoritePlaylist: "Chill Vibes",
  favoriteGenres: ["Rap", "House", "Pop"],
  topArtists: ["Houdi", "Jorja Smith", "Arone"],
  topTracks: ["Dalida", "Cry For Me", "Show Me Love"],
  recentTracks: ["Feel Good - Rush Avenue", "Encore - Dakeez", "Paranoïa - MadeInParis"],
  playlists: [
    { id: 1, name: "Favoris", image: "https://i.pinimg.com/474x/28/7a/80/287a80544bb2c1404188148213c34f93.jpg" } 
  ]
});

const playMix = () => {
  console.log("Lecture du mix personnalisé...");
  alert("Lecture de votre mix personnalisé 🎶");
};

const viewPlaylist = (playlist) => {
  console.log(`Rediriger vers la playlist: ${playlist.name}`);
  router.push({ name: 'Playlist', params: { id: playlist.id } });
};
</script>

<style scoped>
.profile-container {
  background: linear-gradient(to bottom, #1e1e2e, #15151e);
  color: white;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.banner {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 2rem;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #a65fdf;
}

.mix-button {
  background-color: #a65fdf;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
}

.mix-button:hover {
  background-color: #8b4cc0;
}

.user-stats, .top-music, .recent-listens {
  margin-top: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.top-lists {
  display: flex;
  justify-content: space-between;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  margin: 0.3rem 0;
  border-radius: 5px;
}

.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.playlist-cover {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.favoris-cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.large-card {
  transform: scale(1.2);
}

</style>