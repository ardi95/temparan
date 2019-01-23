import axios from 'axios'
import VueCookies from 'vue-cookies'

import router from '../router'

const state = {
    errorResult: false,
    errorMessage: null,
    token: null
}

const mutations = {
    processError(state, dataError) {
        state.errorResult = true
        state.errorMessage = dataError
    },
    authUser(state, userData) {
        state.token = 'bearer ' + userData.token
        $cookies.set("token",'bearer ' + userData.token,"50MIN")
        router.push('/dashboard')
    },
    clearAuthData(state) {
        const token = $cookies.get("token")
        $cookies.remove("token")
        state.token = null
        router.replace('/')
    }
}

const actions = {
    tryAutoLogin({commit}) {
        const token = $cookies.get("token")
        if (!token) {
            return
        }
        axios.get('/check-token')
        .then(res => state.token = token)
        .catch(error => {
            commit('clearAuthData')
            // console.log(error.response);
        })
    },
    login ({commit}, data) {
        // axios.post('/verifyPassword?key=AIzaSyB64I6PKlIOpioIec2l_Dz_I6xDyW18j1k',
        axios.post('/login',
        {
            email: data.username,
            password: data.password
        })
        .then(res => {
            commit('authUser', {
                token: res.data.token
            })
            // console.log(res);
        })
        .catch(error => {
            const dataError = error.response.data.errors
            commit('processError', dataError)
        })
    },
    logout({commit}) {
        commit('clearAuthData')
    },
    closeError({commit}) {
        state.errorResult = false
    }
}

const getters = {
    errorResult(state) {
        return state.errorResult
    },
    errorMessage(state) {
        return state.errorMessage
    },
    isAuthenticated(state) {
        return state.token
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
