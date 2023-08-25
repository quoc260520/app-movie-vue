<template>
  <div>
    <RoomOrder :order="order" />
  </div>
</template>

<script>
import { getOrderByTimeId } from "../../service/time-movie"
export default {
  validate({ params }) {
    const id = parseInt(params.id)
    return Number.isInteger(id) && id > 0
  },

  data() {
    return {
      order: [],
    }
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    async getOrder() {
      const id = this.$route.params.id
      const res = await getOrderByTimeId(id)
      this.order = res.data
    },
  },
}
</script>

<style lang="scss" scoped></style>
