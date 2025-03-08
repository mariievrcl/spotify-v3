<template>
  <div class="home-container">
    <!-- Bannière de bienvenue -->
    <div class="banner">
      <h1>Bienvenue sur <span class="brand">MusicWave</span> 🎵</h1>
      <p>Découvrez les meilleures playlists, artistes et albums du moment.</p>
    </div>

    <!-- Nouveautés Spotify -->
    <section class="section">
      <h2>🎵 Nouveautés Spotify</h2>
      <div v-if="albums.length" class="scroll-container">
        <div v-for="album in albums" :key="album.id" class="card">
          <img :src="album.images[0]?.url" :alt="album.name" class="cover" />
          <p class="title"><strong>{{ album.name }}</strong> - {{ album.artists[0].name }}</p>
          <router-link :to="'/album/' + album.id" class="album-link">Voir l'album</router-link>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>

    <!-- Albums de Pitbull -->
    <section class="section">
      <h2>🔥 Albums de Pitbull</h2>
      <div v-if="trendingTracks.length" class="scroll-container">
        <div v-for="track in trendingTracks" :key="track.id" class="card">
          <img :src="track.album.images[0]?.url" :alt="track.name" class="cover" />
          <p class="title"><strong>{{ track.name }}</strong> - {{ track.artists[0].name }}</p>
          <button @click="playTrack(track)" class="play-button">▶️ Écouter avec le Player</button>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>

    <!-- Artistes peu connus -->
    <section class="section">
      <h2>🚀 Artistes peu connus</h2>
      <div v-if="undergroundArtists.length" class="scroll-container">
        <div v-for="artist in undergroundArtists" :key="artist.id" class="card">
          <img v-if="artist.images && artist.images.length" :src="artist.images[0].url" :alt="artist.name" class="cover rounded" />
          <div v-else class="cover-placeholder">🎤</div> <!-- Placeholder si pas d'image -->
          <p class="title"><strong>{{ artist.name }}</strong></p>
          <router-link :to="'/artist/' + artist.id" class="album-link">Voir l'artist</router-link>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>

    <!-- Albums Populaires -->
    <section class="section">
      <h2>💿 Albums Populaires</h2>
      <div v-if="popularAlbums.length" class="scroll-container">
        <div v-for="album in popularAlbums" :key="album.id" class="card">
          <img :src="album.images[0].url" :alt="album.name" class="cover" />
          <p class="title"><strong>{{ album.name }}</strong> - {{ album.artists[0].name }}</p>
          <router-link :to="'/album/' + album.id" class="album-link">Voir l'album</router-link>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>

    <!-- Artistes Populaires -->
    <section class="section">
      <h2>🚀 Artistes populaires</h2>
      <div v-if="popularArtists.length" class="scroll-container">
        <div v-for="artist in popularArtists" :key="artist.id" class="card">
          <img v-if="artist.images && artist.images.length" :src="artist.images[0].url" :alt="artist.name" class="cover rounded" />
          <div v-else class="cover-placeholder">🎤</div> <!-- Placeholder si pas d'image -->
          <p class="title"><strong>{{ artist.name }}</strong></p>
          <router-link :to="'/artist/' + artist.id" class="album-link">Voir l'artist</router-link>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>
  </div>
</template>

<script>
import { getNewReleases, getArtists, getRecommandations, getPlaylists, getPopularArtists } from "../../services/spotify";
import { useMusicStore } from "@/store/musicStore";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      albums: [],              // Nouveautés Spotify
      trendingTracks: [],      // Musiques en tendance
      undergroundArtists: [],  // Artistes peu connus
      popularAlbums: [],        // Albums populaires
      popularArtists: []       // Artistes populaires
    };
  },
  methods: {
    // Méthode pour jouer une chanson
    playTrack(track) {
      if (track.is_playable) {
        const musicStore = useMusicStore(); // Appel correct du store
        musicStore.setCurrentTrack(track);  // Stocker la piste actuelle
        this.$router.push("/player");       // Naviguer vers le player
      } else {
        alert("❌ Aucun extrait disponible !");
      }
    }
  },
  async created() {
    try {
      // Récupération des données
      this.albums = await getNewReleases();
      this.trendingTracks = await getArtists();   
      this.undergroundArtists = await getRecommandations();
      this.popularAlbums = await getPlaylists();
      this.popularArtists = await getPopularArtists();
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  }
};
</script>

<style scoped>
.home-container {
  background: linear-gradient(to bottom, #1e1e2e, #15151e);
  color: white;
  min-height: 100vh;
  padding: 2rem;
}

.banner {
  text-align: center;
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 2rem;
}

.brand {
  color: #a65fdf;
  font-weight: bold;
}

.section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #a65fdf rgba(255, 255, 255, 0.1);
}

.scroll-container::-webkit-scrollbar {
  height: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #a65fdf;
  border-radius: 4px;
}

.card {
  flex: 0 0 auto;
  width: 200px;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

.cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.rounded {
  border-radius: 50%;
}

.title {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #ffffff;
}

.album-link {
  padding: 0.5rem;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;
  background-color: #a65fdf;
  color: white;
}

.album-link:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.play-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  background: #a65fdf;
  color: white;
}

.play-button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
</style>
