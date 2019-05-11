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
  name: 'HeaderOptions',
  components: { ListOfKeyValues },
  computed: mapGetters({
    valid: 'headers/valid',
    items: 'headers/items'
  }),
  methods: {
    ...mapActions({
      add: 'headers/add',
      updateName: 'headers/updateName',
      updateValue: 'headers/updateValue',
      updateEnabled: 'headers/updateEnabled',
      unconfirm: 'headers/unconfirm',
      remove: 'headers/remove',
      validate: 'headers/validate'
    })
  }
}
</script>
