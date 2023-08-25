<template>
  <div class="p-2 min-h-[40vh]">
    <TicketMovie :tickets="tickets" />
  </div>
</template>

<script>
import { getAllMovie } from "../service/movie"
import { orderByUser } from "../service/order"
export default {
  middleware: "auth",
  data() {
    return {
      allMovie: {},
      tickets: {},
    }
  },
  mounted: function () {
    this.getTicket()
  },
  methods: {
    async getMovie() {
      const res = await getAllMovie()
      this.allMovie = res.data.data
    },
    async getTicket() {
      const res = await orderByUser()
      this.tickets = res.data
    },
  },
}
</script>
