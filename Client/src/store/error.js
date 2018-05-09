const state = {
    message: ''
}

const mutations = {
    SET_ERROR(state, data) {
        state.message = data
    }
}

const actions = {
    setError: ({commit}, message) => {
        commit('SET_ERROR', message)
    }
}

const getters = {
    getError: state => {
        return state.message
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}