import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'

import error from './error'
import util from './util'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        error,
        util
    },
    plugins: [
        // createPersistedState()
    ]
})