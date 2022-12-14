<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card flat style="width: 500px">
      <q-card-section class="column fit">
        <div class="col flex flex-center q-py-lg">
          <div class="text-h3">
            {{ $t('common.appName') }}
          </div>
        </div>
        <q-btn
          :disable="!discordLoginUrl"
          :label="$t('auth.loginWithDiscord')"
          color="discord"
          unelevated
          :href="discordLoginUrl || ''"
          no-caps
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL

export default defineComponent({
  computed: {
    discordLoginUrl() {
      if (!DISCORD_OAUTH_URL) {
        return null
      }

      const url = new URL(DISCORD_OAUTH_URL)

      const { query } = this.$route
      for (const key in query) {
        url.searchParams.append(key, JSON.stringify(query[key]))
      }

      return url.toString()
    },
  },
})
</script>
