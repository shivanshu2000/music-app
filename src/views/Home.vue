<template>
  <!-- Introduction -->

  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Listen to the music. And add your own music by signing up now.
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="assets/img/introduction-music.png"
    />
  </section>

  <section class="container mx-auto">
    <div class="rounded relative flex flex-col main__block">
      <div class="px-6 pt-6 pb-5 font-bold border-b ">
        <span class="card-title text-white">Songs</span>

        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>

      <ol id="playlist" class="list">
        <AppSongItem :song="song" v-for="song in songs" :key="song.docId" />
        <div v-if="showSpinner" style="text-align:center">
          <i class="fas fa-spinner fa-spin text-white" />
        </div>
      </ol>
    </div>
  </section>
</template>

<script>
import AppSongItem from '@/components/SongItem.vue';
import { songsCollection } from '../includes/firebase';

export default {
  name: 'Home',
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false,
      stopRequests: false,
      showSpinner: false,
    };
  },
  components: {
    AppSongItem,
  },
  async created() {
    this.getSongs();

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleSCroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      // eslint-disable-next-line operator-linebreak
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight - offsetHeight <= 80;
      if (bottomOfWindow) {
        this.getSongs();
      }
    },

    async getSongs() {
      if (this.pendingRequest || this.stopRequests) {
        return;
      }
      this.pendingRequest = true;

      let snapshots;
      if (this.songs.length) {
        const lastDoc = await songsCollection
          .doc(
            // eslint-disable-next-line comma-dangle
            this.songs[this.songs.length - 1].docId
          )
          .get();
        this.showSpinner = true;
        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
        this.showSpinner = false;

        if (snapshots.size === 0) {
          this.stopRequests = true;
          this.showSpinner = false;
        }
      } else {
        snapshots = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          ...document.data(),
          docId: document.id,
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>
