<template>
  <div class="flex flex-col justify-center mb-3 shadow-none">
    <div class="w-100 h-14 bg-black mt-4" />
    <v-card class="flex justify-center mt-4 mb-3">
      <div class="flex flex-row flex-wrap justify-center">
        <v-col
          v-for="n in order.chair_number"
          :key="n"
          cols="auto"
          class="!p-[10px]"
        >
          <v-btn-toggle v-model="chairOrder" color="primary" multiple>
            <v-btn
              v-if="checkChairOrder(n)"
              class="mx-2"
              small
              fab
              disabled
              :value="n"
            >
              <v-icon> mdi-sofa-single-outline </v-icon>
              {{ n }}
            </v-btn>
            <v-btn v-else :value="n" class="mx-2" small fab>
              <v-icon> mdi-sofa-single-outline </v-icon>
              {{ n }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </div>
    </v-card>
    <v-row class="mt-4 !m-0 border rounded">
      <v-row class="flex justify-evenly items-baseline !m-0">
        <v-col cols="9" sm="6" md="3">
          <v-text-field v-model="code" label="Voucher" outlined />
        </v-col>
        <v-col cols="3" sm="6" md="3">
          <v-btn color="success" @click="applyVoucher()">Apply</v-btn>
        </v-col>
        <v-col v-if="voucher.code" cols="12" class="text-red-500 text-sm"
          >Giảm {{ voucher.discount }}% tối đa
          {{ formatMoney(voucher.max_discount) }}</v-col
        >
      </v-row>
      <v-row v-if="chairOrder.length" class="w-full !m-0 p-3">
        <table class="border-collapse border w-full text-center">
          <thead>
            <tr>
              <th class="border border-slate-600 p-2">Quantity</th>
              <th class="border border-slate-600 p-2">Price</th>
              <th class="border border-slate-600 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-700 p-2">
                {{ chairOrder.length }}
              </td>
              <td class="border border-slate-700 p-2">
                {{ formatMoney(order.price) }}
              </td>
              <td class="border border-slate-700 p-2">
                {{ formatMoney(totalPrice) }}
              </td>
            </tr>
            <tr>
              <td class="border border-slate-700 p-2">Giảm giá</td>
              <td class="border border-slate-700 p-2">
                {{ voucher.discount || 0 }}%
              </td>
              <td class="border border-slate-700 p-2">
                {{ formatMoney(discountMoney(totalPrice)) }}
              </td>
            </tr>
            <tr>
              <td class="border border-slate-700 p-2" />
              <td class="border border-slate-700 p-2" />
              <td class="border border-slate-700 p-2">
                {{ formatMoney(totalPrice - discountMoney(totalPrice)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </v-row>
    </v-row>
    <v-row class="mt-4 flex justify-end">
      <v-btn color="primary" @click="confirmOrder()">Confirm</v-btn>
    </v-row>
  </div>
</template>

<script>
import { apply } from "../service/coupon"
import { orderTicket } from "../service/order"

export default {
  name: "RoomOrder",
  props: {
    order: {
      required: true,
      type: [Array, Object],
    },
  },
  data() {
    return {
      chairOrder: [],
      toggle_exclusive: [],
      voucher: [],
      code: "",
    }
  },
  computed: {
    totalPrice: function () {
      return this.chairOrder.length * this.order.price
    },
  },

  methods: {
    checkChairOrder(id) {
      return this.order.array_chair_order?.indexOf(id) !== -1
    },
    confirmOrder() {
      if (this.chairOrder.length) {
        const res = orderTicket({
          coupon_id: this.voucher.id,
          time_id: parseInt(this.$route.params.id),
          no_chair: this.chairOrder,
        })
        alert(res.data)
      } else {
        alert("Vui lòng chọn ghế")
      }
    },
    async applyVoucher() {
      const res = await apply({ code: this.code.toUpperCase() })
      this.voucher = res.data
      this.code = res.data.code
    },
    discountMoney: function (total) {
      let discount = 0
      if (this.voucher.code) {
        discount =
          total * (this.voucher.discount / 100) > this.voucher.max_discount
            ? this.voucher.max_discount
            : total * (this.voucher.discount / 100)
      }
      return discount
    },
    formatMoney(money) {
      return money.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
