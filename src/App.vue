<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Load</span>
        <span class="font-weight-light">Tester</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer>
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
export default {
  name: "App",
  data: () => ({})
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
