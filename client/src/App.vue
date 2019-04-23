<template>
  <v-app :dark="darkTheme">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Load</span>
        <span class="font-weight-light">Tester</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn flat icon @click="toggleDarkTheme" v-on="on">
              <v-icon v-if="darkTheme">brightness_2</v-icon>
              <v-icon v-else>wb_sunny</v-icon>
            </v-btn>
          </template>
          <span>Switch to {{ darkTheme ? 'light' : 'dark' }} theme</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer height="60">
      <v-layout row wrap justify-center>
        <v-flex xs12 class="center"><span>Made by Justin Robb</span></v-flex>
        <v-flex xs12 class="center">
          <a href="https://github.com/Reptarsrage" target="_blank">
            GitHub
          </a>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  computed: mapGetters(['darkTheme']),
  methods: mapActions(['toggleDarkTheme']),
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
