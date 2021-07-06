<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <a class="text-white font-bold uppercase text-2xl mr-10" href="#"
        >Music</a
      >

      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <li v-if="!userLoggedIn">
            <a
              class="px-2 text-white nav__link"
              href="#"
              @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white nav__link" href="#">Manage</a>
            </li>
            <li>
              <a
                class="px-2 text-white nav__link"
                href="#"
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
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    ...mapActions(['signout']),
  },

  computed: {
    ...mapState(['userLoggedIn']),
  },
};
</script>
