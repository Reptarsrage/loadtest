<template>
  <ListOfKeyValues
    :items="items"
    :valid="valid"
    @remove="remove"
    @add="add"
    @updateName="updateName"
    @updateValue="updateValue"
    @updateEnabled="updateEnabled"
    @unconfirm="unconfirm"
    @validate="validate"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListOfKeyValues from './ListOfKeyValues'

export default {
  name: 'QueryOptions',
  components: { ListOfKeyValues },
  computed: mapGetters({
    valid: 'queryStringParams/valid',
    items: 'queryStringParams/items'
  }),
  methods: {
    ...mapActions({
      add: 'queryStringParams/add',
      updateName: 'queryStringParams/updateName',
      updateValue: 'queryStringParams/updateValue',
      updateEnabled: 'queryStringParams/updateEnabled',
      unconfirm: 'queryStringParams/unconfirm',
      remove: 'queryStringParams/remove',
      validate: 'queryStringParams/validate'
    })
  }
}
</script>
