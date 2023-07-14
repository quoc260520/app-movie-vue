<template>
  <div class="p-2">
    <MovieInfo :movie="movie" @open-modal-time="openModalTime()" />
    <DialogTime :dialog="dialog" @close-modal-time="closeModalTime()" />
  </div>
</template>

<script>
import { getMovieById } from "../../service/movie"
export default {
  validate({ params }) {
    const pattern = /^[0-9]$/
    return pattern.test(params.id)
  },
  data() {
    return {
      movie: {},
      dialog: false,
    }
  },
  mounted: function () {
    this.getMovie()
  },
  methods: {
    async getMovie() {
      const res = await getMovieById(this.$route.params.id)
      this.movie = res.data
    },
    openModalTime() {
      this.dialog = true
    },
    closeModalTime() {
      this.dialog = false
    },
  },
}
</script>
