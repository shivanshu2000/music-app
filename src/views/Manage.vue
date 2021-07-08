<template>
  <section class="text-white container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="blocks col-span-1 mb-6 md:mb-0">
        <AppUpload :addSong="addSong" />
      </div>
      <div class="blocks col-span-2 ">
        <div class="relative flex flex-col songs__list">
          <div class="px-6 pt-6 pb-5 font-bold border-b">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6 songs__list">
            <div v-if="showSpinner" class="mt-9" style=" text-align:center">
              <i class="fas fa-spinner fa-spin text-white" />
            </div>
            <CompositionItem
              v-for="(song, i) in songs"
              :updateSong="updateSong"
              :song="song"
              :index="i"
              :key="song.docId"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import AppUpload from '@/components/Upload.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { auth, songsCollection } from '../includes/firebase';

export default {
  name: 'Manage',
  //   beforeRouteEnter: (to, from, next) => {
  //     if (store.state.userLoggedIn) {
  //       next();
  //     } else {
  //       next({ name: 'home' });
  //     }
  //   },

  data() {
    return {
      songs: [],
      unsavedFlag: false,
      showSpinner: false,
    };
  },
  components: {
    AppUpload,
    CompositionItem,
  },

  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].henre = values.genre;
    },

    removeSong(i) {
      this.songs.splice(i, 1);
    },

    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id,
      };

      this.songs.push(song);
    },

    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },

  async created() {
    this.showSpinner = true;
    const snapshot = await songsCollection
      .where('uid', '==', auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);
    // snapshot.forEeach(document=>{
    //   this.addSong(document)
    // })
    this.showSpinner = false;
  },

  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals, no-alert
      const leave = confirm(
        // eslint-disable-next-line comma-dangle
        'You have unsaved changes! Are you sure you want to leave?'
      );

      next(leave);
    }
  },

  //  To use it this way put ref="upload" attribute in <AppUpload/> component
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
};
</script>
