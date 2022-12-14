<template>
  <q-avatar v-if="memberAvatarUrl" :size="size">
    <q-img :src="memberAvatarUrl" />
  </q-avatar>

  <UserAvatar v-else :user="userObject" :size="size" />
</template>

<script lang="ts">
import {
  APIGuildMember,
  APIUser,
  CDNRoutes,
  ImageFormat,
} from 'discord-api-types/v10'
import { defineComponent, PropType } from 'vue'
import UserAvatar from 'components/user/UserAvatar.vue'

export default defineComponent({
  props: {
    member: {
      required: true,
      type: Object as PropType<APIGuildMember>,
    },

    serverId: {
      type: String,
      required: true,
    },

    size: String,
  },

  computed: {
    memberAvatarUrl() {
      const { member } = this
      if (!member.avatar) {
        return null
      }

      const supportsGif = member.avatar.startsWith('a_')
      const url = new URL(
        CDNRoutes.guildMemberAvatar(
          this.serverId,
          this.userObject.id,
          member.avatar,
          supportsGif ? ImageFormat.GIF : ImageFormat.WebP
        )
      )

      return url.toString()
    },

    userObject() {
      return this.member.user as APIUser
    },
  },

  components: { UserAvatar },
})
</script>
