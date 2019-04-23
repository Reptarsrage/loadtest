<template>
  <ListOfKeyValues :options="headers" @remove="removeHeader" @add="addHeader" @update="updateHeader" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListOfKeyValues from './ListOfKeyValues';

export default {
  name: 'HeaderOptions',
  components: { ListOfKeyValues },
  methods: {
    ...mapActions(['addHeader', 'updateHeader', 'removeHeader']),
  },
  computed: mapGetters(['headers']),
};
</script>
