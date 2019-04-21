<template>
  <v-list>
    <template v-for="(item, index) in items">
      <v-layout row wrap :key="item.id">
        <v-flex grow class="list-item">
          <v-text-field
            hide-details
            placeholder="name"
            :disabled="!item.enabled"
            :value="item.name"
            @focus="onFocus(index)"
            @input="$emit('updateQueryName', item.id, $event)"
          />
        </v-flex>
        <v-flex grow class="list-item">
          <v-text-field
            hide-details
            placeholder="value"
            :disabled="!item.enabled"
            :value="item.value"
            @focus="onFocus(index)"
            @input="$emit('updateQueryValue', item.id, $event)"
          />
        </v-flex>
        <v-flex shrink v-if="index !== items.length - 1">
          <v-btn top flat icon @click="$emit('toggleQueryEnabled', item.id)">
            <v-icon v-if="item.enabled">check_box</v-icon>
            <v-icon v-else>check_box_outline_blank</v-icon>
          </v-btn>
        </v-flex>
        <v-flex shrink v-if="index !== items.length - 1">
          <v-btn top flat icon @click="$emit('removeQuery', item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex shrink v-else class="placeholder-for-buttons" />
      </v-layout>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "QueryString",
  props: ["items"],
  methods: {
    onFocus(index) {
      if (this.items.length - 1 === index) {
        this.$emit("addQuery");
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
