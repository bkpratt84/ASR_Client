<template>
  <v-layout fill-height align-center>
    <v-flex xs12 sm6 offset-sm3 v-if="getError === '404'">
      <h1 class="grey--text text--darken-1 text-xs-center"><v-icon x-large class="red--text">directions</v-icon> 404</h1>
      <h4 class="grey--text text--darken-1 text-xs-center">The page you're looking for can't be found.</h4>
    </v-flex>

    <v-flex xs12 sm6 offset-sm3 v-else>
      <h1 class="grey--text text--darken-1 text-xs-center"><v-icon x-large class="red--text">warning</v-icon> Error</span></h1>
      <h4 class="grey--text text--darken-1 text-xs-center">{{ getError }}</h4>
    </v-flex>
  </v-layout>
</template>

<style>
  #app {
    height: 100%;
  }

  .icon {
    font-size: 7rem !important;
  }
</style>

<script>
  import { mapGetters } from 'vuex';

  export default {
    props: {
      error: String
    },

    computed: {
      ...mapGetters({
        vGetError: 'getError'
      }),
      
      getError: function() {
        return this.error || this.vGetError || '404'
      }
    }
  }
</script>