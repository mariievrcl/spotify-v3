<template>
  <div class="artist-container" v-if="currentArtist">
    <div class="artist-header">
      <img :src="artistImage" :alt="currentArtist.name" class="artist-cover" />
      <div class="artist-info">
        <h2>{{ currentArtist.name }}</h2>
        <p>{{ currentArtist.followers.total }} followers</p>
        <p>{{ currentArtist.genres.join(', ') }}</p>
      </div>
    </div>

    <div class="artist-tracks">
      <h3>Titres</h3>
      <ul class="tracks-list">
        <li v-for="(track, index) in artistTracks" :key="track.id">
          <div class="track-header" @click="toggleTrack(index)">
            <span>{{ track.track_number }}. {{ track.name }}</span>
            <span v-if="openTrack === index">🔼</span>
            <span v-else>🔽</span>
          </div>

          <transition name="slide">
            <div v-if="openTrack === index" class="track-details">
              <p>⏳ Durée : {{ formatDuration(track.duration_ms) }}</p>
              <div class="track-buttons">
                <button @click="playTrack(track)" class="play-button">
                  ▶️ Écouter avec le Player
                </button>
                <button @click="new Audio(track.preview_url).play()" class="preview-button" v-if="track.preview_url">
                  🔊 Aperçu rapide
                </button>
              </div>
              <button @click="likeTrack(track)" class="like-button">
                ❤️ Ajouter aux favoris
              </button>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="loading">
    Chargement de l'artiste...
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMusicStore } from "@/store/musicStore";
import { useRoute, useRouter } from "vue-router";

const musicStore = useMusicStore();
const route = useRoute();
const router = useRouter();
const openTrack = ref(null); // Référence pour suivre la piste ouverte

onMounted(async () => {
  const artistId = route.params.id;
  if (artistId) {
    await musicStore.fetchArtist(artistId); // Récupérer les détails de l'artiste
    await musicStore.fetchArtistTracks(artistId); // Récupérer les pistes de l'artiste
  }
});

const currentArtist = computed(() => musicStore.currentArtist); // Artiste actuel
const artistTracks = computed(() => musicStore.artistTracks); // Pistes de l'artiste
const artistImage = computed(() => {
  if (currentArtist.value && currentArtist.value.images && currentArtist.value.images.length > 0) {
    return currentArtist.value.images[0].url; // Image de l'artiste
  }
  return ''; // Image par défaut ou vide
});

const toggleTrack = (index) => {
  openTrack.value = openTrack.value === index ? null : index; // Ouvrir/fermer la piste
};

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Formater la durée en minutes:secondes
};

// Fonction pour jouer une piste
const playTrack = (track) => {
  if (track.href) {
    musicStore.setCurrentTrack(track); // Définir la piste actuelle
    router.push('/player'); // Naviguer vers le lecteur
  } else {
    alert("❌ Aucun extrait disponible !"); // Alerter si aucun extrait n'est disponible
  }
};

// Fonction pour liker une piste
const likeTrack = (track) => {
  let likedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
  likedTracks.push(track);
  localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
  alert("👍 Piste likée !");
};
</script>

<style scoped>
.artist-container {
  background: linear-gradient(to bottom, #1e1e2e, #15151e);
  color: white;
  padding: 2rem;
  min-height: 100vh;
}

.artist-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.artist-cover {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.artist-info h2 {
  margin-top: 0;
  font-size: 2rem;
  color: white;
}

.artist-info p {
  color: #a65fdf;
  margin: 0.5rem 0;
}

.artist-tracks {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
}

.tracks-list {
  list-style: none;
  padding: 0;
}

.track-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

.track-header:hover {
  background: rgba(255, 255, 255, 0.1);
}

.track-details {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 5px 5px;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

.track-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.play-button,
.preview-button,
.like-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
}

.play-button {
  background: #a65fdf;
  color: white;
}

.preview-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.like-button {
  background: #ff4081;
  color: white;
  width: 100%;
  margin-top: 0.5rem;
}

.play-button:hover,
.preview-button:hover,
.like-button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.loading {
  text-align: center;
  padding: 2rem;
  color: white;
}

@media (max-width: 768px) {
  .artist-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .artist-cover {
    width: 200px;
    height: 200px;
  }
  
  .track-buttons {
    flex-direction: column;
  }
}
</style>