import { defineStore } from 'pinia';
import { getAccessToken } from '../../services/spotify';

export const useMusicStore = defineStore('music', {
  state: () => ({
    currentAlbum: null,
    albumTracks: [],
    currentTrack: null,
    currentArtist: null,
    artistTracks: []
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
      this.albumTracks = data.tracks.items;
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
    
    // Définir la piste actuellement en lecture
    setCurrentTrack(track) {
      this.currentTrack = track;
    }
  }
});