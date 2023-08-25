<template>
  <div class="flex flex-col justify-center mb-3 shadow-none">
    <div v-for="ticket in tickets" :key="ticket.id">
      <div
        v-for="detail in ticket.order_details"
        :key="detail.id"
        :class="
          ticket.status == statusTicket.STATUS_UNUSED
            ? 'cardWrap'
            : 'opacity-60 cardWrap'
        "
      >
        <div class="card cardLeft">
          <h1>Ticket <span>Cinema</span></h1>
          <div class="title mt-2">
            <h2>{{ ticket.time_movie.movie.name }}</h2>
          </div>
          <div class="name">
            <h2>{{ ticket.time_movie.movie.author }}</h2>
          </div>
          <div class="seat">
            <h2>{{ detail.no_chair }}</h2>
            <span>seat</span>
          </div>
          <div class="time">
            <h2>{{ formatTime(ticket.time_movie.time_start) }}</h2>
            <span>start time</span>
          </div>
        </div>
        <div class="card cardRight">
          <div class="eye" />
          <div class="number">
            <h3>{{ detail.no_chair }}</h3>
            <span>seat</span>
          </div>
          <div class="barcode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import { STATUS_TICKET } from "../constants/index"
export default {
  name: "TicketMovie",
  props: {
    tickets: {
      required: true,
      type: [Array, Object],
    },
  },
  data() {
    return {
      statusTicket: STATUS_TICKET,
    }
  },

  methods: {
    formatTime(time) {
      return moment(time).format("DD/MM/YY HH:mm A")
    },
  },
}
</script>

<style lang="scss" scoped>
$red: #e84c3d;
$grey: #ecedef;
$black: #343434;

.cardWrap {
  width: 27em;
  color: #fff;
  height: 200px;
}

.card {
  background: linear-gradient(
    to bottom,
    $red 0%,
    $red 26%,
    $grey 26%,
    $grey 100%
  );
  height: 11em;
  float: left;
  position: relative;
  padding: 1em;
}

.cardLeft {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 16em;
}

.cardRight {
  width: 6.5em;
  border-left: 0.18em dashed #fff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 0.9em;
    height: 0.9em;
    background: #fff;
    border-radius: 50%;
    left: -0.5em;
  }
  &:before {
    top: -0.4em;
  }
  &:after {
    bottom: -0.4em;
  }
}

h1 {
  font-size: 1.1em;
  margin-top: -6px;
  margin-bottom: 12px;
  span {
    font-weight: normal;
  }
}

.title,
.name,
.seat,
.time {
  text-transform: uppercase;
  font-weight: normal;
  h2 {
    font-size: 0.9em;
    color: #525252;
    margin: 0;
  }
  span {
    font-size: 0.7em;
    color: #a2aeae;
  }
}

.name,
.seat {
  margin: 0.7em 0 0 0;
}

.time {
  margin: 0.7em 0 0 1em;
}

.seat,
.time {
  float: left;
}

.eye {
  position: relative;
  width: 2em;
  height: 1.5em;
  background: #fff;
  margin: 0 auto;
  margin-top: -6px;
  margin-bottom: 12px;
  border-radius: 1em/0.6em;
  z-index: 1;
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
  }
  &:before {
    width: 1em;
    height: 1em;
    background: $red;
    z-index: 2;
    left: 8px;
    top: 4px;
  }
  &:after {
    width: 0.5em;
    height: 0.5em;
    background: #fff;
    z-index: 3;
    left: 12px;
    top: 8px;
  }
}

.number {
  text-align: center;
  text-transform: uppercase;
  h3 {
    color: $red;
    margin: 0.2em 0 0 0;
    font-size: 2.5em;
  }
  span {
    display: block;
    color: #a2aeae;
  }
}

.barcode {
  margin-left: -6px;
  height: 2em;
  width: 0;
  box-shadow: 1px 0 0 1px $black, 5px 0 0 1px $black, 10px 0 0 1px $black,
    11px 0 0 1px $black, 15px 0 0 1px $black, 18px 0 0 1px $black,
    22px 0 0 1px $black, 23px 0 0 1px $black, 26px 0 0 1px $black,
    30px 0 0 1px $black, 35px 0 0 1px $black, 37px 0 0 1px $black,
    41px 0 0 1px $black, 44px 0 0 1px $black, 47px 0 0 1px $black,
    51px 0 0 1px $black, 56px 0 0 1px $black, 59px 0 0 1px $black,
    64px 0 0 1px $black, 68px 0 0 1px $black, 72px 0 0 1px $black,
    74px 0 0 1px $black, 77px 0 0 1px $black, 81px 0 0 1px $black;
}
</style>
