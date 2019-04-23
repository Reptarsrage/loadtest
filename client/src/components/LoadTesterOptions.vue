<template>
  <v-form v-model="options.valid">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="options.concurrency"
            :value="options.concurrency"
            :rules="concurrencyRules"
            @input="updateOptions(options)"
            min="1"
            max="1000"
            label="Concurrency"
            hint="How many clients to start in parallel"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="options.requestsPerSecond"
            :value="options.requestsPerSecond"
            @input="updateOptions(options)"
            :rules="requestsPerSecondRules"
            min="1"
            label="Max requests per second"
            hint="How many requests each client will send per second"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="options.maxRequests"
            :value="options.maxRequests"
            :rules="maxRequestsRules"
            @input="updateOptions(options)"
            min="1"
            max="1000000"
            label="Max results"
            hint="A max number of requests; after they are reached the test will end"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="options.maxSeconds"
            :value="options.maxSeconds"
            :rules="maxSecondsRules"
            @input="updateOptions(options)"
            min="1"
            max="3600"
            label="Max seconds"
            hint="How long to run the tests"
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="options.timeout"
            :value="options.timeout"
            :rules="timeoutRules"
            @input="updateOptions(options)"
            min="1"
            max="3600"
            label="Timeout"
            hint="Timeout for each generated request in milliseconds. Setting this to 0 disables timeout"
            required
            type="number"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-text-field
            v-model="options.indexParam"
            :value="options.indexParam"
            @input="updateOptions(options)"
            label="Index Param"
            hint="The given string will be replaced in the final URL with a unique index"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-checkbox
            v-model="options.agentKeepAlive"
            :value="options.agentKeepAlive"
            @change="updateOptions(options)"
            label="Agent Keep Alive"
            hint="Use an agent with 'Connection: Keep-alive'"
          />
        </v-flex>

        <v-flex xs12 md4 lg2>
          <v-checkbox
            v-model="options.insecure"
            :value="options.insecure"
            @change="updateOptions(options)"
            label="Insecure"
            hint="Allow invalid and self-signed certificates over https"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LoadTesterOptions',
  computed: {
    ...mapGetters(['url', 'options']),
    requestsPerSecondRules: () => [
      v => v <= 5000 || 'requestsPerSecond must be less than 5000',
      v => v >= 0 || 'requestsPerSecond must be greater than zero',
    ],
    maxRequestsRules: () => [
      v => v <= 1000000 || 'maxRequests must be less than a million',
      v => v >= 0 || 'maxRequests must be greater than zero',
    ],
    maxSecondsRules: () => [
      v => v <= 5000 || 'maxSeconds must be less than 3600',
      v => v >= 0 || 'maxSeconds must be greater than zero',
    ],
    timeoutRules: () => [
      v => v <= 5000 || 'timeout must be less than 3600',
      v => v >= 0 || 'timeout must be greater than zero',
    ],
    concurrencyRules: () => [
      v => v <= 1000 || 'concurrency must be less than 1000',
      v => v >= 0 || 'concurrency must be greater than zero',
    ],
  },
  methods: mapActions(['updateOptions']),
};
</script>

<style></style>
