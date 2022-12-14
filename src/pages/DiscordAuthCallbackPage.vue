<template>
  <q-page class="flex flex-center">
    <q-spinner color="primary" size="lg" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  async mounted() {
    const { code, redirect, ...otherQuery } = this.$route.query

    await this.$api.post('auth/oauth/discord', {
      code,
    })

    const location = {
      query: otherQuery,
    }

    if (redirect) {
      await this.$router.push({
        ...location,
        path: JSON.stringify(redirect),
      })
    } else {
      await this.$router.push({
        ...location,
        name: 'index',
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    if (!to.query.code) {
      // TODO add logging
      // TODO add notice to the user
      return next(false)
    }

    next()
  },
})
</script>
