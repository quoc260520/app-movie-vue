<template>
  <v-app dark>
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              src="https://image.tienphong.vn/600x315/Uploaded/2023/neg-sleclyr/2023_03_06/332604665-750279956726734-8680033434711375818-n-1334.jpg"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ auth.name || "..." }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn
            v-if="!auth.name"
            block
            color="success"
            class="px-5"
            @click="openForm()"
          >
            Login
          </v-btn>
          <v-btn v-else block color="error" class="px-5" @click="logoutClick">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-row class="flex justify-center ms-0 !w-full p-2">
        <v-menu v-model="menuOpen" offset-y>
          <template #activator="{ on }">
            <v-text-field
              v-model="search"
              label="Search movie"
              hide-details
              clearable
              clear-icon="mdi-close-circle-outline"
              class="mr-3 p-5"
              outlined
              v-on="on"
              @keyup="changeSearch"
            />
          </template>
          <v-list>
            <v-list-item
              v-for="item in filteredItems"
              :key="item.id"
              @click="selectItem(item)"
            >
              <v-list-item-icon>
                <v-img
                  height="65"
                  width="50"
                  src="https://picsum.photos/id/11/500/300"
                />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Tên phim: {{ item.name }}</v-list-item-title>
                <v-list-item-title
                  >Tác giả: {{ item.author }}</v-list-item-title
                >
                <v-list-item-title
                  >Thời gian: {{ item.time }} phút</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container class="!m-0 !p-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app class="!p-[20px] !relative flex justify-center">
      <v-row class="justify-evenly">
        <v-icon large color="blue"> mdi-facebook </v-icon>
        <v-icon large class="!text-red-300"> mdi-instagram </v-icon>
        <v-icon large color="red"> mdi-youtube </v-icon>
        <v-icon large color="blue"> mdi-twitter </v-icon>
      </v-row>
      <v-row
        class="flex flex-col mt-5 p-3 bg-[#e7e2e2] text-black text-[14px] text-center"
      >
        <h3 class="uppercase">416 Movie</h3>
        <p class="!m-0 pt-1">Hotline: 0123456789</p>
        <p class="!m-0 pt-1">
          Working hours: 8:00 - 22:00 (Monday to Sunday, including Public
          Holidays)
        </p>
        <p class="!m-0 pt-1">Email: 416movie@gmail.com</p>
      </v-row>
    </v-footer>
    <LoginForm :dialog="dialog" @close-dialog="closeDialog()" />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { getAllMovie } from "../service/movie.js"
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-movie-roll",
          title: "Movies",
          to: "/movie",
        },
        {
          icon: "mdi-door-sliding",
          title: "Rooms",
          to: "/",
        },
        {
          icon: "mdi-ticket-account",
          title: "Tickets",
          to: "/ticket",
        },
        {
          icon: "mdi-sale",
          title: "Sales",
          to: "/",
        },
      ],
      miniVariant: false,
      right: true,
      search: "",
      dialog: false,
      menuOpen: false,
      filteredItems: [],
    }
  },
  computed: {
    ...mapGetters({
      auth: "auth",
    }),
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    openForm() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    async changeSearch() {
      if (this.search) {
        const res = await getAllMovie({ nameMovie: this.search })
        this.filteredItems = res?.data?.data
      } else {
        this.filteredItems = []
      }
    },
    selectItem(item) {},
    logoutClick() {
      this.logout()
      this.$router.push("/")
    },
    ...mapActions(["logout", "getInfo"]),
  },
}
</script>
