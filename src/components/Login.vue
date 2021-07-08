<template>
  <div
    class="text-white text-center font-bold p-4 mb-h"
    :class="loginAlertVariant"
    v-if="showAlert"
  >
    {{ loginAlertMessage }}
  </div>
  <VeeForm @submit="login" :validation-schema="loginSchema">
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
      :disabled="logging"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },

      logging: false,
      showAlert: false,
      loginAlertVariant: 'bg-blue-500',
      loginAlertMessage: 'Please wait!',
    };
  },

  methods: {
    async login(values) {
      this.logging = true;
      this.showAlert = true;
      this.loginAlertVariant = 'bg-blue-500';
      this.loginAlertMessage = 'Please wait!';

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.logging = false;
        this.showAlert = true;
        this.loginAlertVariant = 'bg-red-500';
        this.loginAlertMessage = 'Invalid login details';
        return;
      }

      this.loginAlertVariant = 'bg-green-500';
      this.loginAlertMessage = 'You are logged in successfully';
      window.location.reload();
    },
  },
};
</script>
