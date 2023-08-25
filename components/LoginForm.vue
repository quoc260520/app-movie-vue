<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVal" persistent max-width="600px">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submitForm">
          <v-card>
            <v-card-title class="flex justify-center">
              <span class="text-h5">Login</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                      name="email"
                    >
                      <v-text-field
                        v-model="email"
                        label="Email(*)"
                        :error-messages="errors[0]"
                        outlined
                        clearable
                        type="email"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|min:6"
                      name="password"
                    >
                      <v-text-field
                        v-model="password"
                        label="Password(*)"
                        :error-messages="errors"
                        type="password"
                        outlined
                        clearable
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="flex flex-row justify-center">
              <v-btn color="blue darken-1" type="submit" :disabled="invalid">
                Đăng nhập
              </v-btn>
              <v-btn color="error darken-1" @click="closeDialog"> Hủy </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </ValidationObserver>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from "vuex"
import { ValidationObserver, ValidationProvider } from "vee-validate"
import { login } from "../service/auth.js"
import { setToken } from "../utils/auth.js"

export default {
  name: "DefaultLayout",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    dialog: { type: Boolean, default: false },
  },
  data() {
    return {
      dialogVal: false,
      email: "",
      password: "",
      showAlert: false,
      alertMessage: "",
    }
  },
  watch: {
    dialog(val) {
      this.dialogVal = val
    },
  },
  methods: {
    closeDialog() {
      this.$refs.observer.reset()
      this.email = ""
      this.password = ""
      this.$emit("close-dialog")
    },
    submitForm() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          const res = await login({
            email: this.email,
            password: this.password,
          })
          if (res?.response?.status === 200) {
            setToken(res.data.data.access_token)
            this.closeDialog()
            await this.getInfo()
          }
        }
      })
    },
    openDialog() {},
    ...mapActions(["getInfo"]),
  },
}
</script>
<style></style>
