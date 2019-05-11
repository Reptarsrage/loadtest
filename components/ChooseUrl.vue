<template>
  <v-form class="top-margin" validate-on-blur @input="validate">
    <v-layout text-xs-center wrap>
      <v-flex xs4 sm2>
        <v-select
          solo
          label="Method"
          hint="The method to use"
          :items="methods"
          :value="method"
          @input="updateMethod"
        />
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
import { mapGetters, mapActions } from 'vuex'
// eslint-disable-next-line no-useless-escape
const urlRegex = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\-\._~\:\/\?#\[\]@\!\$&'\(\)\*\+,;\=]/g
export default {
  name: 'ChooseUrl',
  data: () => ({
    urlRules: [
      v => !!v || 'Url is required',
      v =>
        v.startsWith('http://') ||
        v.startsWith('https://') ||
        v.startsWith('ws://') ||
        'Invalid Url, must be http://, https:// or ws://',
      v => !urlRegex.test(v) || 'Invalid Url'
    ]
  }),
  computed: mapGetters({
    methods: 'main/methods',
    method: 'main/method',
    url: 'main/url'
  }),
  methods: {
    ...mapActions({
      updateMethod: 'main/updateMethod',
      updateUrl: 'main/updateUrl',
      validate: 'main/validate'
    })
  }
}
</script>

<style>
.top-margin {
  margin-top: 1rem;
}
</style>
