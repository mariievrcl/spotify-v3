<template>
    <div class="profile-container">
      <!-- Bannière du Profil -->
      <div class="banner">
        <img :src="user.profilePicture" alt="Profile Picture" class="profile-img" />
        <h1>{{ user.name }}</h1>
        <p>{{ user.bio }}</p>
      </div>
  
      <!-- Playlists créées -->
      <section class="created-playlists-section">
        <h2>🎶 Playlists créées par {{ user.name }}</h2>
        <div v-if="user.playlists.length > 0">
          <div v-for="playlist in user.playlists" :key="playlist.id" class="card">
            <img :src="playlist.image" alt="Playlist Cover" class="cover">
            <p class="title">{{ playlist.name }}</p>
          </div>
        </div>
        <p v-else>Aucune playlist créée pour le moment.</p>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const user = ref({
    name: "Marie Viricel",
    profilePicture: "https://source.unsplash.com/200x200/?portrait,person",
    bio: "Musique, voyages et découvertes.",
    playlists: [
      { id: 1, name: "My Top Hits", image: "https://source.unsplash.com/200x200/?music,party" },
      { id: 2, name: "Chill Vibes", image: "https://source.unsplash.com/200x200/?chill,music" }
    ]
  });
  
  onMounted(() => {
    console.log("Page Profil Chargée !");
  });
  </script>
  
  <style scoped>
  .profile-container {
    background: linear-gradient(to bottom, #1e1e2e, #15151e);
    color: white;
    min-height: 100vh;
    padding: 2rem;
  }
  
  .banner {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .created-playlists-section {
    margin-top: 2rem;
  }
  
  .card {
    display: inline-block;
    margin: 1rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
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
  </style>
  
  