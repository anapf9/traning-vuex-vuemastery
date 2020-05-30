<template>
  <div>
    <h1>Events for {{ this.$store.state.user.user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <!-- For only show page > 1 -->
      <router-link :to="{ name: 'event-list', query: { page: page - 1 }}" rel="prev">
        Prev Page
      </router-link>
    </template>
    <template v-if="this.eventsTotal > this.page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 }}" rel="next">
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('event')

export default {
  components: {
    EventCard
  },
  created() {
    this.fetchEvents({
      perPage: 3,
      page: this.page
    }) 
  },
  computed: {
    ...mapState(['events', 'eventsTotal']),
    page () {
      // if no URL query parameters, assume the first page
      return parseInt(this.$route.query.page) || 1
    }
  },
  methods: {
    ...mapActions(['fetchEvents']),
  }
}
</script>
