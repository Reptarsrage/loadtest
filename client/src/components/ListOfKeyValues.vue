<template>
  <v-form v-model="options.valid">
    <v-list>
      <template v-for="(item, index) in options.items.concat([{ id: options.items.length, enabled: true }])">
        <v-layout row :key="index">
          <v-flex grow class="list-item">
            <v-text-field
              hide-details
              placeholder="Name"
              required
              v-model="item.name"
              :rules="index === options.items.length ? [] : nameRules"
              :disabled="!item.enabled"
              :value="item.name"
              @focus="onFocus(index)"
              @input="$emit('update', options)"
            />
          </v-flex>
          <v-flex grow class="list-item">
            <v-text-field
              hide-details
              placeholder="Value"
              required
              :disabled="!item.enabled"
              :rules="index === options.items.length ? [] : valueRules"
              v-model="item.value"
              :value="item.value"
              @focus="onFocus(index)"
              @input="$emit('update', options)"
            />
          </v-flex>
          <v-flex shrink :class="{ hidden: index === options.items.length }">
            <v-checkbox
              hide-details
              v-model="item.enabled"
              :disabled="index === options.items.length"
              :value="item.enabled"
              @change="$emit('update', options)"
            />
          </v-flex>
          <v-flex shrink :class="{ hidden: index === options.items.length }">
            <v-checkbox
              hide-details
              off-icon="delete"
              on-icon="warning"
              color="warning"
              v-model="item.confirm"
              :disabled="index === options.items.length"
              :value="item.confirm"
              @change="confirmRemove(item)"
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
  props: ['options'],
  data: () => ({
    nameRules: [v => !!v || 'Name is required'],
    valueRules: [v => !!v || 'Value is required'],
  }),
  methods: {
    onFocus(index) {
      if (index === this.options.items.length) {
        this.$emit('add');
      } else if (this.options.items[index].confirm) {
        this.options.items[index].confirm = null;
        this.$emit('update', this.options);
      }
    },
    confirmRemove(item) {
      if (item.confirm) {
        this.$emit('update', this.options);
      } else {
        this.$emit('remove', item.id);
      }
    },
  },
};
</script>

<style scoped>
.hidden {
  opacity: 0;
}
.list-item {
  padding: 0 8px;
}
</style>
