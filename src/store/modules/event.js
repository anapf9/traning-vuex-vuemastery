import EventService from '@/services/EventService.js'

export const state = {
      events: [],
      eventsTotal: undefined,
      event: {}
    }
export const mutations = {
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
    }
export const namespaced = true
export const actions = { 
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
}
export const getters = {
    getEventsById: state => id => {
    return state.events.find(event => event.id === id)
    }
}
