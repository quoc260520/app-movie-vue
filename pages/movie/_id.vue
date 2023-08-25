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
    const id = parseInt(params.id)
    return Number.isInteger(id) && id > 0
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
