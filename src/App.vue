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
      <v-layout align-center justify-center>
        <v-img
          :src="require('./assets/meredith.svg')"
          alt="meredith"
          contain
          height="30"
        />
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
