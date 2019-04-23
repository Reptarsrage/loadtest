<template>
  <v-container>
    <v-layout row align-center justify-space-between>
      <span class="display-1">Options</span>
      <v-btn id="start-button" :loading="loading" :disabled="!checkValid()" color="success" @click="start">
        <v-icon left>play_arrow</v-icon>
        <span>Start</span>
      </v-btn>
    </v-layout>

    <ChooseUrl />

    <v-card class="top-margin">
      <v-tabs>
        <v-tab :class="{ 'tab-error': !options.valid }">Options</v-tab>
        <v-tab>Body</v-tab>
        <v-tab :class="{ 'tab-error': !queryStringParams.valid }">Query</v-tab>
        <v-tab :class="{ 'tab-error': !headers.valid }">Headers</v-tab>
        <v-tab :class="{ 'tab-error': !cookies.valid }">Cookies</v-tab>
        <v-tab-item>
          <LoadTesterOptions />
        </v-tab-item>
        <v-tab-item>
          <v-textarea auto-grow hint="paste in body content" placeholder="..." :value="body" @input="updateBody" />
        </v-tab-item>
        <v-tab-item>
          <QueryOptions />
        </v-tab-item>
        <v-tab-item>
          <HeaderOptions />
        </v-tab-item>
        <v-tab-item>
          <CookieOptions />
        </v-tab-item>
      </v-tabs>
    </v-card>

    <v-layout wrap class="top-margin" v-if="results">
      <v-flex xs12>
        <span class="display-1">Results</span>
      </v-flex>
      <v-flex md6 class="left-padding">
        <v-layout wrap>
          <v-flex xs12>
            <span>Total Time: {{ results.totalTimeSeconds }}</span>
          </v-flex>
          <v-flex xs12>
            <span>Mean Latency: {{ results.meanLatencyMs }}</span>
          </v-flex>
          <v-flex xs12>
            <span>Max Latency: {{ results.maxLatencyMs }}</span>
          </v-flex>
          <v-flex xs12>
            <span>Min Latency: {{ results.minLatencyMs }}</span>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md6 class="left-padding">
        <v-layout wrap>
          <v-flex xs12>
            <span>Total Requests: {{ results.totalRequests }}</span>
          </v-flex>
          <v-flex xs12>
            <span>Total Errors: {{ results.totalErrors }}</span>
          </v-flex>
          <v-flex xs12>
            <span>RPS: {{ results.rps }}</span>
          </v-flex>
          <v-flex xs12>
            <span>Error Codes: {{ JSON.stringify(results.errorCodes) }}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout wrap class="top-margin" v-if="results">
      <v-flex xs12 xl6>
        <v-card class="margin">
          <LatencyChart />
        </v-card>
      </v-flex>
      <v-flex xs12 xl6>
        <v-card class="margin">
          <ErrorChart />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import QueryOptions from './QueryOptions';
import CookieOptions from './CookieOptions';
import HeaderOptions from './HeaderOptions';
import LoadTesterOptions from './LoadTesterOptions';
import LatencyChart from './LatencyChart';
import ErrorChart from './ErrorChart';
import ChooseUrl from './ChooseUrl';

export default {
  name: 'LoadTester',
  components: { QueryOptions, CookieOptions, HeaderOptions, LoadTesterOptions, LatencyChart, ErrorChart, ChooseUrl },
  methods: {
    ...mapActions(['updateBody', 'start']),
    checkValid() {
      return (
        !this.loading &&
        this.valid &&
        this.options.valid &&
        this.headers.valid &&
        this.cookies.valid &&
        this.queryStringParams.valid
      );
    },
  },
  computed: mapGetters(['body', 'queryStringParams', 'headers', 'cookies', 'results', 'loading', 'options', 'valid']),
};
</script>

<style>
.tab-error .v-tabs__item {
  color: #ff5252;
}
.margin {
  margin: 0.5rem;
}
.top-margin {
  margin-top: 1rem;
}
.left-padding {
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}
.disabled-input {
  color: rgba(0, 0, 0, 0.38);
}
</style>
