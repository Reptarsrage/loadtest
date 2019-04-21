<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="maxRequests"
            min="1"
            label="Max results"
            hint="A max number of requests; after they are reached the test will end"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="concurrency"
            min="1"
            label="Concurrency"
            hint="How many clients to start in parallel"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="maxSeconds"
            min="1"
            label="Max seconds"
            hint="How long to run the tests"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="requestsPerSecond"
            :rules="[requestsPerSecondRule]"
            min="1"
            label="Max requests per second"
            hint="How many requests each client will send per second"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="timeout"
            min="1"
            label="Timeout"
            hint="Timeout for each generated request in milliseconds. Setting this to 0 disables timeout"
            required
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="indexParam"
            label="Index Param"
            hint="The given string will be replaced in the final URL with a unique index"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-checkbox
            v-model="agentKeepAlive"
            label="Agent Keep Alive"
            hint="Use an agent with 'Connection: Keep-alive'"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-checkbox
            v-model="insecure"
            label="Insecure"
            hint="Allow invalid and self-signed certificates over https"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoadTesterOptions",
  data: () => ({
    valid: false,
    maxRequests: null,
    concurrency: null,
    maxSeconds: null,
    timeout: 0,
    requestsPerSecond: null,
    agentKeepAlive: null,
    indexParam: null,
    insecure: null
  }),
  computed: mapGetters(["url"]),
  methods: {
    requestsPerSecondRule(v) {
      return (
        !(this.url.startsWith("ws:") && v) ||
        "requestsPerSecond not supported for WebSockets"
      );
    }
  }
};
</script>

<style></style>
