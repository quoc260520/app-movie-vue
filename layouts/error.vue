<template>
  <div class="text-center min-h-[36vh]">
    <div class="mt-[60px]">
      <h1
        v-if="error.statusCode === 404"
        class="!text-blue-500 !text-5xl font-extrabold"
      >
        {{ pageNotFound }}
      </h1>
      <h1 v-else class="!text-blue-500 !text-5xl font-extrabold">
        {{ otherError }}
      </h1>
    </div>
    <div class="mt-5">
      <NuxtLink
        to="/"
        class="text-lg text-center w-1/3 border border-blue-600 bg-blue-600 !text-white p-3 rounded"
      >
        Home page
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
