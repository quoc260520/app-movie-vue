<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVal" width="600px">
      <v-card>
        <v-card-text class="">
          <div class="pt-2 flex justify-end" @click="closeDialog()">
            <v-icon>mdi-close</v-icon>
          </div>
        </v-card-text>
        <v-card-text class="">
          <div class="p-2 pt-4 flex flex-row flex-wrap">
            <div
              v-for="n in 30"
              :key="n"
              class="m-1 p-1 bg-slate-300 border border-slate-400 rounded flex flex-row w-[70px]"
              @click="selectByDate(formatDate(n - 1))"
            >
              <div class="basis-3/6 text-xs">
                <div>{{ formatDate(n - 1).slice(5, 7) }}</div>
                <div>{{ makeDate(formatDate(n - 1)) }}</div>
              </div>
              <div class="basis-3/6 flex justify-center items-end text-3xl">
                <div class="">{{ formatDate(n - 1).substring(8, 10) }}</div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-text class="">
          <div class="p-2 pt-4 flex flex-col flex-wrap">
            <div
              v-for="(time, key) in times"
              :key="key"
              class="m-1 mb-4 p-1 border border-slate-400 rounded"
            >
              <div class="text-base font-bold ml-2">{{ key }}</div>
              <div class="flex flex-row flex-wrap">
                <div
                  v-for="item in time"
                  :key="item.id"
                  class="m-1 p-1 bg-slate-300 text-center border border-slate-400 rounded w-[120px]"
                  @click="buyTicker(item.id)"
                >
                  <div class="">{{ getHour(item.time_start) }}</div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from "moment"
import { getTimeByMovie } from "../service/movie"
export default {
  name: "DialogTime",
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      dialogVal: false,
      now: moment().format("YYYY-MM-DD"),
      times: [],
    }
  },
  watch: {
    dialog: function (newValue, oldValue) {
      this.dialogVal = newValue
    },
  },
  methods: {
    openModalTime(id) {},
    formatDate(numberDate) {
      return moment(this.now).add(numberDate, "days").format("YYYY-MM-DD")
    },
    makeDate(date) {
      return moment(date).format("dddd").substring(0, 3)
    },
    async selectByDate(date) {
      this.times = []
      const id = this.$route.params.id
      const res = await getTimeByMovie(id, { date })
      this.times = res.data
    },
    getHour(time) {
      return moment(time).format("HH:mm A")
    },
    buyTicker(idTime) {
      this.$router.push(`/time-movie/${idTime}`)
    },
    closeDialog() {
      this.$emit("close-modal-time")
      this.dialogVal = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
