<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="showAlert"
    :class="regAlertVariant"
  >
    {{ regAlertMessage }}
  </div>

  <VeeForm
    :validation-schema="schema"
    :initial-values="userData"
    @submit="register"
  >
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600" />
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      />

      <ErrorMessage class="text-red-600" name="age" />
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField v-slot="{ field, errors }" name="password" :bails="false">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div v-for="error in errors" class="text-red-600" :key="error">
          {{ error }}
        </div>
      </VeeField>
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>

    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="India">India</option>
        <option value="India">Bangladesh (ye rehne de bhai)</option>
        <option value="Lanka">Lanka</option>
        <option value="India">China (fir bhi India hi select hoga)</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country" />
    </div>

    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <div><ErrorMessage class="text-red-600" name="tos" /></div>
    </div>

    <button
      type="submit"
      :disabled="registering"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Lanka',
        tos: 'tos',
      },

      registering: false,
      showAlert: false,
      regAlertVariant: 'bg-blue-500',
      regAlertMessage: 'Please wait! Your account is being created',
      userData: {
        country: 'India',
      },
    };
  },
  methods: {
    register(values) {
      this.showAlert = true;
      this.registering = true;
      this.regAlertVariant = 'bg-blue-500';
      this.regAlertMessage = 'Please wait! Your account is being created';

      this.regAlertVariant = 'bg-green-500';
      this.regAlertMessage = 'Your account has been created successfully';
      console.log(values);
    },
  },
};
</script>
