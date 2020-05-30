import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'
import * as user from '@/store/modules/user.js'
// * import all public items into user namespace

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user
  },
  state: {
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
    eventsTotal: undefined,
    event: {}
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
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: { 
    createEvent ({ commit }, event ) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvent({ commit, getters }, id ) {
      var event = getters.getEventsById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
      }
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
