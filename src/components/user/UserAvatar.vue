<template>
  <q-avatar :size="size">
    <q-img :src="avatarUrl" />
  </q-avatar>
</template>

<script lang="ts">
import {
  APIUser,
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
  RouteBases,
} from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<APIUser>,
      required: true,
    },

    size: String,
  },

  computed: {
    avatarUrl() {
      const { user } = this
      let url: URL

      if (user.avatar) {
        const supportsGif = user.avatar.startsWith('a_')
        url = new URL(
          CDNRoutes.userAvatar(
            user.id,
            user.avatar,
            supportsGif ? ImageFormat.GIF : ImageFormat.WebP
          ),
          RouteBases.cdn
        )
      } else {
        const avatarCode = (parseInt(user.discriminator) %
          5) as DefaultUserAvatarAssets
        url = new URL(CDNRoutes.defaultUserAvatar(avatarCode), RouteBases.cdn)
      }

      return url.toString()
    },
  },
})
</script>
