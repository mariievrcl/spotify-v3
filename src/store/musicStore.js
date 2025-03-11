import { defineStore } from 'pinia';
import { getAccessToken } from '../../services/spotify';

export const useMusicStore = defineStore('music', {
  state: () => ({
    playlists: [],
    artists: [],
    albums: [],
    currentAlbum: null,
    albumTracks: [],
    currentTrack: null, // Piste actuelle
    currentArtist: null,
    artistTracks: [],
    favorites: [] // Liste des favoris
  }),

  actions: {
    // Récupérer les détails d'un album
    async fetchAlbum(albumId) {
      const token = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      this.currentAlbum = data;
      this.albumTracks = data.tracks.items; // Remplir les morceaux de l'album
      return data;
    },

    // Récupérer les détails d'un artiste
    async fetchArtist(artistId) {
      const token = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      this.currentArtist = data;
      return data;
    },

    // Récupérer les pistes d'un artiste
    async fetchArtistTracks(artistId) {
      const token = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      this.artistTracks = data.tracks;
      return data.tracks;
    },

    // Recherche globale pour albums, artistes, playlists et morceaux
    async search(query) {
      const token = await getAccessToken();

      try {
        // Requête pour les artistes
        const artistRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const artistData = await artistRes.json();

        // Requête pour les albums
        const albumRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album&limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const albumData = await albumRes.json();

        // Requête pour les playlists
        const playlistRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const playlistData = await playlistRes.json();

        // Requête pour les morceaux
        const trackRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const trackData = await trackRes.json();

        // Stocker les résultats des artistes
        this.artists = artistData.artists.items.map(a => ({
          id: a.id,
          name: a.name,
          image: a.images.length > 0 ? a.images[0].url : 'https://via.placeholder.com/150'
        }));

        // Stocker les résultats des albums
        this.albums = albumData.albums.items.map(a => ({
          id: a.id,
          name: a.name,
          cover: a.images.length > 0 ? a.images[0].url : 'https://via.placeholder.com/150'
        }));

        // Stocker les résultats des playlists
        this.playlists = playlistData.playlists.items.map(p => ({
          id: p.id,
          name: p.name,
          image: p.images.length > 0 ? p.images[0].url : 'https://via.placeholder.com/150'
        }));

        // Stocker les résultats des morceaux
        this.tracks = trackData.tracks.items.map(t => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          cover: t.album.images.length > 0 ? t.album.images[0].url : 'https://via.placeholder.com/150'
        }));

      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      }
    },

    // Ajouter un morceau aux favoris
    addToFavorites(track) {
      if (!this.favorites.find(fav => fav.id === track.id)) {
        this.favorites.push(track); // Ajoute le morceau à la liste des favoris
      }
    },

    // Définir la piste actuelle
    setCurrentTrack(track) {
      this.currentTrack = track; // Met à jour la piste actuelle
    }
  }
});



