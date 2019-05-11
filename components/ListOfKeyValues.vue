<template>
  <v-form @input="$emit('validate', $event)">
    <v-list>
      <template
        v-for="(item, index) in items.concat([
          { id: items.length, enabled: true }
        ])"
      >
        <v-layout :key="index" row>
          <v-flex grow class="list-item">
            <v-text-field
              hide-details
              placeholder="Name"
              required
              :rules="index !== items.length && item.enabled ? nameRules : []"
              :disabled="!item.enabled"
              :value="item.name"
              @focus="onFocus(index)"
              @input="$emit('updateName', { id: item.id, name: $event })"
            />
          </v-flex>
          <v-flex grow class="list-item">
            <v-text-field
              hide-details
              placeholder="Value"
              required
              :disabled="!item.enabled"
              :rules="index !== items.length && item.enabled ? nameRules : []"
              :value="item.value"
              @focus="onFocus(index)"
              @input="$emit('updateValue', { id: item.id, value: $event })"
            />
          </v-flex>
          <v-flex shrink :class="{ hidden: index === items.length }">
            <v-checkbox
              hide-details
              :disabled="index === items.length"
              :value="item.enabled"
              @change="$emit('updateEnabled', { id: item.id, enabled: $event })"
            />
          </v-flex>
          <v-flex shrink :class="{ hidden: index === items.length }">
            <v-checkbox
              hide-details
              off-icon="delete"
              on-icon="warning"
              color="warning"
              :disabled="index === items.length"
              :value="item.confirm"
              @change="$emit('remove', item.id)"
            />
          </v-flex>
        </v-layout>
      </template>
    </v-list>
  </v-form>
</template>

<script>
export default {
  name: 'ListOfKeyValues',
  props: {
    items: {
      type: Array,
      required: true
    },
    valid: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    nameRules: [v => !!v || 'Name is required'],
    valueRules: [v => !!v || 'Value is required']
  }),
  methods: {
    onFocus(index) {
      if (index === this.items.length) {
        this.$emit('add')
      } else if (this.items[index].confirm) {
        this.$emit('unconfirm', this.items[index].id)
      }
    }
  }
}
</script>

<style scoped>
.hidden {
  opacity: 0;
}
.list-item {
  padding: 0 8px;
}
</style>
