import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'acb123', name: 'Ana Paula'},
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [
      { id: 1, title: '...', category: '...' },
      { id: 2, title: '...', category: '...' },
      { id: 3, title: '...', category: '...' },
      { id: 4, title: '...', category: '...' }
    ]
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent ({commit}, event ) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)

      })
    }
  },
  getters: {
    getEventsById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
