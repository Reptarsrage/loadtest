<template>
  <ListOfKeyValues :options="cookies" @remove="removeCookie" @add="addCookie" @update="updateCookie" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListOfKeyValues from './ListOfKeyValues';

export default {
  name: 'CookieOptions',
  components: { ListOfKeyValues },
  methods: {
    ...mapActions(['addCookie', 'updateCookie', 'removeCookie']),
  },
  computed: mapGetters(['cookies']),
};
</script>
