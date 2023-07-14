<template>
  <div class="p-2 min-h-[40vh]">Ticket</div>
</template>

<script>
import { getAllMovie } from "../service/movie"
export default {
  middleware: ["auth"],
  data() {
    return {
      allMovie: {},
    }
  },
  mounted: function () {
    this.getMovie()
  },
  methods: {
    async getMovie() {
      const res = await getAllMovie()
      this.allMovie = res.data.data
    },
  },
}
</script>
