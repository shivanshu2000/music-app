import { createStore } from 'vuex';
import { Howl } from 'howler';
import helper from '@/includes/helper';
import { auth, usersCollection } from '../includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },

    toggleAuthentication: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },

    newSong(state, payload) {
      if (state.sound.playing) {
        state.sound.pause();
      }
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },

    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      // eslint-disable-next-line operator-linebreak
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) *
        100}%`;
    },
  },

  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
  },

  actions: {
    async register({ commit }, payload) {
      const user = await auth.createUserWithEmailAndPassword(
        payload.email,
        // eslint-disable-next-line comma-dangle
        payload.password
      );

      await usersCollection.doc(user.user.uid).set({
        email: payload.email,
        name: payload.name,
        age: payload.age,
        country: 'India',
      });

      await user.user.updateProfile({
        displayName: payload.name,
      });

      commit('toggleAuthentication');
    },

    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuthentication');
    },

    async signout({ commit }, payload) {
      await auth.signOut();
      commit('toggleAuthentication');
      if (payload.route.meta.requiresAuth) {
        payload.router.push({ name: 'home' });
      }
    },

    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuthentication');
      }
    },

    async newSong({ commit, state, dispatch }, payload) {
      commit('newSong', payload);
      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },

    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },

    progress({ commit, state, dispatch }) {
      commit('updatePosition');
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },

    updateSeek({ state, dispatch }, payload) {
      if (!state.sound.playing) {
        return;
      }
      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
  // getters: {
  //   authModalShow: (state) => state.authModalShow,
  // },
});
