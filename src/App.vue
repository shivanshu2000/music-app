<template>
  <AppHeader />

  <router-view></router-view>

  <AppPlayer class="bottom__bar" />

  <AuthModal />
</template>

<script>
import AppHeader from './components/Header.vue';
import AppPlayer from './components/Player.vue';
import AuthModal from './components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },

  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
