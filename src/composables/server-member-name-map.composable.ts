import { useDiscordStore } from 'src/stores/discord-store'
import { computed } from 'vue'

export function useServerMemberNameMap(serverId: string) {
  const store = useDiscordStore()

  const members = computed(() => store.serverMembersMap[serverId])

  const nameMap = computed(() => {
    const map: Record<string, string | null | undefined> = {}

    if (!members.value) {
      return map
    }

    for (const { user, nick } of members.value) {
      if (!user) {
        continue
      }

      map[user.id] = nick ?? user?.username ?? null
    }

    return map
  })

  return nameMap
}
