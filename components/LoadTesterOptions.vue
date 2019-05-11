<template>
  <v-form @input="validate">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 md4 lg3>
          <v-text-field
            :value="concurrency"
            :rules="concurrencyRules"
            min="1"
            max="1000"
            label="Concurrency"
            hint="How many clients to start in parallel"
            type="number"
            @input="updateConcurrency"
          />
        </v-flex>

        <v-flex xs12 md4 lg3>
          <v-text-field
            :value="requestsPerSecond"
            :rules="requestsPerSecondRules"
            min="1"
            label="Max requests per second"
            hint="How many requests each client will send per second"
            type="number"
            @input="updateRequestsPerSecond"
          />
        </v-flex>

        <v-flex xs12 md4 lg3>
          <v-text-field
            :value="maxRequests"
            :rules="maxRequestsRules"
            min="1"
            max="1000000"
            label="Max results"
            hint="A max number of requests; after they are reached the test will end"
            type="number"
            @input="updateMaxRequests"
          />
        </v-flex>

        <v-flex xs12 md4 lg3>
          <v-text-field
            :value="maxSeconds"
            :rules="maxSecondsRules"
            min="1"
            max="3600"
            label="Max seconds"
            hint="How long to run the tests"
            type="number"
            @input="updateMaxSeconds"
          />
        </v-flex>

        <v-flex xs12 md4 lg3>
          <v-text-field
            :value="timeout"
            :rules="timeoutRules"
            min="1"
            max="3600"
            label="Timeout"
            hint="Timeout for each generated request in milliseconds. Setting this to 0 disables timeout"
            required
            type="number"
            @input="updateTimeout"
          />
        </v-flex>

        <v-flex xs12 md4 lg3>
          <v-text-field
            :value="indexParam"
            label="Index Param"
            hint="The given string will be replaced in the final URL with a unique index"
            @input="updateIndexParam"
          />
        </v-flex>

        <v-flex xs12 md4 lg3>
          <v-checkbox
            :value="agentKeepAlive"
            label="Agent Keep Alive"
            hint="Use an agent with 'Connection: Keep-alive'"
            @change="updateAgentKeepAlive"
          />
        </v-flex>

        <v-flex xs12 md4 lg3>
          <v-checkbox
            :value="insecure"
            label="Insecure"
            hint="Allow invalid and self-signed certificates over https"
            @change="updateInsecure"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoadTesterOptions',
  computed: {
    ...mapGetters({
      valid: 'loadTestOptions/valid',
      maxRequests: 'loadTestOptions/maxRequests',
      concurrency: 'loadTestOptions/concurrency',
      maxSeconds: 'loadTestOptions/maxSeconds',
      timeout: 'loadTestOptions/timeout',
      requestsPerSecond: 'loadTestOptions/requestsPerSecond',
      agentKeepAlive: 'loadTestOptions/agentKeepAlive',
      indexParam: 'loadTestOptions/indexParam',
      insecure: 'loadTestOptions/insecure'
    }),
    requestsPerSecondRules: () => [
      v => v <= 5000 || 'requestsPerSecond must be less than 5000',
      v => v >= 0 || 'requestsPerSecond must be greater than zero'
    ],
    maxRequestsRules: () => [
      v => v <= 1000000 || 'maxRequests must be less than a million',
      v => v >= 0 || 'maxRequests must be greater than zero'
    ],
    maxSecondsRules: () => [
      v => v <= 5000 || 'maxSeconds must be less than 3600',
      v => v >= 0 || 'maxSeconds must be greater than zero'
    ],
    timeoutRules: () => [
      v => v <= 5000 || 'timeout must be less than 3600',
      v => v >= 0 || 'timeout must be greater than zero'
    ],
    concurrencyRules: () => [
      v => v <= 1000 || 'concurrency must be less than 1000',
      v => v >= 0 || 'concurrency must be greater than zero'
    ]
  },
  methods: mapActions({
    validate: 'loadTestOptions/validate',
    updateMaxRequests: 'loadTestOptions/updateMaxRequests',
    updateConcurrency: 'loadTestOptions/updateConcurrency',
    updateMaxSeconds: 'loadTestOptions/updateMaxSeconds',
    updateTimeout: 'loadTestOptions/updateTimeout',
    updateRequestsPerSecond: 'loadTestOptions/updateRequestsPerSecond',
    updateAgentKeepAlive: 'loadTestOptions/updateAgentKeepAlive',
    updateIndexParam: 'loadTestOptions/updateIndexParam',
    updateInsecure: 'loadTestOptions/updateInsecure'
  })
}
</script>

<style></style>
