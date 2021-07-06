import { createStore } from 'vuex';
import { auth, usersCollection } from '../includes/fireabase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },

    toggleAuthentication: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
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
        country: payload.country,
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

    async signout({ commit }) {
      await auth.signOut();
      commit('toggleAuthentication');
    },

    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuthentication');
      }
    },
  },
  // getters: {
  //   authModalShow: (state) => state.authModalShow,
  // },
});
