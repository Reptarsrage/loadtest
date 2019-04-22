<template>
  <v-container>
    <v-layout row align-center justify-space-between>
      <span class="display-1">Options</span>
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="success"
        @click="start"
      >
        <v-icon left>play_arrow</v-icon>
        <span>Start</span>
      </v-btn>
    </v-layout>

    <v-layout text-xs-center wrap class="top-margin">
      <v-flex xs4 sm2>
        <v-select
          solo
          label="Method"
          hint="The method to use"
          :items="methods"
          :value="method"
          @input="updateMethod"
        />
      </v-flex>
      <v-flex xs8 sm10>
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

    <v-card class="top-margin">
      <v-tabs>
        <v-tab>Options</v-tab>
        <v-tab>Body</v-tab>
        <v-tab>Query</v-tab>
        <v-tab>Headers</v-tab>
        <v-tab>Cookies</v-tab>
        <v-tab-item>
          <LoadTesterOptions />
        </v-tab-item>
        <v-tab-item>
          <v-textarea
            auto-grow
            autofocus
            hint="paste in body content"
            placeholder="..."
            :value="body"
            @input="updateBody"
          />
        </v-tab-item>
        <v-tab-item>
          <ListOfKeyValues
            :items="queryItems"
            @remove="removeQuery"
            @add="addQuery"
            @update="updateQuery"
          />
        </v-tab-item>
        <v-tab-item>
          <ListOfKeyValues
            :items="headerItems"
            @remove="removeHeader"
            @add="addHeader"
            @update="updateHeader"
          />
        </v-tab-item>
        <v-tab-item>
          <ListOfKeyValues
            :items="cookies"
            @remove="removeCookie"
            @add="addCookie"
            @update="updateCookie"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>

    <v-layout wrap class="top-margin">
      <v-flex>
        <span class="display-1">Results</span>
      </v-flex>
      <v-flex xs12>
        <pre>{{ results }}</pre>
      </v-flex>
    </v-layout>
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
  methods: mapActions([
    "updateMethod",
    "updateUrl",
    "updateBody",
    "removeQuery",
    "addQuery",
    "updateQuery",
    "removeQuery",
    "addHeader",
    "updateHeader",
    "removeHeader",
    "addCookie",
    "updateCookie",
    "removeCookie",
    "start"
  ]),
  computed: mapGetters([
    "methods",
    "method",
    "url",
    "body",
    "queryItems",
    "headerItems",
    "cookies",
    "results",
    "loading"
  ])
};
</script>

<style>
.top-margin {
  margin-top: 1rem;
}
.disabled-input {
  color: rgba(0, 0, 0, 0.38);
}
</style>
