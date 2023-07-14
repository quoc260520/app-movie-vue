<template>
  <div class="p-2">
    <MovieDetail
      v-for="(movie, index) in allMovie"
      :key="index"
      :movie="movie"
    />
  </div>
</template>

<script>
import { getAllMovie } from "../../service/movie"
export default {
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
