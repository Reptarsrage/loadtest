<template>
  <v-form class="top-margin" v-model="valid">
    <v-layout text-xs-center wrap>
      <v-flex xs4 sm2>
        <v-select solo label="Method" hint="The method to use" :items="methods" :value="method" @input="updateMethod" />
      </v-flex>
      <v-flex xs8 sm10>
        <v-text-field
          solo
          placeholder="https://api.meredith.services/v1/api"
          label="Url"
          hint="Mandatory URL to access"
          required
          :rules="urlRules"
          :value="url"
          @input="updateUrl"
        />
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ChooseUrl',
  data: () => ({
    valid: false,
    urlRules: [
      v => !!v || 'Url is required',
      v =>
        v.startsWith('http://') ||
        v.startsWith('https://') ||
        v.startsWith('ws://') ||
        'Invalid Url, must be http://, https:// or ws://',
    ],
  }),
  methods: {
    ...mapActions(['updateMethod', 'updateUrl', 'updateValid']),
  },
  computed: mapGetters(['methods', 'method', 'url']),
  watch: {
    valid: function(val) {
      this.updateValid(val);
    },
  },
};
</script>

<style>
.top-margin {
  margin-top: 1rem;
}
</style>
