
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Search from '@/pages/Search.vue';
import Playlist from '@/pages/Playlist.vue';
import Album from '@/pages/Album.vue';
import Artist from '@/pages/Artist.vue';
import Player from '@/pages/Player.vue';
import Profile from '@/pages/Profile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/playlist/', component: Playlist },
  { path: '/album/:id', component: Album, props : true, },
  { path: '/artist/:id', component: Artist },
  { path: '/player', component: Player },
  { path: '/profile', component: Profile }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
