<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fit">
      <div class="q-gutter-y-sm q-py-sm">
        <div v-for="quote of quotes" :key="quote.id" class="row justify-center">
          <QuoteCard
            class="card-width"
            :quote="quote"
            :author-data="members[quote.authorId]"
            :submitter-data="members[quote.submitterId]"
          />
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { useServerMembersLoader } from 'src/composables/server-members-loader.composable'
import { useServerQuoteManager } from 'src/composables/server-quote-manager.composable'
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import QuoteCard from 'src/components/quote/QuoteCard.vue'
import { useDiscordStore } from 'src/stores/discord-store'
import { APIGuildMember } from 'discord-api-types/v10'

function useServerMembersMap(serverId: string) {
  const discordStore = useDiscordStore()
  return computed(() => {
    const membersList = discordStore.serverMembersMap[serverId] ?? []

    const asMap: Record<string, APIGuildMember> = {}
    for (const member of membersList) {
      if (!member.user) {
        continue
      }

      asMap[member.user.id] = member
    }
    return asMap
  })
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const serverId = route.params.serverId.toString()
    const quoteManager = useServerQuoteManager(serverId)
    const membersLoader = useServerMembersLoader(serverId)

    onMounted(async () => {
      await Promise.all([quoteManager.load(), membersLoader.load()])
    })

    return {
      quotes: quoteManager.quotes,
      members: useServerMembersMap(serverId),
    }
  },
  components: { QuoteCard },
})
</script>

<style lang="scss" scoped>
.card-width {
  width: 80%;
  max-width: 1200px;
}
</style>
