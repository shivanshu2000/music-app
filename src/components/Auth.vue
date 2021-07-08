<template>
  <div
    class="modal inset-0 overflow-y-auto"
    :class="{ hidden: !authModalShow }"
    id="modal"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
    sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="fixed inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="blocks py-9 inline-block align-bottom form__bg rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="py-4 text-left px-6">
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>

            <div
              class="modal-close cursor-pointer z-50"
              @click.prevent="toggleAuthModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>

          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'login'"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register',
                }"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login',
                }"
                href="#"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>

          <AppLoginForm v-if="tab === 'login'" />
          <AppRegisterForm v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import AppLoginForm from './Login.vue';
import AppRegisterForm from './Registration.vue';

export default {
  name: 'Auth',
  data() {
    return {
      tab: 'login',
    };
  },

  components: {
    AppLoginForm,
    AppRegisterForm,
  },
  computed: {
    ...mapState(['authModalShow']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
  },
};
</script>
