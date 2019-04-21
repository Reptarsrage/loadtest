<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs2>
        <v-select
          solo
          label="Method"
          hint="The method to use"
          :items="methods"
          :value="method"
          @input="updateMethod"
        />
      </v-flex>
      <v-flex xs10>
        <v-text-field
          solo
          placeholder="https://api.meredith.services/v1/api"
          label="Url"
          hint="Mandatory URL to access"
          required
          :rules="urlRules"
          :value="url"
          @input="updateUrl"
        />
      </v-flex>
    </v-layout>

    <v-tabs>
      <v-tab>Options</v-tab>
      <v-tab>Body</v-tab>
      <v-tab>Query</v-tab>
      <v-tab>Headers</v-tab>
      <v-tab-item>
        <LoadTesterOptions />
      </v-tab-item>
      <v-tab-item>
        <v-textarea
          hint="paste in body content"
          placeholder="..."
          :value="body"
          @input="updateBody"
        />
      </v-tab-item>
      <v-tab-item>
        <ListOfKeyValues
          :items="queryItems"
          @updateQueryValue="updateQueryValue"
          @uupdateQueryName="updateQueryName"
          @utoggleQueryEnabled="toggleQueryEnabled"
          @uremoveQuery="removeQuery"
          @uaddQuery="addQuery"
        />
      </v-tab-item>
      <v-tab-item>
        <ListOfKeyValues
          :items="headerItems"
          @uupdateQueryValue="updateHeaderValue"
          @uupdateQueryName="updateHeaderName"
          @utoggleQueryEnabled="toggleHeaderEnabled"
          @uremoveQuery="removeHeader"
          @uaddQuery="addHeader"
        />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ListOfKeyValues from "./ListOfKeyValues";
import LoadTesterOptions from "./LoadTesterOptions";

export default {
  name: "LoadTester",
  data: () => ({
    urlRules: [
      v => !!v || "Url is required",
      v =>
        v.startsWith("http://") ||
        v.startsWith("https://") ||
        v.startsWith("ws://") ||
        "Invalid Url, must be http://, https:// or ws://"
    ]
  }),
  components: { ListOfKeyValues, LoadTesterOptions },
  methods: {
    ...mapActions([
      "updateMethod",
      "updateUrl",
      "updateBody",
      "updateQueryValue",
      "updateQueryName",
      "toggleQueryEnabled",
      "removeQuery",
      "addQuery",
      "updateHeaderValue",
      "updateHeaderName",
      "toggleHeaderEnabled",
      "removeHeader",
      "addHeader"
    ])
  },
  computed: mapGetters([
    "methods",
    "method",
    "url",
    "body",
    "queryItems",
    "headerItems"
  ])
};
</script>

<style>
.disabled-input {
  color: rgba(0, 0, 0, 0.38);
}
</style>
