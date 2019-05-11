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
  name: 'CookieOptions',
  components: { ListOfKeyValues },
  computed: mapGetters({
    valid: 'cookies/valid',
    items: 'cookies/items'
  }),
  methods: {
    ...mapActions({
      add: 'cookies/add',
      updateName: 'cookies/updateName',
      updateValue: 'cookies/updateValue',
      updateEnabled: 'cookies/updateEnabled',
      unconfirm: 'cookies/unconfirm',
      remove: 'cookies/remove',
      validate: 'cookies/validate'
    })
  }
}
</script>
