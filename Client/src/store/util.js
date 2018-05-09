const state = {
    linkValidated: false,
    name: '',
    watched: false
}

const mutations = {
    SET_LINK_VALIDATED(state, value) {
        state.linkValidated = value
    },
    SET_NAME(state, value) {
        state.name = value
    },
    SET_WATCHED(state, value) {
        state.watched = value
    }
}

const actions = {
    setLinkValidated: ({commit}, value) => {
        commit('SET_LINK_VALIDATED', value)
    },
    setName: ({commit}, value) => {
        commit('SET_NAME', value)
    },
    setWatched: ({commit}, value) => {
        commit('SET_WATCHED', value)
    }
}

const getters = {
    getLinkValidated: state => {
        return state.linkValidated
    },
    getName: state => {
        return state.name
    },
    getWatched: state => {
        return state.watched
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}