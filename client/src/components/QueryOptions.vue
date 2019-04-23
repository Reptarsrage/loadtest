<template>
  <ListOfKeyValues :options="queryStringParams" @remove="removeQuery" @add="addQuery" @update="updateQuery" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListOfKeyValues from './ListOfKeyValues';

export default {
  name: 'QueryOptions',
  components: { ListOfKeyValues },
  methods: {
    ...mapActions(['addQuery', 'updateQuery', 'removeQuery']),
  },
  computed: mapGetters(['queryStringParams']),
};
</script>
