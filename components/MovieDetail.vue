<template>
  <v-card class="flex justify-center mb-3">
    <v-card-title class="justify-center">{{ movie.name }}</v-card-title>
    <v-img
      class="m-auto"
      height="200"
      width="200"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    />
    <v-card-text class="justify-center">
      <div class="text-justify">
        {{ movie.description }}
      </div>
    </v-card-text>
    <v-card-actions class="flex justify-center">
      <v-btn color="error" depressed @click="goToDetail(movie.id)"
        >Detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MovieDetail",
  props: {
    movie: {
      required: true,
      type: [Array, Object],
    },
  },
  data() {
    return {}
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/movie/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
