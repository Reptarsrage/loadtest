<template>
  <v-list>
    <template v-for="(item, index) in items">
      <v-layout row wrap :key="item.id">
        <v-flex grow class="list-item">
          <v-text-field
            hide-details
            placeholder="name"
            v-model="item.name"
            :disabled="!item.enabled"
            :value="item.name"
            @focus="onFocus(index)"
            @input="$emit('update', item)"
          />
        </v-flex>
        <v-flex grow class="list-item">
          <v-text-field
            hide-details
            placeholder="value"
            :disabled="!item.enabled"
            v-model="item.value"
            :value="item.value"
            @focus="onFocus(index)"
            @input="$emit('update', item)"
          />
        </v-flex>
        <v-flex shrink v-if="index !== items.length - 1">
          <v-checkbox
            hide-details
            v-model="item.enabled"
            :value="item.enabled"
            @change="$emit('update', item)"
          />
        </v-flex>
        <v-flex shrink v-if="index !== items.length - 1">
          <v-checkbox
            hide-details
            off-icon="delete"
            on-icon="warning"
            color="warning"
            v-model="item.confirm"
            :value="item.confirm"
            @change="confirmRemove(item)"
          />
        </v-flex>
        <v-flex shrink v-else class="placeholder-for-buttons" />
      </v-layout>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "ListOfKeyValues",
  props: ["items"],
  methods: {
    onFocus(index) {
      if (this.items.length - 1 === index) {
        this.$emit("add");
      } else if (this.items[index].confirm) {
        this.items[index].confirm = null;
        this.$emit("update", this.items[index]);
      }
    },
    confirmRemove(item) {
      if (item.confirm) {
        this.$emit("update", item);
      } else {
        this.$emit("remove", item.id);
      }
    }
  }
};
</script>

<style scoped>
.placeholder-for-buttons {
  width: 104px;
}
.list-item {
  padding: 0 8px;
}
</style>
