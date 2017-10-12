import axios from 'axios'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login ({ commit }, { mobile, password }) {
    try {
      const { data } = await axios.post('/api/login', { mobile, password })
      if (data.error) {
        throw new Error(data.error.msg)
      } else {
        commit('SET_USER', data)
        location.href = '/'
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }
}
