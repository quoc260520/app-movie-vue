<template>
  <v-card class="flex justify-center mb-3">
    <v-card-title class="">{{ movie.name }}</v-card-title>
    <v-img
      class="m-auto"
      height="200"
      width="200"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    />
    <v-card-text class="pt-3 pb-1">
      <v-row class="!m-0">
        <div class="font-bold">Tác giả:</div>
        <div class="ml-[8px]">
          {{ movie.author }}
        </div>
      </v-row>
    </v-card-text>
    <v-card-text class="pt-1 pb-1">
      <v-row class="!m-0">
        <div class="font-bold">Thể loại:</div>
        <div class="ml-[8px]">
          {{ movie.category?.name }}
        </div>
      </v-row>
    </v-card-text>
    <v-card-text class="pt-1 pb-1">
      <v-row class="!m-0">
        <div class="font-bold">Thời gian:</div>
        <div class="ml-[8px]">{{ movie.time }} phút</div>
      </v-row>
    </v-card-text>
    <v-card-actions class="flex justify-center">
      <v-btn color="error" depressed @click="openModalTime()">
        <v-icon>mdi-ticket-confirmation</v-icon>
        Order ticket
      </v-btn>
    </v-card-actions>
    <v-card-text class="pt-1">
      <div class="text-justify">
        {{ movie.description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MovieInfo",
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
    openModalTime() {
      this.$emit("open-modal-time")
    },
  },
}
</script>

<style lang="scss" scoped></style>
