// Importation des identifiants client et secret depuis les variables d'environnement
const CLIENT_ID = import.meta.env.VITE_API_KEY_SPOTIFY;
const CLIENT_SECRET = import.meta.env.VITE_API_SECRET_SPOTIFY;

// Fonction pour obtenir un token d'accès à l'API Spotify
export async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST", // Méthode POST pour envoyer les données
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Type de contenu
      Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`), // Authentification de base encodée en base64
    },
    body: "grant_type=client_credentials", // Type de grant pour obtenir un token d'accès
  });

  const data = await response.json(); // Conversion de la réponse en JSON
  return data.access_token; // Retourne le token d'accès
}

// Fonction de recherche sur Spotify (albums, pistes, artistes)
export async function search(query) {
  const token = await getAccessToken(); // Obtention du token d'accès

  const url = `https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }, // Ajout du token dans les en-têtes de la requête
  });

  const data = await response.json(); // Conversion de la réponse en JSON

  return {
    albums: data.albums ? data.albums.items : [],
    tracks: data.tracks ? data.tracks.items : [],
    artists: data.artists ? data.artists.items : [],
  };
}


// Fonction pour obtenir les nouvelles sorties d'albums
async function getNewReleases() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const response = await fetch(
    "https://api.spotify.com/v1/browse/new-releases",
    {
      headers: { Authorization: `Bearer ${token}` }, // Ajout du token dans les en-têtes de la requête
    }
  );

  const data = await response.json(); // Conversion de la réponse en JSON
  return data.albums.items; // Retourne la liste des nouveaux albums
}

// Fonction pour obtenir les artistes d'une playlist spécifique
async function getArtists() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const response = await fetch(
    "https://api.spotify.com/v1/artists/0E9vzecg75Thz2ekrGIaF6/top-tracks",
    {
      headers: { Authorization: `Bearer ${token}` }, // Ajout du token dans les en-têtes de la requête
    }
  );

  const data = await response.json(); // Conversion de la réponse en JSON
  console.log(data)
  return data.tracks; // Retourne la liste des pistes de la playlist
}

// Fonction pour obtenir des recommandations d'albums
async function getRecommandations() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const maxAttempts = 5; // Nombre maximum de tentatives
  let attempts = 0;
  let undergroundArtists = [];

  while (attempts < maxAttempts && undergroundArtists.length === 0) {
    // Choisir une lettre aléatoire pour rechercher des artistes peu connus
    const randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ); // Lettre entre 'a' et 'z'

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${randomLetter}&type=artist&limit=50`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json(); // Conversion en JSON

    console.log(data)

    if (data.artists && data.artists.items) {
      // Filtrer les artistes avec une faible popularité (< 30 sur 100)
      undergroundArtists = data.artists.items.filter(
        (artist) => artist.popularity < 70
      );
    }

    attempts++;
  }

  return undergroundArtists.slice(0, 10); // Retourner seulement 10 artistes peu connus
}

// Fonction pour obtenir des albums populaires
async function getPlaylists() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const maxAttempts = 5; // Nombre maximum de tentatives
  let attempts = 0;
  let popularAlbums = [];

  while (attempts < maxAttempts && popularAlbums.length === 0) {
    // Choisir une lettre aléatoire pour rechercher des albums populaires
    const randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ); // Lettre entre 'a' et 'z'

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${randomLetter}&type=album&limit=50`, // Recherche des albums
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json(); // Conversion en JSON

    if (data.albums && data.albums.items) {
      popularAlbums = data.albums.items;
    }

    attempts++;
  }

  return popularAlbums.slice(0, 10); // Retourner seulement les 10 albums les plus populaires
}

// Fonction pour obtenir des recommandations d'artistes populaires
async function getPopularArtists() {
  const token = await getAccessToken(); // Obtention du token d'accès
  const maxAttempts = 5; // Nombre maximum de tentatives
  let attempts = 0;
  let popularArtists = [];

  while (attempts < maxAttempts && popularArtists.length === 0) {
    // Choisir une lettre aléatoire pour rechercher des artistes populaires
    const randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ); // Lettre entre 'a' et 'z'

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${randomLetter}&type=artist&limit=50`, // Recherche des artistes
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json(); // Conversion en JSON

    if (data.artists && data.artists.items) {
      // Filtrer les artistes avec une forte popularité (> 70 sur 100)
      popularArtists = data.artists.items.filter(
        (artist) => artist.popularity > 70
      );
    }

    attempts++;
  }

  return popularArtists.slice(0, 10); // Retourner seulement les 10 artistes les plus populaires
}


// Exportation des fonctions pour les utiliser dans d'autres fichiers
export {
  getNewReleases,
  getArtists,
  getRecommandations,
  getPlaylists,
  getPopularArtists,
};