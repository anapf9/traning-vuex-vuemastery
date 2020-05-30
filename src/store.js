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
    events: [],
    eventsTotal: undefined
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTSTOTAL(state, total) {
      state.eventsTotal = total
    }
  },
  actions: { 
    createEvent ({ commit }, event ) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page}) {
      EventService.getEvents(perPage, page)
      .then(response => {
        console.log('Total de eventos:' + response.headers['x-total-count']);
        commit('SET_EVENTS', response.data ) 
        commit('SET_EVENTSTOTAL', response.headers['x-total-count']) 
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    }
  },
  getters: {
    getEventsById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
