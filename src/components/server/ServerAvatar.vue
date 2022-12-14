<template>
  <q-avatar v-if="avatarUrl">
    <q-img :src="avatarUrl" />
  </q-avatar>
  <q-avatar v-else color="grey" text-color="white">
    <q-icon name="groups_2" size="lg" />
  </q-avatar>
</template>

<script lang="ts">
import {
  APIGuild,
  CDNRoutes,
  ImageFormat,
  RouteBases,
} from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'

type ServerData = Pick<APIGuild, 'id' | 'icon' | 'name'>

export default defineComponent({
  props: {
    server: {
      type: Object as PropType<ServerData>,
      required: true,
    },
  },
  computed: {
    avatarUrl() {
      const { server } = this
      if (!server.icon) {
        return null
      }

      const supportsGif = server.icon.startsWith('a_')
      const url = new URL(
        CDNRoutes.guildIcon(
          server.id,
          server.icon,
          supportsGif ? ImageFormat.GIF : ImageFormat.WebP
        ),
        RouteBases.cdn
      )

      return url.toString()
    },
  },
})
</script>
