<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <router-link class="logo" :to="{ name: 'home' }">Tuneshed</router-link>

      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <li v-if="!userLoggedIn">
            <a
              class="px-2 text-white nav__link"
              style="cursor:pointer"
              @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link
                class="px-2 text-white nav__link"
                style="cursor:pointer"
                :to="{ name: 'manage' }"
                >Manage</router-link
              >
            </li>
            <li>
              <a
                class="px-2 text-white nav__link"
                style="cursor:pointer"
                @click.prevent="signout"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signout() {
      this.$store.dispatch('signout', {
        router: this.$router,
        route: this.$route,
      });
      // if (this.$route.meta.requiresAuth) {
      //   this.$router.push({ name: 'home' });
      // }
    },
  },

  computed: {
    ...mapState(['userLoggedIn']),
  },
};
</script>
